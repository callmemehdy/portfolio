
# Settings table
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
