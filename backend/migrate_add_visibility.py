"""Migration script to add is_visible column to existing projects."""
import sqlite3

def migrate():
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    
    # Check if column exists
    cursor.execute("PRAGMA table_info(projects)")
    columns = [column[1] for column in cursor.fetchall()]
    
    if 'is_visible' not in columns:
        print("Adding is_visible column...")
        cursor.execute("ALTER TABLE projects ADD COLUMN is_visible BOOLEAN DEFAULT 1")
        conn.commit()
        print("Migration complete! All existing projects set to visible.")
    else:
        print("Column is_visible already exists. No migration needed.")
    
    conn.close()

if __name__ == "__main__":
    migrate()
