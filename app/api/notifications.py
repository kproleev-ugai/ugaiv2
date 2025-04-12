from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, status, Query

from app.core.directus import directus
from app.api.users import get_current_user
from app.schemas.user import User
from app.schemas.notification import Notification, NotificationCreate, NotificationUpdate

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.get("/", response_model=List[Notification])
async def get_notifications(
    filter: Optional[str] = "all",
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get all notifications for the current user
    """
    params = {
        "filter": {
            "user_id": {"_eq": current_user["id"]}
        }
    }
    
    # Add additional filters if provided
    if filter == "unread":
        params["filter"]["read"] = {"_eq": False}
    elif filter not in ["all"]:
        params["filter"]["category"] = {"_eq": filter}
    
    notifications = await directus.get_items("notifications", params)
    
    # Format the notifications to match frontend expectations
    formatted_notifications = []
    for notification in notifications:
        formatted_notification = {
            "id": notification["id"],
            "type": notification["type"],
            "title": notification["title"],
            "description": notification["description"],
            "time": notification.get("time", ""),
            "date": notification.get("date", ""),
            "read": notification["read"],
            "category": notification["category"],
            "action": notification.get("action", ""),
        }
        
        # Add user info if available
        if "user" in notification and notification["user"]:
            formatted_notification["user"] = {
                "name": notification["user"].get("name", ""),
                "avatar": notification["user"].get("avatar", "")
            }
        
        formatted_notifications.append(formatted_notification)
    
    return formatted_notifications

@router.post("/", response_model=Notification)
async def create_notification(
    notification_in: NotificationCreate,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Create a new notification
    """
    notification_data = notification_in.dict()
    notification_data["user_created"] = current_user["id"]
    
    # Format time and date
    from datetime import datetime
    now = datetime.now()
    notification_data["time"] = now.strftime("%H:%M")
    notification_data["date"] = now.strftime("%d.%m.%Y")
    
    notification = await directus.create_item("notifications", notification_data)
    return notification

@router.put("/{notification_id}/read", response_model=Notification)
async def mark_notification_as_read(
    notification_id: str,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Mark a notification as read
    """
    notification = await directus.get_item("notifications", notification_id)
    
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found",
        )
    
    if notification["user_id"] != current_user["id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this notification",
        )
    
    updated_notification = await directus.update_item("notifications", notification_id, {"read": True})
    return updated_notification

@router.put("/read-all", status_code=status.HTTP_204_NO_CONTENT)
async def mark_all_notifications_as_read(
    current_user: User = Depends(get_current_user)
) -> None:
    """
    Mark all notifications as read
    """
    # Get all unread notifications for the user
    params = {
        "filter": {
            "user_id": {"_eq": current_user["id"]},
            "read": {"_eq": False}
        }
    }
    
    notifications = await directus.get_items("notifications", params)
    
    # Update each notification
    for notification in notifications:
        await directus.update_item("notifications", notification["id"], {"read": True})

@router.delete("/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_notification(
    notification_id: str,
    current_user: User = Depends(get_current_user)
) -> None:
    """
    Delete a notification
    """
    notification = await directus.get_item("notifications", notification_id)
    
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found",
        )
    
    if notification["user_id"] != current_user["id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this notification",
        )
    
    await directus.delete_item("notifications", notification_id)

@router.delete("/", status_code=status.HTTP_204_NO_CONTENT)
async def clear_all_notifications(
    current_user: User = Depends(get_current_user)
) -> None:
    """
    Clear all notifications for the current user
    """
    # Get all notifications for the user
    params = {
        "filter": {
            "user_id": {"_eq": current_user["id"]}
        }
    }
    
    notifications = await directus.get_items("notifications", params)
    
    # Delete each notification
    for notification in notifications:
        await directus.delete_item("notifications", notification["id"])
