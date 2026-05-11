import { useState, useEffect } from 'react';
import githubService from '../services/github';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Get GitHub username from environment or config
        const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'callmemehdy';
        
        // Fetch all repositories
        const repos = await githubService.getRepos(githubUsername);
        
        // Filter to only show public repos, sorted by stars
        const sortedRepos = repos
          .filter(repo => !repo.private)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        
        setProjects(sortedRepos);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError(err.message);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  if (loading) {
    return (
      <section id="projects" className="py-20 border-b-4 border-vintage-ink dark:border-dark-border transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center py-20">
            <div className="terminal-theme p-8">
              <p className="font-retro text-2xl animate-pulse">
                FETCHING FROM GITHUB...
              </p>
              <p className="font-retro text-sm mt-2">
                ████████████░░░░░░░░ 60%
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 border-b-4 border-vintage-ink dark:border-dark-border transition-colors">
        <div className="container mx-auto px-6">
          <div className="vintage-card text-center py-12 border-2 border-red-500">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="font-mono text-xl text-red-600">
              Error loading projects
            </p>
            <p className="font-mono text-sm text-vintage-brown dark:text-dark-textSecondary mt-2">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="projects" className="py-20 border-b-4 border-vintage-ink dark:border-dark-border transition-colors">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-typewriter font-bold text-vintage-ink dark:text-dark-text mb-4">
              [ GITHUB PROJECTS ]
            </h2>
            <div className="w-32 h-1 bg-vintage-ink mx-auto mb-6"></div>
            <p className="font-mono text-vintage-brown max-w-2xl mx-auto">
              Public repositories from GitHub • Sorted by stars • 
              Click [README] for detailed documentation
            </p>
          </div>
          
          {projects.length === 0 ? (
            <div className="vintage-card text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <p className="font-mono text-xl text-vintage-brown">
                No public repositories found.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
