.PHONY: help install-backend install-frontend install setup start stop clean test backend frontend

BLUE := \033[0;34m
GREEN := \033[0;32m
NC := \033[0m # No Color

help:
	@echo "$(BLUE)Vintage Portfolio - Available Commands$(NC)"
	@echo ""
	@echo "$(GREEN)Setup:$(NC)"
	@echo "  make install          - Install all dependencies (backend + frontend)"
	@echo "  make setup            - Setup environment files"
	@echo ""
	@echo "$(GREEN)Running:$(NC)"
	@echo "  make start            - Start both backend and frontend servers"
	@echo "  make backend          - Start only backend server"
	@echo "  make frontend         - Start only frontend server"
	@echo "  make stop             - Stop all running servers"
	@echo ""
	@echo "$(GREEN)Development:$(NC)"
	@echo "  make test             - Run tests"
	@echo "  make clean            - Remove generated files and caches"
	@echo "  make clean-all        - Remove all including node_modules and venv"
	@echo ""

install: install-backend install-frontend
	@echo "$(GREEN)All dependencies installed successfully!$(NC)"

install-backend:
	@echo "$(BLUE)Installing backend dependencies...$(NC)"
	cd backend && python3 -m venv venv
	cd backend && ./venv/bin/pip install --upgrade pip setuptools wheel
	cd backend && ./venv/bin/pip install -r requirements.txt
	@echo "$(GREEN)Backend dependencies installed!$(NC)"

install-frontend:
	@echo "$(BLUE)Installing frontend dependencies...$(NC)"
	cd frontend && npm install
	@echo "$(GREEN)Frontend dependencies installed!$(NC)"

setup:
	@echo "$(BLUE)Setting up environment files...$(NC)"
	@if [ ! -f backend/.env ]; then \
		cp backend/.env.example backend/.env; \
		echo "$(GREEN)Created backend/.env from template$(NC)"; \
		echo "$(BLUE)Please edit backend/.env and add your GitHub token$(NC)"; \
	else \
		echo "backend/.env already exists"; \
	fi
	@if [ ! -f frontend/.env ]; then \
		cp frontend/.env.example frontend/.env; \
		echo "$(GREEN)Created frontend/.env$(NC)"; \
	else \
		echo "frontend/.env already exists"; \
	fi

start:
	@echo "$(BLUE)Starting both servers...$(NC)"
	@echo "Backend will run on http://localhost:8000"
	@echo "Frontend will run on http://localhost:5173"
	@echo ""
	@make -j2 backend frontend

backend:
	@echo "$(BLUE)Starting backend server...$(NC)"
	cd backend && ./venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

frontend:
	@echo "$(BLUE)Starting frontend server...$(NC)"
	cd frontend && npm run dev

stop:
	@echo "$(BLUE)Stopping all servers...$(NC)"
	@pkill -f "uvicorn app.main:app" || true
	@pkill -f "vite" || true
	@echo "$(GREEN)All servers stopped$(NC)"

test:
	@echo "$(BLUE)Running tests...$(NC)"
	@echo "Testing backend health endpoint..."
	@curl -s http://localhost:8000/health || echo "Backend not running"
	@echo ""
	@echo "Testing frontend..."
	@curl -s http://localhost:5173 > /dev/null && echo "Frontend is running" || echo "Frontend not running"

clean:
	@echo "$(BLUE)Cleaning generated files...$(NC)"
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name "*.db" -delete
	rm -rf backend/*.db
	rm -rf .pytest_cache
	rm -rf frontend/dist
	@echo "$(GREEN)Cleanup complete$(NC)"

clean-all: clean
	@echo "$(BLUE)Removing all dependencies...$(NC)"
	rm -rf backend/venv
	rm -rf frontend/node_modules
	@echo "$(GREEN)All dependencies removed$(NC)"

dev-backend:
	cd backend && ./venv/bin/python -m pytest tests/ -v

dev-frontend:
	cd frontend && npm run build
	cd frontend && npm run preview
