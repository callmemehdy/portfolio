"""API routes for GitHub integration."""
from fastapi import APIRouter, HTTPException, status
from typing import List
from app.models.schemas import GitHubRepo, GitHubRepoDetail
from app.services.github_service import github_service

router = APIRouter(prefix="/api/github", tags=["github"])


@router.get("/repos", response_model=List[GitHubRepo])
async def get_github_repos():
    """Fetch all GitHub repositories for the authenticated user."""
    try:
        repos = await github_service.get_user_repos()
        return repos
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch repositories: {str(e)}"
        )


@router.get("/repo/{owner}/{repo}", response_model=GitHubRepoDetail)
async def get_github_repo_detail(owner: str, repo: str):
    """Fetch detailed information for a specific repository."""
    try:
        repo_data = await github_service.get_repo_details(owner, repo)
        return repo_data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch repository details: {str(e)}"
        )
