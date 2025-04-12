import httpx
from typing import Dict, Any, Optional, List
from app.core.config import settings

class DirectusClient:
    def __init__(self):
        self.base_url = settings.DIRECTUS_URL
        self.token = settings.DIRECTUS_TOKEN
        self.client = httpx.AsyncClient(
            base_url=self.base_url,
            headers={"Authorization": f"Bearer {self.token}"}
        )
    
    async def login(self) -> str:
        """Login to Directus and get access token"""
        response = await self.client.post(
            "/auth/login",
            json={
                "email": settings.DIRECTUS_EMAIL,
                "password": settings.DIRECTUS_PASSWORD
            }
        )
        response.raise_for_status()
        data = response.json()
        self.token = data["data"]["access_token"]
        self.client.headers["Authorization"] = f"Bearer {self.token}"
        return self.token
    
    async def get_items(self, collection: str, params: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """Get items from a collection"""
        response = await self.client.get(f"/items/{collection}", params=params)
        response.raise_for_status()
        return response.json()["data"]
    
    async def get_item(self, collection: str, id: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Get a single item from a collection"""
        response = await self.client.get(f"/items/{collection}/{id}", params=params)
        response.raise_for_status()
        return response.json()["data"]
    
    async def create_item(self, collection: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new item in a collection"""
        response = await self.client.post(f"/items/{collection}", json=data)
        response.raise_for_status()
        return response.json()["data"]
    
    async def update_item(self, collection: str, id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Update an item in a collection"""
        response = await self.client.patch(f"/items/{collection}/{id}", json=data)
        response.raise_for_status()
        return response.json()["data"]
    
    async def delete_item(self, collection: str, id: str) -> None:
        """Delete an item from a collection"""
        response = await self.client.delete(f"/items/{collection}/{id}")
        response.raise_for_status()
    
    async def close(self):
        """Close the HTTP client"""
        await self.client.aclose()

directus = DirectusClient()
