# app/services/email.py
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings

def send_email(to_email, subject, html_content, text_content=None):
    # Создаем сообщение
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = settings.EMAIL_FROM
    msg["To"] = to_email
    
    # Добавляем текстовую версию
    if text_content:
        msg.attach(MIMEText(text_content, "plain"))
    
    # Добавляем HTML версию
    msg.attach(MIMEText(html_content, "html"))
    
    # Отправляем сообщение
    try:
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            if settings.SMTP_USE_TLS:
                server.starttls()
            
            if settings.SMTP_USERNAME and settings.SMTP_PASSWORD:
                server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            
            server.send_message(msg)
            return True
    except Exception as e:
        print(f"Email error: {e}")
        return False