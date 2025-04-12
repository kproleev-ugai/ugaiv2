from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime, date

class KeyResultBase(BaseModel):
    title: str
    target_value: str
    unit: str
    start_value: str = "0"
    current_value: Optional[str] = None

class KeyResultCreate(KeyResultBase):
    objective_id: str

class KeyResult(KeyResultBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class ObjectiveBase(BaseModel):
    title: str
    description: str
    category: str
    owner: str
    start_date: date
    end_date: date

class ObjectiveCreate(ObjectiveBase):
    key_results: List[KeyResultBase]

class ObjectiveUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    owner: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None

class Objective(ObjectiveBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    key_results: List[KeyResult] = []
    progress: Optional[int] = 0

    class Config:
        orm_mode = True
