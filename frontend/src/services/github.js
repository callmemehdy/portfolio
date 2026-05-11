const GITHUB_API = 'https://api.github.com';

export const githubService = {
  /**
   * Fetch user's repositories from GitHub
   * @param {string} username - GitHub username
   * @param {Object} options - Fetch options
   * @returns {Promise<Array>} Array of repositories
   */
  getRepos: async (username, options = {}) => {
    const { 
      perPage = 100, 
      sort = 'updated',
      type = 'owner'
    } = options;

    try {
      const response = await fetch(
        `${GITHUB_API}/users/${username}/repos?per_page=${perPage}&sort=${sort}&type=${type}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch repos:', error);
      throw error;
    }
  },

  /**
   * Fetch repository details
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   * @returns {Promise<Object>} Repository details
   */
  getRepoDetail: async (owner, repo) => {
    try {
      const response = await fetch(
        `${GITHUB_API}/repos/${owner}/${repo}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch repo details:', error);
      throw error;
    }
  },

  /**
   * Fetch repository README content
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   * @returns {Promise<string>} README content (markdown)
   */
  getRepoReadme: async (owner, repo) => {
    try {
      const response = await fetch(
        `${GITHUB_API}/repos/${owner}/${repo}/readme`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3.raw',
          }
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`GitHub API Error: ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      console.error('Failed to fetch readme:', error);
      return null;
    }
  },

  /**
   * Get user information
   * @param {string} username - GitHub username
   * @returns {Promise<Object>} User profile data
   */
  getUser: async (username) => {
    try {
      const response = await fetch(
        `${GITHUB_API}/users/${username}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw error;
    }
  },

  /**
   * Check GitHub API rate limit
   * @returns {Promise<Object>} Rate limit information
   */
  getRateLimit: async () => {
    try {
      const response = await fetch(
        `${GITHUB_API}/rate_limit`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch rate limit:', error);
      return null;
    }
  }
};

export default githubService;
