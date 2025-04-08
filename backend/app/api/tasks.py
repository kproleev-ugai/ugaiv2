# app/api/tasks.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.auth import get_current_user
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from typing import List, Optional

router = APIRouter()

@router.get("/", response_model=List[TaskResponse])
def get_tasks(
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    assignee: Optional[str] = Query(None),
    project: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    from app.services.tasks import get_tasks
    return get_tasks(db, current_user.id, status, priority, assignee, project)

@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    from app.services.tasks import get_task_by_id
    task = get_task_by_id(db, task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Задача не найдена"
        )
    return task

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task_in: TaskCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    from app.services.tasks import create_task
    return create_task(db, task_in, current_user.id)

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task_in: TaskUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    from app.services.tasks import update_task
    task = update_task(db, task_id, task_in, current_user.id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Задача не найдена"
        )
    return task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    from app.services.tasks import delete_task
    result = delete_task(db, task_id, current_user.id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Задача не найдена"
        )
    return None

@router.patch("/{task_id}/status", response_model=TaskResponse)
def update_task_status(task_id: int, status_data: dict, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    from app.services.tasks import update_task_status
    task = update_task_status(db, task_id, status_data["status"], current_user.id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Задача не найдена"
        )
    return task

@router.patch("/{task_id}/complete", response_model=TaskResponse)
def toggle_task_completion(task_id: int, completion_data: dict, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    from app.services.tasks import toggle_task_completion
    task = toggle_task_completion(db, task_id, completion_data["completed"], current_user.id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Задача не найдена"
        )
    return task