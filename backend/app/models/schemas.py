"""Pydantic schemas for request/response validation."""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class ProjectCreate(BaseModel):
    """Schema for creating a new project."""
    repo_name: str = Field(..., description="Repository name")
    repo_owner: str = Field(..., description="Repository owner")
    custom_description: Optional[str] = Field(None, description="Custom description for the project")
    display_order: int = Field(0, description="Display order priority")


class ProjectUpdate(BaseModel):
    """Schema for updating a project."""
    custom_description: Optional[str] = None
    display_order: Optional[int] = None
    is_visible: Optional[bool] = None


class ProjectResponse(BaseModel):
    """Schema for project response."""
    id: int
    repo_name: str
    repo_owner: str
    custom_description: Optional[str]
    display_order: int
    is_visible: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class GitHubOwner(BaseModel):
    """Schema for GitHub repository owner."""
    login: str
    id: int
    avatar_url: str
    html_url: str


class GitHubRepo(BaseModel):
    """Schema for GitHub repository data."""
    id: int
    name: str
    full_name: str
    owner: GitHubOwner
    description: Optional[str]
    html_url: str
    homepage: Optional[str]
    stargazers_count: int
    forks_count: int
    language: Optional[str]
    topics: List[str] = []
    created_at: str
    updated_at: str
    pushed_at: str
    size: int
    default_branch: str
    open_issues_count: int


class GitHubRepoDetail(GitHubRepo):
    """Extended schema with README and commits."""
    readme: Optional[str] = None
    readme_html: Optional[str] = None
    latest_commits: List[dict] = []


class LoginRequest(BaseModel):
    """Schema for login request."""
    password: str


class Token(BaseModel):
    """Schema for JWT token response."""
    access_token: str
    token_type: str = "bearer"
