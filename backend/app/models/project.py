"""Database models for portfolio projects."""
from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean
from datetime import datetime
from app.database.database import Base


class Project(Base):
    """Model for storing selected portfolio projects."""
    
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    repo_name = Column(String, unique=True, nullable=False, index=True)
    repo_owner = Column(String, nullable=False)
    custom_description = Column(Text, nullable=True)
    display_order = Column(Integer, default=0)
    is_visible = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f"<Project {self.repo_owner}/{self.repo_name}>"
