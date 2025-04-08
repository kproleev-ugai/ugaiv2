# app/core/logging.py
import logging
import sys
from loguru import logger
from app.core.config import settings

class InterceptHandler(logging.Handler):
    def emit(self, record):
        # Получаем соответствующий уровень Loguru
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # Находим вызывающий кадр
        frame, depth = logging.currentframe(), 2
        while frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(level, record.getMessage())

def setup_logging():
    # Удаляем все обработчики по умолчанию
    logging.basicConfig(handlers=[InterceptHandler()], level=0)
    
    # Перехватываем логи из других модулей
    for logger_name in ["uvicorn", "uvicorn.error", "fastapi"]:
        logging_logger = logging.getLogger(logger_name)
        logging_logger.handlers = [InterceptHandler()]
    
    # Настраиваем Loguru
    logger.configure(
        handlers=[
            {
                "sink": sys.stdout,
                "level": "DEBUG" if settings.DEBUG else "INFO",
                "format": "<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
            },
            {
                "sink": "logs/app.log",
                "rotation": "10 MB",
                "retention": "1 week",
                "level": "INFO",
                "format": "{time:YYYY-MM-DD HH:mm:ss.SSS} | {level: <8} | {name}:{function}:{line} - {message}",
            },
        ]
    )