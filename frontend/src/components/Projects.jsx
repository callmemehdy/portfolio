import { useState, useEffect } from 'react';
import { projectService, githubService } from '../services/api';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [reposData, setReposData] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsList = await projectService.getPublic();
        setProjects(projectsList);
        
        // Fetch detailed repo data for each project
        const allRepos = await githubService.getRepos();
        const reposMap = {};
        
        allRepos.forEach(repo => {
          reposMap[repo.name] = repo;
        });
        
        setReposData(reposMap);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
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
                LOADING PROJECTS...
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
  
  return (
    <section id="projects" className="py-20 border-b-4 border-vintage-ink dark:border-dark-border transition-colors">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-typewriter font-bold text-vintage-ink dark:text-dark-text mb-4">
              [ SELECTED PROJECTS ]
            </h2>
            <div className="w-32 h-1 bg-vintage-ink mx-auto mb-6"></div>
            <p className="font-mono text-vintage-brown max-w-2xl mx-auto">
              A curated collection of my work • Sorted by priority and recency • 
              Click [README] for detailed documentation
            </p>
          </div>
          
          {projects.length === 0 ? (
            <div className="vintage-card text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <p className="font-mono text-xl text-vintage-brown">
                No projects selected yet.
              </p>
              <p className="font-mono text-sm text-vintage-brown mt-2">
                Use the admin panel to add projects to your portfolio.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  repoData={reposData[project.repo_name]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
