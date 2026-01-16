from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Dict
import sqlite3
import os
from .auth import verify_token

router = APIRouter(prefix="/api/settings", tags=["settings"])

def get_settings_db():
    """Get direct SQLite connection for settings."""
    db_path = os.path.join(os.path.dirname(__file__), "../../portfolio.db")
    conn = sqlite3.connect(db_path, check_same_thread=False)
    try:
        yield conn
    finally:
        conn.close()

class SettingUpdate(BaseModel):
    key: str
    value: str

@router.get("")
async def get_settings(db: sqlite3.Connection = Depends(get_settings_db)) -> Dict[str, str]:
    """Get all settings"""
    cursor = db.cursor()
    cursor.execute("SELECT key, value FROM settings")
    settings = {row[0]: row[1] for row in cursor.fetchall()}
    return settings

@router.put("")
async def update_setting(
    setting: SettingUpdate,
    db: sqlite3.Connection = Depends(get_settings_db),
    token: str = Depends(verify_token)
):
    """Update a setting (admin only)"""
    cursor = db.cursor()
    cursor.execute(
        "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)",
        (setting.key, setting.value)
    )
    db.commit()
    return {"message": "Setting updated successfully"}

@router.post("/batch")
async def update_settings_batch(
    settings: Dict[str, str],
    db: sqlite3.Connection = Depends(get_settings_db),
    token: str = Depends(verify_token)
):
    """Update multiple settings at once (admin only)"""
    cursor = db.cursor()
    for key, value in settings.items():
        cursor.execute(
            "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)",
            (key, value)
        )
    db.commit()
    return {"message": "Settings updated successfully"}
