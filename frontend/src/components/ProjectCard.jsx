import { useState } from 'react';
import { Star, GitFork, Calendar, ExternalLink, FileText } from 'lucide-react';
import { getLanguageColor, formatDate } from '../utils/helpers';
import RepoModal from './RepoModal';

export default function ProjectCard({ project, repoData }) {
  const [showModal, setShowModal] = useState(false);
  
  const description = project.custom_description || repoData?.description || 'No description available';
  const language = repoData?.language || 'Unknown';
  const stars = repoData?.stargazers_count || 0;
  const forks = repoData?.forks_count || 0;
  const updated = repoData?.updated_at ? formatDate(repoData.updated_at) : 'Unknown';
  
  return (
    <>
      <div className="vintage-card punch-card fade-in">
        <div className="pl-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-typewriter font-bold text-vintage-ink dark:text-dark-text mb-2">
                {project.repo_name}
              </h3>
              <p className="text-sm font-mono text-vintage-brown dark:text-dark-textSecondary mb-1">
                @{project.repo_owner}
              </p>
            </div>
            
            <div 
              className="w-4 h-4 rounded-full border-4 border-vintage-ink dark:border-dark-border"
              style={{ backgroundColor: getLanguageColor(language) }}
              title={language}
            ></div>
          </div>
          
          <p className="text-vintage-darkBrown dark:text-dark-textSecondary font-mono leading-relaxed mb-4">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {repoData?.topics?.slice(0, 5).map((topic, idx) => (
              <span key={idx} className="vintage-tag text-xs">
                {topic}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-6 text-sm font-mono text-vintage-brown dark:text-dark-textSecondary mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>{stars}</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="w-4 h-4" />
              <span>{forks}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{updated}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <a
              href={`https://github.com/${project.repo_owner}/${project.repo_name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-vintage-ink dark:bg-dark-accent text-vintage-cream dark:text-dark-bg border-2 border-vintage-ink dark:border-dark-accent font-bold uppercase text-xs tracking-wider hover:bg-vintage-darkBrown dark:hover:bg-opacity-80 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              GitHub
            </a>
            
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-transparent text-vintage-ink dark:text-dark-text border-2 border-vintage-ink dark:border-dark-border font-bold uppercase text-xs tracking-wider hover:bg-vintage-tan dark:hover:bg-dark-surface transition-all"
            >
              <FileText className="w-4 h-4" />
              README
            </button>
          </div>
        </div>
      </div>
      
      {showModal && (
        <RepoModal 
          project={project}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
