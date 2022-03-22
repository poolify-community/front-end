import axios from 'axios';

import { apiUrl, getApiCacheBuster } from 'libs/helpers/getApiInfo';

const CACHE_TIMEOUT_MS = 1 * 30 * 1000; // 30 second(s)
const pendingPLFYCache = {
  cache: undefined,
  lastUpdated: undefined,
};

function getCachedPendingPLFY() {
  return pendingPLFYCache.cache;
}

function maybeUpdateCache() {
  const currentTimestamp = new Date();
  if (
    pendingPLFYCache.lastUpdated &&
    currentTimestamp.getTime() > pendingPLFYCache.lastUpdated.getTime() + CACHE_TIMEOUT_MS
  ) {
    initializePendingPLFYCache();
    // console.trace('price cache updated')
  }
}

const fetchPendingPLFYFromAPI = async () => {
  const cacheBuster = getApiCacheBuster();
  try {
    const response = await axios.get(`${apiUrl}/pending-rewards?_=${cacheBuster}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return {};
  }
};


let pendingPLFYLoadedPromise;
export function whenPendingPLFYLoaded() {
  return pendingPLFYLoadedPromise;
}

export function initializePendingPLFYCache() {
  const currentTimestamp = new Date();
  pendingPLFYCache.lastUpdated = currentTimestamp;
  
  pendingPLFYLoadedPromise = axios.get(`${apiUrl}/pending-rewards?_=${cacheBuster}`).then(res => {
    pendingPLFYCache.cache = res;
  });
}

export const fetchPendingPLFY = () => {

  maybeUpdateCache();

  return getCachedPendingPLFY() || {};
};
