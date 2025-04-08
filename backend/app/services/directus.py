# app/services/directus.py
import httpx
from app.core.config import settings

class DirectusClient:
    def __init__(self):
        self.base_url = settings.DIRECTUS_URL
        self.token = settings.DIRECTUS_API_TOKEN
        self.headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json"
        }
    
    async def get_items(self, collection, params=None):
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/items/{collection}",
                headers=self.headers,
                params=params
            )
            response.raise_for_status()
            return response.json()["data"]
    
    async def get_item(self, collection, id):
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/items/{collection}/{id}",
                headers=self.headers
            )
            response.raise_for_status()
            return response.json()["data"]
    
    async def create_item(self, collection, data):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/items/{collection}",
                headers=self.headers,
                json=data
            )
            response.raise_for_status()
            return response.json()["data"]
    
    async def update_item(self, collection, id, data):
        async with httpx.AsyncClient() as client:
            response = await client.patch(
                f"{self.base_url}/items/{collection}/{id}",
                headers=self.headers,
                json=data
            )
            response.raise_for_status()
            return response.json()["data"]
    
    async def delete_item(self, collection, id):
        async with httpx.AsyncClient() as client:
            response = await client.delete(
                f"{self.base_url}/items/{collection}/{id}",
                headers=self.headers
            )
            response.raise_for_status()
            return True