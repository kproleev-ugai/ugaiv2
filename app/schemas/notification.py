from typing import Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class NotificationType(str, Enum):
    info = "info"
    warning = "warning"
    success = "success"
    error = "error"

class NotificationCategory(str, Enum):
    system = "system"
    task = "task"
    project = "project"
    message = "message"
    calendar = "calendar"

class NotificationBase(BaseModel):
    type: NotificationType
    title: str
    description: str
    category: NotificationCategory
    user_id: str
    read: bool = False
    action: Optional[str] = None
    user: Optional[Dict[str, Any]] = None

class NotificationCreate(NotificationBase):
    pass

class NotificationUpdate(BaseModel):
    read: Optional[bool] = None

class Notification(NotificationBase):
    id: str
    created_at: datetime
    time: str
    date: str

    class Config:
        orm_mode = True
