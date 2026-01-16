"""Service for interacting with GitHub API."""
import httpx
import markdown
import base64
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from app.config import settings


class GitHubCache:
    """Simple in-memory cache for GitHub API responses."""
    
    def __init__(self, ttl_minutes: int = 10):
        self.cache: Dict[str, Dict[str, Any]] = {}
        self.ttl = timedelta(minutes=ttl_minutes)
    
    def get(self, key: str) -> Optional[Any]:
        """Get cached value if not expired."""
        if key in self.cache:
            item = self.cache[key]
            if datetime.utcnow() < item["expires"]:
                return item["value"]
            else:
                del self.cache[key]
        return None
    
    def set(self, key: str, value: Any):
        """Set cached value with expiration."""
        self.cache[key] = {
            "value": value,
            "expires": datetime.utcnow() + self.ttl
        }
    
    def clear(self):
        """Clear all cached values."""
        self.cache.clear()


# Global cache instance
github_cache = GitHubCache(ttl_minutes=10)


class GitHubService:
    """Service for GitHub API interactions."""
    
    BASE_URL = "https://api.github.com"
    
    def __init__(self):
        self.headers = {
            "Authorization": f"token {settings.github_token}",
            "Accept": "application/vnd.github.v3+json"
        }
    
    async def get_user_repos(self) -> List[Dict[str, Any]]:
        """Fetch all repositories for the authenticated user."""
        cache_key = f"repos_{settings.github_username}"
        cached = github_cache.get(cache_key)
        if cached:
            return cached
        
        repos = []
        page = 1
        per_page = 100
        
        async with httpx.AsyncClient() as client:
            while True:
                response = await client.get(
                    f"{self.BASE_URL}/user/repos",
                    headers=self.headers,
                    params={
                        "per_page": per_page,
                        "page": page,
                        "sort": "updated",
                        "affiliation": "owner"
                    }
                )
                response.raise_for_status()
                
                page_repos = response.json()
                if not page_repos:
                    break
                
                repos.extend(page_repos)
                page += 1
                
                # GitHub API returns empty array when no more pages
                if len(page_repos) < per_page:
                    break
        
        github_cache.set(cache_key, repos)
        return repos
    
    async def get_repo_details(self, owner: str, repo: str) -> Dict[str, Any]:
        """Fetch detailed information for a specific repository."""
        cache_key = f"repo_{owner}_{repo}"
        cached = github_cache.get(cache_key)
        if cached:
            return cached
        
        async with httpx.AsyncClient() as client:
            # Get repository details
            repo_response = await client.get(
                f"{self.BASE_URL}/repos/{owner}/{repo}",
                headers=self.headers
            )
            repo_response.raise_for_status()
            repo_data = repo_response.json()
            
            # Get README
            readme_content = None
            readme_html = None
            try:
                readme_response = await client.get(
                    f"{self.BASE_URL}/repos/{owner}/{repo}/readme",
                    headers=self.headers
                )
                if readme_response.status_code == 200:
                    readme_data = readme_response.json()
                    readme_content = base64.b64decode(readme_data["content"]).decode("utf-8")
                    readme_html = markdown.markdown(
                        readme_content, 
                        extensions=['fenced_code', 'tables', 'codehilite']
                    )
            except:
                pass
            
            # Get latest commits
            commits = []
            try:
                commits_response = await client.get(
                    f"{self.BASE_URL}/repos/{owner}/{repo}/commits",
                    headers=self.headers,
                    params={"per_page": 5}
                )
                if commits_response.status_code == 200:
                    commits_data = commits_response.json()
                    commits = [
                        {
                            "sha": commit["sha"][:7],
                            "message": commit["commit"]["message"].split("\n")[0],
                            "author": commit["commit"]["author"]["name"],
                            "date": commit["commit"]["author"]["date"]
                        }
                        for commit in commits_data
                    ]
            except:
                pass
            
            result = {
                **repo_data,
                "readme": readme_content,
                "readme_html": readme_html,
                "latest_commits": commits
            }
            
            github_cache.set(cache_key, result)
            return result
    
    async def get_repo_languages(self, owner: str, repo: str) -> Dict[str, int]:
        """Fetch languages used in a repository."""
        cache_key = f"languages_{owner}_{repo}"
        cached = github_cache.get(cache_key)
        if cached:
            return cached
        
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/repos/{owner}/{repo}/languages",
                headers=self.headers
            )
            response.raise_for_status()
            languages = response.json()
            
            github_cache.set(cache_key, languages)
            return languages


# Global service instance
github_service = GitHubService()
