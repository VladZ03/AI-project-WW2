from openai import OpenAI
client = OpenAI(api_key='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')

def respone_que(text):
  response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
      {"role": "user", "content": text}  # Корректный формат messages
    ],
    response_format={
      "type": "text"
    },
    temperature=0.7,
    max_completion_tokens=1000,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
  )
  return response.choices[0].message.content
print(respone_que('Предположим, что Главнокомандующий армии решил захватить город в котором 10000 врагов, но у него под контролем 100000, сможет ли он это осуществить?'))