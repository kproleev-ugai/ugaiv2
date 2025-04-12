from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, status, Query

from app.core.directus import directus
from app.api.users import get_current_user
from app.schemas.user import User
from app.schemas.okr import Objective, ObjectiveCreate, ObjectiveUpdate, KeyResult, KeyResultCreate

router = APIRouter(prefix="/okr", tags=["okr"])

@router.get("/objectives", response_model=List[Objective])
async def get_objectives(
    category: Optional[str] = None,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get all objectives
    """
    params = {}
    
    # Add filters if provided
    if category:
        params["filter"] = {"category": {"_eq": category}}
    
    objectives = await directus.get_items("objectives", params)
    
    # For each objective, get its key results
    for objective in objectives:
        key_results = await directus.get_items(
            "key_results", 
            {"filter": {"objective_id": {"_eq": objective["id"]}}}
        )
        objective["key_results"] = key_results
        
        # Calculate progress based on key results
        if key_results:
            total_progress = 0
            for kr in key_results:
                if kr.get("current_value") and kr.get("target_value"):
                    try:
                        current = float(kr["current_value"])
                        target = float(kr["target_value"])
                        start = float(kr.get("start_value", 0))
                        
                        # Calculate progress as percentage between start and target
                        if target != start:
                            kr_progress = min(100, max(0, ((current - start) / (target - start)) * 100))
                            total_progress += kr_progress
                    except (ValueError, TypeError):
                        pass
            
            objective["progress"] = int(total_progress / len(key_results)) if key_results else 0
        else:
            objective["progress"] = 0
    
    return objectives

@router.post("/objectives", response_model=Objective)
async def create_objective(
    objective_in: ObjectiveCreate,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Create a new objective with key results
    """
    # Extract key results from the input
    key_results_data = objective_in.key_results
    objective_data = objective_in.dict(exclude={"key_results"})
    
    # Add user created info
    objective_data["user_created"] = current_user["id"]
    
    # Create the objective
    objective = await directus.create_item("objectives", objective_data)
    
    # Create key results for this objective
    created_key_results = []
    for kr_data in key_results_data:
        kr = kr_data.dict()
        kr["objective_id"] = objective["id"]
        kr["user_created"] = current_user["id"]
        created_kr = await directus.create_item("key_results", kr)
        created_key_results.append(created_kr)
    
    # Add key results to the response
    objective["key_results"] = created_key_results
    objective["progress"] = 0  # New objective starts at 0% progress
    
    return objective

@router.get("/objectives/{objective_id}", response_model=Objective)
async def get_objective(
    objective_id: str,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get a specific objective by ID
    """
    objective = await directus.get_item("objectives", objective_id)
    
    if not objective:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Objective not found",
        )
    
    # Get key results for this objective
    key_results = await directus.get_items(
        "key_results", 
        {"filter": {"objective_id": {"_eq": objective_id}}}
    )
    
    objective["key_results"] = key_results
    
    # Calculate progress based on key results
    if key_results:
        total_progress = 0
        for kr in key_results:
            if kr.get("current_value") and kr.get("target_value"):
                try:
                    current = float(kr["current_value"])
                    target = float(kr["target_value"])
                    start = float(kr.get("start_value", 0))
                    
                    # Calculate progress as percentage between start and target
                    if target != start:
                        kr_progress = min(100, max(0, ((current - start) / (target - start)) * 100))
                        total_progress += kr_progress
                except (ValueError, TypeError):
                    pass
        
        objective["progress"] = int(total_progress / len(key_results)) if key_results else 0
    else:
        objective["progress"] = 0
    
    return objective

@router.put("/objectives/{objective_id}", response_model=Objective)
async def update_objective(
    objective_id: str,
    objective_in: ObjectiveUpdate,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Update an objective
    """
    objective = await directus.get_item("objectives", objective_id)
    
    if not objective:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Objective not found",
        )
    
    objective_data = objective_in.dict(exclude_unset=True)
    updated_objective = await directus.update_item("objectives", objective_id, objective_data)
    
    # Get key results for this objective
    key_results = await directus.get_items(
        "key_results", 
        {"filter": {"objective_id": {"_eq": objective_id}}}
    )
    
    updated_objective["key_results"] = key_results
    
    # Calculate progress based on key results
    if key_results:
        total_progress = 0
        for kr in key_results:
            if kr.get("current_value") and kr.get("target_value"):
                try:
                    current = float(kr["current_value"])
                    target = float(kr["target_value"])
                    start = float(kr.get("start_value", 0))
                    
                    # Calculate progress as percentage between start and target
                    if target != start:
                        kr_progress = min(100, max(0, ((current - start) / (target - start)) * 100))
                        total_progress += kr_progress
                except (ValueError, TypeError):
                    pass
        
        updated_objective["progress"] = int(total_progress / len(key_results)) if key_results else 0
    else:
        updated_objective["progress"] = 0
    
    return updated_objective

@router.delete("/objectives/{objective_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_objective(
    objective_id: str,
    current_user: User = Depends(get_current_user)
) -> None:
    """
    Delete an objective
    """
    objective = await directus.get_item("objectives", objective_id)
    
    if not objective:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Objective not found",
        )
    
    # Delete all key results for this objective
    key_results = await directus.get_items(
        "key_results", 
        {"filter": {"objective_id": {"_eq": objective_id}}}
    )
    
    for kr in key_results:
        await directus.delete_item("key_results", kr["id"])
    
    # Delete the objective
    await directus.delete_item("objectives", objective_id)

@router.post("/key-results", response_model=KeyResult)
async def create_key_result(
    key_result_in: KeyResultCreate,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Create a new key result for an objective
    """
    # Verify objective exists
    objective = await directus.get_item("objectives", key_result_in.objective_id)
    
    if not objective:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Objective not found",
        )
    
    key_result_data = key_result_in.dict()
    key_result_data["user_created"] = current_user["id"]
    
    key_result = await directus.create_item("key_results", key_result_data)
    return key_result

@router.put("/key-results/{key_result_id}", response_model=KeyResult)
async def update_key_result(
    key_result_id: str,
    key_result_in: dict,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Update a key result
    """
    key_result = await directus.get_item("key_results", key_result_id)
    
    if not key_result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Key result not found",
        )
    
    updated_key_result = await directus.update_item("key_results", key_result_id, key_result_in)
    return updated_key_result

@router.delete("/key-results/{key_result_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_key_result(
    key_result_id: str,
    current_user: User = Depends(get_current_user)
) -> None:
    """
    Delete a key result
    """
    key_result = await directus.get_item("key_results", key_result_id)
    
    if not key_result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Key result not found",
        )
    
    await directus.delete_item("key_results", key_result_id)
