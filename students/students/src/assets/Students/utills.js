const API_BASE_URL = 'http://localhost:8000/api/manage_data/';
const API_MEDIA_URL = 'http://localhost:8000/media/';

const companyName = 'Karni Corporation';

export { API_MEDIA_URL, companyName };

/**
 * Handles the response from an HTTP request.
 * If the response is not okay, it throws an error with the error message from the server.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response.
 */
export async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }
  return response.json();
}

/**
 * Makes a GET request to an API endpoint with optional query parameters.
 * @param {string} endpoint - The API endpoint.
 * @param {Object} queryParams - Optional query parameters.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response.
 */
export async function getFromAPI(endpoint, queryParams = {}) {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      //credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
}

/**
 * Makes a POST request to an API endpoint.
 * @param {string} endpoint - The API endpoint.
 * @param {Object} data - The data to be sent in the request body.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response.
 */
export async function postToAPI(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      //credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
}

/**
 * Makes a PUT request to an API endpoint for updating data.
 * @param {string} endpoint - The API endpoint.
 * @param {Object} data - The data to be sent in the request body for updating.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response.
 */
export async function putToAPI(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      //credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
}

/**
 * Makes a DELETE request to an API endpoint.
 * @param {string} endpoint - The API endpoint.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response.
 */
export async function deleteFromAPI(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      //credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
}

// utils.js

// Define a constant for the default interval time (in milliseconds)
export const DEFAULT_INTERVAL_TIME = 1500000;

/**
 * Sets up an interval to auto-refresh data.
 * @param {function} callback - The function to call at each interval.
 * @param {number} intervalTime - The time (in milliseconds) between each refresh.
 * @returns {number} - The interval ID to allow clearing the interval.
 */
export const setAutoReload = (callback, intervalTime = DEFAULT_INTERVAL_TIME) => {
  const intervalId = setInterval(() => {
    callback();
  }, intervalTime);

  return intervalId;
};

/**
 * Clears the auto-refresh interval.
 * @param {number} intervalId - The ID of the interval to clear.
 */
export const clearAutoReload = (intervalId) => {
  clearInterval(intervalId);
};
