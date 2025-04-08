from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://ugai_dw:Resurgam65!@ugai.psql.tools:10097/ugai_dw"
    
    SECRET_KEY: str = "super-secure-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    ALLOWED_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "https://ugai.tech"
    ]

    DIRECTUS_URL: AnyHttpUrl = "https://cms.ugai.tech"
    DIRECTUS_API_TOKEN: str = pw5VV6r1WmgebvO_STf4HttHjBHt_02i

    EMAIL_FROM: str = "noreply@ugai.tech"
    SMTP_SERVER: str = "smtp.ugai.tech"
    SMTP_PORT: int = 587
    SMTP_USE_TLS: bool = True
    SMTP_USERNAME: str = "smtp-user"
    SMTP_PASSWORD: str = "smtp-password"

    PUBLIC_DOMAIN: AnyHttpUrl = "https://ugai.tech"

    LOG_LEVEL: str = "INFO"
    CACHE_TIMEOUT: int = 300

    DEBUG: bool = False

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

settings = Settings()