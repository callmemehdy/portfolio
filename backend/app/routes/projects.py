"""API routes for project management."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.database import get_db
from app.models.project import Project
from app.models.schemas import ProjectCreate, ProjectUpdate, ProjectResponse
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("", response_model=List[ProjectResponse])
async def get_projects(db: Session = Depends(get_db)):
    """Get all selected projects ordered by display_order (only visible ones for public)."""
    projects = db.query(Project).filter(Project.is_visible == True).order_by(Project.display_order.desc(), Project.updated_at.desc()).all()
    return projects


@router.get("/all", response_model=List[ProjectResponse])
async def get_all_projects(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Get ALL projects including hidden ones (requires authentication)."""
    projects = db.query(Project).order_by(Project.display_order.desc(), Project.updated_at.desc()).all()
    return projects


@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Add a repository to the portfolio (requires authentication)."""
    # Check if project already exists
    existing = db.query(Project).filter(
        Project.repo_name == project.repo_name,
        Project.repo_owner == project.repo_owner
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project already exists in portfolio"
        )
    
    # Create new project
    db_project = Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    return db_project


@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: int,
    project: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Update a project (requires authentication)."""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    
    if not db_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Update fields
    update_data = project.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_project, field, value)
    
    db.commit()
    db.refresh(db_project)
    
    return db_project


@router.patch("/{project_id}/visibility", response_model=ProjectResponse)
async def toggle_project_visibility(
    project_id: int,
    visibility_data: dict,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Toggle project visibility (requires authentication)."""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    
    if not db_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    db_project.is_visible = visibility_data.get("is_visible", True)
    db.commit()
    db.refresh(db_project)
    
    return db_project


@router.patch("/{project_id}/description", response_model=ProjectResponse)
async def update_project_description(
    project_id: int,
    description_data: dict,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Update project custom description (requires authentication)."""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    
    if not db_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    db_project.custom_description = description_data.get("custom_description", "")
    db.commit()
    db.refresh(db_project)
    
    return db_project


@router.patch("/{project_id}/order", response_model=ProjectResponse)
async def update_project_order(
    project_id: int,
    order_data: dict,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Update project display order (requires authentication)."""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    
    if not db_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    db_project.display_order = order_data.get("display_order", 0)
    db.commit()
    db.refresh(db_project)
    
    return db_project


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Remove a project from portfolio (requires authentication)."""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    
    if not db_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    db.delete(db_project)
    db.commit()
    
    return None
