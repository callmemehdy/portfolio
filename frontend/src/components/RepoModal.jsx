import { useEffect, useState } from 'react';
import { githubService } from '../services/api';
import { formatDate } from '../utils/helpers';

export default function RepoModal({ repo, project, onClose }) {
  const [repoDetail, setRepoDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await githubService.getRepoDetail(project.repo_owner, project.repo_name);
        setRepoDetail(data);
      } catch (error) {
        console.error('Failed to fetch repo details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetail();
  }, [project]);
  
  return (
    <div className="fixed inset-0 bg-vintage-ink dark:bg-black bg-opacity-50 dark:bg-opacity-90 flex items-center justify-center p-6 z-50 fade-in transition-colors">
      <div className="bg-white dark:bg-dark-card border-4 border-vintage-ink dark:border-dark-border shadow-vintage max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col transition-colors">
        <div className="border-b-4 border-vintage-ink dark:border-dark-border p-6 bg-vintage-tan dark:bg-dark-surface transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-typewriter font-bold text-vintage-ink dark:text-dark-text transition-colors">
                {project.repo_name}
              </h2>
              <p className="text-sm font-mono text-vintage-brown dark:text-dark-textSecondary mt-1 transition-colors">
                @{project.repo_owner}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-3xl font-bold text-vintage-ink dark:text-dark-text hover:text-vintage-accent dark:hover:text-dark-accent transition-colors"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto p-6 flex-1 bg-vintage-cream dark:bg-dark-bg transition-colors">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="font-retro text-2xl text-vintage-brown dark:text-dark-textSecondary animate-pulse transition-colors">
                LOADING...
              </div>
            </div>
          ) : (
            <>
              {repoDetail?.readme_html ? (
                <div 
                  className="prose prose-vintage max-w-none font-mono text-vintage-darkBrown dark:text-dark-textSecondary transition-colors"
                  dangerouslySetInnerHTML={{ __html: repoDetail.readme_html }}
                />
              ) : (
                <div className="text-center py-12 font-mono text-vintage-brown dark:text-dark-textSecondary transition-colors">
                  <p className="text-xl">No README available</p>
                </div>
              )}
              
              {repoDetail?.latest_commits && repoDetail.latest_commits.length > 0 && (
                <div className="mt-8 border-t-4 border-vintage-ink dark:border-dark-border pt-6 transition-colors">
                  <h3 className="text-xl font-typewriter font-bold text-vintage-ink dark:text-dark-text mb-4 transition-colors">
                    Recent Commits
                  </h3>
                  <div className="space-y-3">
                    {repoDetail.latest_commits.map((commit, idx) => (
                      <div key={idx} className="border-2 border-vintage-brown dark:border-dark-border p-3 bg-vintage-cream dark:bg-dark-surface transition-colors">
                        <div className="flex items-start gap-3">
                          <code className="text-sm font-bold text-vintage-accent dark:text-dark-accent transition-colors">
                            {commit.sha}
                          </code>
                          <div className="flex-1">
                            <p className="font-mono text-sm text-vintage-ink dark:text-dark-text transition-colors">
                              {commit.message}
                            </p>
                            <p className="font-mono text-xs text-vintage-brown dark:text-dark-textSecondary mt-1 transition-colors">
                              {commit.author} • {formatDate(commit.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="border-t-4 border-vintage-ink dark:border-dark-border p-4 bg-vintage-tan dark:bg-dark-surface flex justify-end gap-3 transition-colors">
          <a
            href={`https://github.com/${project.repo_owner}/${project.repo_name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-vintage-ink dark:bg-dark-accent text-vintage-cream dark:text-dark-bg border-2 border-vintage-ink dark:border-dark-accent font-bold uppercase text-sm tracking-wider hover:bg-vintage-darkBrown dark:hover:bg-opacity-80 transition-all"
          >
            View on GitHub
          </a>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-transparent text-vintage-ink dark:text-dark-text border-2 border-vintage-ink dark:border-dark-border font-bold uppercase text-sm tracking-wider hover:bg-vintage-tan dark:hover:bg-dark-surface transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
