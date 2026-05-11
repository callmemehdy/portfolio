import { useEffect, useState } from 'react';
import { formatDate } from '../utils/helpers';
import ReactMarkdown from 'react-markdown';

export default function RepoModal({ project, readme, onClose }) {
  const [loading, setLoading] = useState(false);
  
  return (
    <div className="fixed inset-0 bg-vintage-ink dark:bg-black bg-opacity-50 dark:bg-opacity-90 flex items-center justify-center p-6 z-50 fade-in transition-colors">
      <div className="bg-white dark:bg-dark-card border-4 border-vintage-ink dark:border-dark-border shadow-vintage max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col transition-colors">
        <div className="border-b-4 border-vintage-ink dark:border-dark-border p-6 bg-vintage-tan dark:bg-dark-surface transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-typewriter font-bold text-vintage-ink dark:text-dark-text transition-colors">
                {project.name}
              </h2>
              <p className="text-sm font-mono text-vintage-brown dark:text-dark-textSecondary mt-1 transition-colors">
                @{project.owner.login}
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
          {loading || !readme ? (
            <div className="flex items-center justify-center py-12">
              {loading ? (
                <div className="font-retro text-2xl text-vintage-brown dark:text-dark-textSecondary animate-pulse transition-colors">
                  LOADING...
                </div>
              ) : (
                <div className="text-center font-mono text-vintage-brown dark:text-dark-textSecondary transition-colors">
                  <p className="text-xl">No README available</p>
                </div>
              )}
            </div>
          ) : (
            <div className="prose prose-vintage max-w-none text-vintage-darkBrown dark:text-dark-textSecondary transition-colors prose-headings:font-typewriter prose-headings:text-vintage-ink dark:prose-headings:text-dark-text">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl font-typewriter font-bold mb-4 mt-6 text-vintage-ink dark:text-dark-text" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-typewriter font-bold mb-3 mt-5 text-vintage-ink dark:text-dark-text" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-typewriter font-bold mb-2 mt-4 text-vintage-ink dark:text-dark-text" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 font-mono leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                  code: ({node, inline, ...props}) => inline ? 
                    <code className="bg-vintage-tan dark:bg-dark-surface px-2 py-1 rounded font-mono text-sm" {...props} /> :
                    <code className="block bg-vintage-tan dark:bg-dark-surface p-4 rounded font-mono text-sm overflow-x-auto mb-4" {...props} />,
                  a: ({node, ...props}) => <a className="text-vintage-accent dark:text-dark-accent underline hover:opacity-70" target="_blank" rel="noopener noreferrer" {...props} />,
                }}
              >
                {readme}
              </ReactMarkdown>
            </div>
          )}
        </div>
        
        <div className="border-t-4 border-vintage-ink dark:border-dark-border p-4 bg-vintage-tan dark:bg-dark-surface flex justify-end gap-3 transition-colors">
          <a
            href={project.html_url}
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
