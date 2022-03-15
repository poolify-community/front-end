export const apiUrl = process.env.REACT_APP_API_URL || 'http://api.poolify.finance';

// Time-based cache buster
export const getApiCacheBuster = () => {
  return Math.trunc(Date.now() / (1000 * 60));
};