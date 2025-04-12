from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, status, Query

from app.core.directus import directus
from app.api.users import get_current_user
from app.schemas.user import User
from app.schemas.project import Project, ProjectCreate, ProjectUpdate, ProjectDetail, Task, TaskCreate

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("/", response_model=List[Project])
async def get_projects(
    status: Optional[str] = None,
    search: Optional[str] = None,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get all projects
    """
    params = {}
    
    # Add filters if provided
    if status or search:
        filters = {}
        if status:
            filters["status"] = {"_eq": status}
        if search:
            filters["_or"] = [
                {"name": {"_contains": search}},
                {"description": {"_contains": search}}
            ]
        params["filter"] = filters
    
    projects = await directus.get_items("projects", params)
    return projects

@router.post("/", response_model=Project)
async def create_project(
    project_in: ProjectCreate,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Create a new project
    """
    project_data = project_in.dict()
    project_data["user_created"] = current_user["id"]
    
    project = await directus.create_item("projects", project_data)
    return project

@router.get("/{project_id}", response_model=ProjectDetail)
async def get_project(
    project_id: str,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get a specific project by ID
    """
    project = await directus.get_item("projects", project_id)
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )
    
    # Get tasks for this project
    tasks = await directus.get_items(
        "tasks", 
        {"filter": {"project_id": {"_eq": project_id}}}
    )
    
    # Get team members for this project
    team_members = await directus.get_items(
        "project_members", 
        {"filter": {"project_id": {"_eq": project_id}}}
    )
    
    # Enhance project with tasks and team
    project["tasks"] = tasks
    project["team"] = team_members
    
    return project

@router.put("/{project_id}", response_model=Project)
async def update_project(
    project_id: str,
    project_in: ProjectUpdate,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Update a project
    """
    project = await directus.get_item("projects", project_id)
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )
    
    project_data = project_in.dict(exclude_unset=True)
    updated_project = await directus.update_item("projects", project_id, project_data)
    
    return updated_project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: str,
    current_user: User = Depends(get_current_user)
) -> None:
    """
    Delete a project
    """
    project = await directus.get_item("projects", project_id)
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )
    
    await directus.delete_item("projects", project_id)

@router.post("/{project_id}/tasks", response_model=Task)
async def create_task(
    project_id: str,
    task_in: TaskCreate,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Create a new task for a project
    """
    # Verify project exists
    project = await directus.get_item("projects", project_id)
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )
    
    task_data = task_in.dict()
    task_data["project_id"] = project_id
    task_data["user_created"] = current_user["id"]
    
    task = await directus.create_item("tasks", task_data)
    return task
