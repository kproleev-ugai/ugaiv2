from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse

from app.api import auth, projects, documents, analytics, notifications, users, okr
from app.core.config import settings

app = FastAPI(
    title="UGAI Backend API",
    description="Backend API for UGAI Dashboard",
    version="1.0.0"
)

# CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(users.router, prefix="/api", tags=["users"])
app.include_router(projects.router, prefix="/api", tags=["projects"])
app.include_router(documents.router, prefix="/api", tags=["documents"])
app.include_router(analytics.router, prefix="/api", tags=["analytics"])
app.include_router(notifications.router, prefix="/api", tags=["notifications"])
app.include_router(okr.router, prefix="/api", tags=["okr"])

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "API is running"}

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
