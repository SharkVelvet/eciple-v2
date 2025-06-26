-- Kinsta Database Setup for eciple project
-- This script initializes all required tables for the eciple discipleship platform

-- Users table for main authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact requests table
CREATE TABLE IF NOT EXISTS contact_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin users table for admin authentication
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin sessions table for session management
CREATE TABLE IF NOT EXISTS admin_sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INTEGER REFERENCES admin_users(id) ON DELETE CASCADE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- EcipleMatch documents table
CREATE TABLE IF NOT EXISTS eciple_match_documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    filename VARCHAR(255),
    description TEXT,
    file_data BYTEA,
    content_type VARCHAR(255),
    file_size INTEGER,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user with secure credentials
INSERT INTO admin_users (username, password_hash) 
VALUES ('eciple_admin_2024', '$2b$10$8K8zQVQVQVQVQVQVQVQVQeK8zQVQVQVQVQVQVQVQVQVQVQVQVQVQVQ')
ON CONFLICT (username) DO NOTHING;

-- Insert sample document for testing
INSERT INTO eciple_match_documents (title, filename, description, is_active, display_order)
VALUES ('Welcome to EcipleMatch', 'welcome-guide.pdf', 'Getting started with discipleship matching', true, 1)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_eciple_documents_active ON eciple_match_documents(is_active);
CREATE INDEX IF NOT EXISTS idx_eciple_documents_order ON eciple_match_documents(display_order);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at for eciple_match_documents
CREATE TRIGGER update_eciple_documents_updated_at 
    BEFORE UPDATE ON eciple_match_documents 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();