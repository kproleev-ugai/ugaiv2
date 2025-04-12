from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum

class ProjectStatus(str, Enum):
    completed = "completed"
    in_progress = "in-progress"
    not_started = "not-started"
    delayed = "delayed"

class TaskPriority(str, Enum):
    high = "high"
    medium = "medium"
    low = "low"

class TaskStatus(str, Enum):
    completed = "completed"
    in_progress = "in-progress"
    not_started = "not-started"
    delayed = "delayed"

class TaskBase(BaseModel):
    name: str
    status: TaskStatus
    assignee: str
    assignee_avatar: Optional[str] = None
    due_date: str
    priority: TaskPriority

class TaskCreate(TaskBase):
    project_id: str

class Task(TaskBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class ProjectBase(BaseModel):
    name: str
    description: str
    status: ProjectStatus
    progress: int = Field(..., ge=0, le=100)
    start_date: str
    due_date: str
    budget: Optional[str] = None
    spent: Optional[str] = None
    client: Optional[str] = None
    manager: str
    manager_avatar: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ProjectStatus] = None
    progress: Optional[int] = Field(None, ge=0, le=100)
    start_date: Optional[str] = None
    due_date: Optional[str] = None
    budget: Optional[str] = None
    spent: Optional[str] = None
    client: Optional[str] = None
    manager: Optional[str] = None
    manager_avatar: Optional[str] = None

class Project(ProjectBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    tasks: Optional[List[Task]] = None

    class Config:
        orm_mode = True

class TeamMember(BaseModel):
    id: str
    name: str
    avatar: str
    role: str
    tasks_completed: int
    tasks_total: int

class ProjectDetail(Project):
    team: Optional[List[TeamMember]] = None
