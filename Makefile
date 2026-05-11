.PHONY: help install setup start stop clean test

BLUE := \033[0;34m
GREEN := \033[0;32m
NC := \033[0m # No Color

push:
	@git add . && read -p "Enter a commit message: " c && git commit -m "$$c" && git push

help:
	@echo "$(BLUE)Portfolio Frontend - Available Commands$(NC)"
	@echo ""
	@echo "$(GREEN)Setup:$(NC)"
	@echo "  make install          - Install frontend dependencies"
	@echo "  make setup            - Setup environment files"
	@echo ""
	@echo "$(GREEN)Running:$(NC)"
	@echo "  make start            - Start frontend development server"
	@echo "  make build            - Build frontend for production"
	@echo "  make preview          - Preview production build"
	@echo "  make stop             - Stop frontend server"
	@echo ""
	@echo "$(GREEN)Development:$(NC)"
	@echo "  make lint             - Run linter"
	@echo "  make clean            - Remove generated files and caches"
	@echo ""

install:
	@echo "$(BLUE)Installing frontend dependencies...$(NC)"
	cd frontend && npm install
	@echo "$(GREEN)Frontend dependencies installed!$(NC)"

setup:
	@echo "$(BLUE)Setting up environment files...$(NC)"
	@if [ ! -f frontend/.env ]; then \
		cp frontend/.env.example frontend/.env; \
		echo "$(GREEN)Created frontend/.env from template$(NC)"; \
		echo "$(BLUE)Edit frontend/.env and set your GitHub username$(NC)"; \
	else \
		echo "frontend/.env already exists"; \
	fi

start:
	@echo "$(BLUE)Starting frontend development server...$(NC)"
	@echo "Frontend will run on http://localhost:5173"
	@echo ""
	@cd frontend && npm run dev

build:
	@echo "$(BLUE)Building frontend for production...$(NC)"
	@cd frontend && npm run build
	@echo "$(GREEN)Build complete! Output in frontend/dist$(NC)"

preview:
	@echo "$(BLUE)Previewing production build...$(NC)"
	@cd frontend && npm run preview

stop:
	@echo "$(BLUE)Stopping frontend server...$(NC)"
	@pkill -f "vite" || true
	@echo "$(GREEN)Frontend stopped$(NC)"

lint:
	@echo "$(BLUE)Running linter...$(NC)"
	@cd frontend && npm run lint

clean:
	@echo "$(BLUE)Cleaning generated files...$(NC)"
	@rm -rf frontend/dist
	@rm -rf frontend/.vite
	@echo "$(GREEN)Cleanup complete$(NC)"

clean-all: clean
	@echo "$(BLUE)Removing all dependencies...$(NC)"
	@rm -rf frontend/node_modules
	@echo "$(GREEN)All dependencies removed$(NC)"

