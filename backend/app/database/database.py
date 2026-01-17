"""Database configuration and session management."""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings
import sqlite3
import os

# Create SQLite engine
engine = create_engine(
    settings.database_url, 
    connect_args={"check_same_thread": False}
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


def get_db():
    """Dependency to get database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initialize database tables."""
    Base.metadata.create_all(bind=engine)
    
    # Initialize settings table (raw SQLite)
    db_path = settings.database_url.replace('sqlite:///', '')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Insert default settings
    cursor.execute('''
    INSERT OR IGNORE INTO settings (key, value) VALUES
        ('full_name', 'Mehdi EL AKARY'),
        ('title', 'AI/Software Engineer'),
        ('subtitle', 'Machine Learning Enthusiast | 1337 Coding School'),
        ('email', 'mehdyakr@gmail.com'),
        ('phone', '+212 610-959642'),
        ('location', 'Casablanca, Morocco'),
        ('github', 'https://github.com/callmemehdy'),
        ('linkedin', 'https://linkedin.com/in/elakarymehdi'),
        ('bio', 'Highly driven AI/Software engineer with a strong passion for artificial intelligence and machine learning.')
    ''')
    
    conn.commit()
    conn.close()
