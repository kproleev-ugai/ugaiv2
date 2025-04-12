from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from jose import jwt, JWTError

from app.core.security import oauth2_scheme
from app.core.config import settings
from app.core.directus import directus
from app.schemas.user import User, UserUpdate, UserProfile

router = APIRouter(prefix="/users", tags=["users"])

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    """
    Get the current user from the token
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
    
    user = await directus.get_item("users", user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    return user

@router.get("/me", response_model=UserProfile)
async def read_users_me(current_user: User = Depends(get_current_user)) -> Any:
    """
    Get current user profile
    """
    return {
        "id": current_user["id"],
        "name": current_user["name"],
        "email": current_user["email"],
        "bio": current_user.get("bio", ""),
        "avatar": current_user.get("avatar", ""),
        "urls": current_user.get("urls", {}),
        "role": current_user.get("role", "")
    }

@router.put("/me", response_model=UserProfile)
async def update_user_me(
    user_in: UserUpdate,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Update current user
    """
    user_data = user_in.dict(exclude_unset=True)
    
    # If password is being updated, hash it
    if "password" in user_data and user_data["password"]:
        from app.core.security import get_password_hash
        user_data["password"] = get_password_hash(user_data["password"])
    
    updated_user = await directus.update_item("users", current_user["id"], user_data)
    
    return {
        "id": updated_user["id"],
        "name": updated_user["name"],
        "email": updated_user["email"],
        "bio": updated_user.get("bio", ""),
        "avatar": updated_user.get("avatar", ""),
        "urls": updated_user.get("urls", {}),
        "role": updated_user.get("role", "")
    }
