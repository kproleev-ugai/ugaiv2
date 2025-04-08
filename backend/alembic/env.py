import os
import sys
from logging.config import fileConfig
from alembic import context
from sqlalchemy import engine_from_config, pool

# Добавляем корневую директорию проекта в PYTHONPATH, чтобы можно было импортировать модули из app
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

# Получаем конфигурацию Alembic из файла alembic.ini
config = context.config

# Настройка логирования из файла alembic.ini, если он указан
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Импортируем настройки и метаданные моделей
from app.core.config import settings
from app.db.base import Base

# Это метаданные моделей, которые будут использоваться Alembic для автогенерации миграций
target_metadata = Base.metadata

def run_migrations_offline():
    """Запуск миграций в offline-режиме."""
    url = settings.DATABASE_URL
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Запуск миграций в online-режиме."""
    # Читаем конфигурацию из alembic.ini и обновляем URL подключения из настроек
    configuration = config.get_section(config.config_ini_section)
    configuration["sqlalchemy.url"] = settings.DATABASE_URL
    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()