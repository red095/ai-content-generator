from openai import OpenAI
from django.conf import settings


def generate_ai_content(topic, content_type, tone):
    client = OpenAI(api_key=settings.OPENAI_API_KEY)

    prompt = f"""
    You are a professional marketing copywriter.

    Generate a {content_type} about {topic}.
    Tone: {tone}
    Make it engaging and structured.
    """
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
