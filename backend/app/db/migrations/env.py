import os
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context
from dotenv import load_dotenv

# ✅ Загружаем переменные из .env, находящегося в корне backend
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../../../.env"))

# Alembic Config object
config = context.config

# ✅ Устанавливаем переменную sqlalchemy.url из .env
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise RuntimeError("DATABASE_URL не найден в .env")
config.set_main_option("sqlalchemy.url", DATABASE_URL)

# ✅ Настройка логгирования
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# ✅ Импорт моделей — только после настройки путей и переменных
from app.models.base import Base

# ✅ Устанавливаем metadata всех моделей проекта
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """Миграции в offline-режиме (без подключения к БД)"""
    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Миграции в online-режиме (с подключением к БД)"""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,  # важно при изменениях типов колонок
        )
        with context.begin_transaction():
            context.run_migrations()

# ✅ Запуск режима миграции
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()