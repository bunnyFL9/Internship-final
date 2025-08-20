// API Configuration
const API_CONFIG = {
  // Your actual Replit backend URL
  PRODUCTION_API: 'https://a038521f-5537-4186-bf1e-ed958abeb137-00-14yfl7kqa7q5s.pike.replit.dev',
  
  // Local development API
  LOCAL_API: 'http://localhost:3000',
  
  // Detect if we're running locally or on GitHub Pages
  get BASE_URL() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return this.LOCAL_API;
    }
    return this.PRODUCTION_API;
  },
  
  // API endpoints
  ENDPOINTS: {
    telkom: {
      projects: '/api/telkom/projects',
      members: '/api/telkom/members',
      stats: '/api/telkom/stats'
    },
    binus: {
      projects: '/api/binus/projects',
      members: '/api/binus/members',
      stats: '/api/binus/stats'
    },
    alumni: '/api/alumni'
  }
};

// Helper function to build full API URLs
function getApiUrl(endpoint) {
  return API_CONFIG.BASE_URL + endpoint;
}

// Helper function for making API requests
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
