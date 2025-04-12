from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.core.security import create_access_token, verify_password, get_password_hash
from app.core.config import settings
from app.core.directus import directus
from app.schemas.user import User, Token, UserCreate

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=Token)
async def login_access_token(form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    # Get user from Directus
    users = await directus.get_items(
        "users", 
        {"filter": {"email": {"_eq": form_data.username}}}
    )
    
    if not users or len(users) == 0:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    user = users[0]
    
    # Verify password
    if not verify_password(form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(
            user["id"], expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.post("/register", response_model=User)
async def register_user(user_in: UserCreate) -> Any:
    """
    Register a new user
    """
    # Check if user already exists
    users = await directus.get_items(
        "users", 
        {"filter": {"email": {"_eq": user_in.email}}}
    )
    
    if users and len(users) > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )
    
    # Create user in Directus
    hashed_password = get_password_hash(user_in.password)
    user_data = {
        "email": user_in.email,
        "name": user_in.name,
        "password": hashed_password,
        "role": "3f7f4712-651c-4d4b-b422-17b9d167d48c"  # Default user role ID
    }
    
    user = await directus.create_item("users", user_data)
    return user
