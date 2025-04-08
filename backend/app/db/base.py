from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Создание базового класса для моделей
Base = declarative_base()

# Настройки для подключения к базе данных из переменных окружения
SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

# Создание объекта engine для подключения к базе данных PostgreSQL
# Здесь предполагается, что у вас настроен PostgreSQL в Docker (через `docker-compose`) или на локальном сервере
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Создание sessionmaker для работы с сессиями
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Функция для получения сессии (будет использоваться в зависимости, чтобы передать сессию в эндпоинты)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()