from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class DocumentType(str, Enum):
    pdf = "pdf"
    doc = "doc"
    image = "image"
    spreadsheet = "spreadsheet"
    archive = "archive"

class DocumentBase(BaseModel):
    name: str
    type: DocumentType
    size: str
    owner: str
    owner_avatar: Optional[str] = None
    project: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None
    url: Optional[str] = None

class DocumentCreate(DocumentBase):
    pass

class DocumentUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None

class Document(DocumentBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    view_count: Optional[int] = 0
    download_count: Optional[int] = 0

    class Config:
        orm_mode = True

class DocumentComment(BaseModel):
    id: str
    author: str
    author_avatar: str
    date: str
    content: str

class DocumentVersion(BaseModel):
    id: str
    version: str
    date: str
    author: str
    changes: str
