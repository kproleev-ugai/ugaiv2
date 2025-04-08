# app/api/projects.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.auth import get_current_user
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from typing import List, Optional

router = APIRouter()

@router.get("/", response_model=List[ProjectResponse])
def get_projects(
    status: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    from app.services.projects import get_projects
    return get_projects(db, current_user.id, status, category)

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    from app.services.projects import get_project_by_id
    project = get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Проект не найден"
        )
    return project

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(project_in: ProjectCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    from app.services.projects import create_project
    return create_project(db, project_in, current_user.id)

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: int, project_in: ProjectUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    from app.services.projects import update_project
    project = update_project(db, project_id, project_in, current_user.id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Проект не найден"
        )
    return project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    from app.services.projects import delete_project
    result = delete_project(db, project_id, current_user.id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Проект не найден"
        )
    return None