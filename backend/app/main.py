# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, analytics, tasks, projects, okr, users
from app.core.config import settings

app = FastAPI(
    title="AI Strategy Solutions API",
    description="API для аналитической платформы",
    version="1.0.0",
)

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение роутеров
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(okr.router, prefix="/api/okr", tags=["okr"])
app.include_router(users.router, prefix="/api/users", tags=["users"])

@app.get("/api/health")
def health_check():
    return {"status": "ok"}