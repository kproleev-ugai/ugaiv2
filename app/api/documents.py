from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File
from fastapi.responses import FileResponse

from app.core.directus import directus
from app.api.users import get_current_user
from app.schemas.user import User
from app.schemas.document import Document, DocumentCreate, DocumentUpdate, DocumentComment, DocumentVersion

router = APIRouter(prefix="/documents", tags=["documents"])

@router.get("/", response_model=List[Document])
async def get_documents(
    type: Optional[str] = None,
    project: Optional[str] = None,
    search: Optional[str] = None,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get all documents
    """
    params = {}
    
    # Add filters if provided
    if type or project or search:
        filters = {}
        if type:
            filters["type"] = {"_eq": type}
        if project:
            filters["project"] = {"_eq": project}
        if search:
            filters["_or"] = [
                {"name": {"_contains": search}},
                {"description": {"_contains": search}}
            ]
        params["filter"] = filters
    
    documents = await directus.get_items("documents", params)
    return documents

@router.post("/", response_model=Document)
async def create_document(
    document_in: DocumentCreate,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Create a new document
    """
    document_data = document_in.dict()
    document_data["user_created"] = current_user["id"]
    
    document = await directus.create_item("documents", document_data)
    return document

@router.get("/{document_id}", response_model=Document)
async def get_document(
    document_id: str,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get a specific document by ID
    """
    document = await directus.get_item("documents", document_id)
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )
    
    # Increment view count
    view_count = document.get("view_count", 0) + 1
    await directus.update_item("documents", document_id, {"view_count": view_  0) + 1
    await directus.update_item("documents", document_id, {"view_count": view_count})
    
    return document

@router.put("/{document_id}", response_model=Document)
async def update_document(
    document_id: str,
    document_in: DocumentUpdate,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Update a document
    """
    document = await directus.get_item("documents", document_id)
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )
    
    document_data = document_in.dict(exclude_unset=True)
    updated_document = await directus.update_item("documents", document_id, document_data)
    
    return updated_document

@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    document_id: str,
    current_user: User = Depends(get_current_user)
) -> None:
    """
    Delete a document
    """
    document = await directus.get_item("documents", document_id)
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )
    
    await directus.delete_item("documents", document_id)

@router.post("/upload", response_model=Document)
async def upload_document(
    file: UploadFile = File(...),
    name: Optional[str] = None,
    project: Optional[str] = None,
    description: Optional[str] = None,
    tags: Optional[str] = None,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Upload a new document
    """
    # Determine file type
    file_type = "doc"  # Default
    if file.filename:
        extension = file.filename.split(".")[-1].lower()
        if extension in ["pdf"]:
            file_type = "pdf"
        elif extension in ["jpg", "jpeg", "png", "gif"]:
            file_type = "image"
        elif extension in ["xlsx", "csv"]:
            file_type = "spreadsheet"
        elif extension in ["zip", "rar", "tar", "gz"]:
            file_type = "archive"
    
    # Upload file to Directus
    file_content = await file.read()
    file_data = {
        "title": name or file.filename,
        "file": file_content
    }
    
    uploaded_file = await directus.create_item("directus_files", file_data)
    
    # Create document record
    document_data = {
        "name": name or file.filename,
        "type": file_type,
        "size": f"{len(file_content) / 1024:.1f} KB",
        "owner": current_user["name"],
        "owner_avatar": current_user.get("avatar", ""),
        "project": project,
        "description": description,
        "tags": tags.split(",") if tags else [],
        "url": f"{settings.DIRECTUS_URL}/assets/{uploaded_file['id']}",
        "user_created": current_user["id"],
        "view_count": 0,
        "download_count": 0
    }
    
    document = await directus.create_item("documents", document_data)
    return document

@router.get("/{document_id}/download")
async def download_document(
    document_id: str,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Download a document
    """
    document = await directus.get_item("documents", document_id)
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )
    
    # Increment download count
    download_count = document.get("download_count", 0) + 1
    await directus.update_item("documents", document_id, {"download_count": download_count})
    
    # Return file
    return {"url": document["url"]}

@router.get("/{document_id}/comments", response_model=List[DocumentComment])
async def get_document_comments(
    document_id: str,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get comments for a document
    """
    comments = await directus.get_items(
        "document_comments", 
        {"filter": {"document_id": {"_eq": document_id}}}
    )
    
    return comments

@router.get("/{document_id}/versions", response_model=List[DocumentVersion])
async def get_document_versions(
    document_id: str,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get versions of a document
    """
    versions = await directus.get_items(
        "document_versions", 
        {"filter": {"document_id": {"_eq": document_id}}}
    )
    
    return versions
