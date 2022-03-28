export const apiUrl = process.env.REACT_APP_API_URL || 'https://api.poolify.finance'; // 'http://localhost:3001'

// Time-based cache buster
export const getApiCacheBuster = () => {
  return Math.trunc(Date.now() / (1000 * 60));
};