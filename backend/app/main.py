"""Main FastAPI application."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.database.database import init_db
from app.routes import projects, github, auth, settings as settings_routes


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup
    init_db()
    yield
    # Shutdown
    pass


# Create FastAPI application
app = FastAPI(
    title="Portfolio API",
    description="Backend API for GitHub-integrated portfolio website",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS - Allow all origins in production or configured origins
cors_origins = settings.cors_origins_list if settings.cors_origins != "*" else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Include routers
app.include_router(projects.router)
app.include_router(github.router)
app.include_router(auth.router)
app.include_router(settings_routes.router)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Portfolio API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=True
    )
