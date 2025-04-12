import os
from typing import List
from pydantic import BaseSettings, AnyHttpUrl

class Settings(BaseSettings):
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-for-jwt")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS
    CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "http://localhost:8000",
    ]
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db:5432/ugai")
    
    # Directus
    DIRECTUS_URL: str = os.getenv("DIRECTUS_URL", "http://directus:8055")
    DIRECTUS_TOKEN: str = os.getenv("DIRECTUS_TOKEN", "")
    DIRECTUS_EMAIL: str = os.getenv("DIRECTUS_EMAIL", "admin@example.com")
    DIRECTUS_PASSWORD: str = os.getenv("DIRECTUS_PASSWORD", "admin")
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
