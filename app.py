from flask import Flask, jsonify, request
import psycopg2
from psycopg2.extras import RealDictCursor
from openai import OpenAI
import os
from dotenv import load_dotenv
from flask_cors import CORS

# Загружаем переменные окружения
load_dotenv()

app = Flask(__name__)
CORS(app)  # Разрешаем CORS для всех запросов
# Конфигурация подключения к PostgreSQL
DATABASE_CONFIG = {
    'dbname': 'ww2_interactive_db',
    'user': 'postgres',
    'password': 'pipiba26',  # ЗАМЕНИ ЭТО НА ПЕРЕМЕННУЮ ОКРУЖЕНИЯ
    'host': 'localhost',
    'port': 5432
}

# Конфигурация OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # БЕРЕМ ИЗ .env
client = OpenAI(api_key=OPENAI_API_KEY)

def get_openai_response(text):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": text}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Ошибка при обращении к OpenAI: {e}")
        return "Ошибка генерации ответа"

@app.route('/ai-response', methods=['POST'])
def ai_response():
    data = request.get_json()
    user_text = data.get("input")

    if not user_text:
        return jsonify({"error": "Нет входного текста"}), 400

    ai_text = get_openai_response(user_text)

    try:
        conn = psycopg2.connect(**DATABASE_CONFIG)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Aitext (text_column) VALUES (%s) RETURNING id", (ai_text,)
        )
        conn.commit()
        response_id = cursor.fetchone()[0]
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Ошибка записи в PostgreSQL: {e}")
        return jsonify({"error": "Ошибка записи в базу данных"}), 500

    return jsonify({"response": ai_text, "id": response_id})

if __name__ == '__main__':
    app.run(debug=True)
