/**
 * Newsletter Service
 * 
 * Handles all newsletter-related API calls to Mailchimp.
 * Uses JSONP for cross-origin requests since Mailchimp doesn't support CORS.
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

const CONFIG = {
  // Mailchimp API endpoint (JSONP format)
  MAILCHIMP_URL: 'https://app.us18.list-manage.com/subscribe/post-json',
  
  // Mailchimp account identifiers
  USER_ID: 'e26fca6c51fd6f93883f856f8',
  AUDIENCE_ID: '721d9102bd',
  
  // Request settings
  TIMEOUT_MS: 10000,
};

// Build the full Mailchimp URL
const getMailchimpUrl = () => 
  `${CONFIG.MAILCHIMP_URL}?u=${CONFIG.USER_ID}&id=${CONFIG.AUDIENCE_ID}`;

// =============================================================================
// STORAGE KEYS
// =============================================================================

export const STORAGE_KEYS = {
  SUBSCRIBED: 'newsletter_subscribed',
  DISMISSED: 'newsletter_dismissed_session',
};

// =============================================================================
// STORAGE HELPERS
// =============================================================================

/**
 * Check if the user has already subscribed (permanent)
 * @returns {boolean}
 */
export const isUserSubscribed = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.SUBSCRIBED) === 'true';
  } catch {
    return false;
  }
};

/**
 * Check if the user dismissed the modal this session (temporary)
 * @returns {boolean}
 */
export const isUserDismissedThisSession = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.DISMISSED) === 'true';
  } catch {
    return false;
  }
};

/**
 * Determine if the newsletter modal should auto-show
 * @returns {boolean}
 */
export const shouldAutoShowModal = () => {
  return !isUserSubscribed() && !isUserDismissedThisSession();
};

/**
 * Mark the user as subscribed (permanent)
 */
export const markAsSubscribed = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBED, 'true');
    // Clear the dismissed flag if it exists
    sessionStorage.removeItem(STORAGE_KEYS.DISMISSED);
  } catch (error) {
    console.warn('Failed to save subscription status:', error);
  }
};

/**
 * Mark the modal as dismissed for this session
 */
export const markAsDismissed = () => {
  try {
    sessionStorage.setItem(STORAGE_KEYS.DISMISSED, 'true');
  } catch (error) {
    console.warn('Failed to save dismissed status:', error);
  }
};

// =============================================================================
// JSONP HELPER
// =============================================================================

/**
 * Execute a JSONP request
 * This is needed because Mailchimp doesn't support CORS
 * 
 * @param {string} url - The URL to request
 * @param {string} callbackParam - The query parameter name for the callback
 * @returns {Promise<object>} - The response data
 */
const jsonpRequest = (url, callbackParam = 'c') => {
  return new Promise((resolve, reject) => {
    // Generate unique callback name to avoid collisions
    const callbackName = `mailchimp_cb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Build full URL with callback
    const fullUrl = `${url}&${callbackParam}=${callbackName}`;
    
    // Create script element
    const script = document.createElement('script');
    script.src = fullUrl;
    script.async = true;
    
    // Cleanup function
    const cleanup = () => {
      if (window[callbackName]) {
        delete window[callbackName];
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
    
    // Set up timeout
    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error('Request timeout - please check your connection'));
    }, CONFIG.TIMEOUT_MS);
    
    // Define callback function
    window[callbackName] = (response) => {
      clearTimeout(timeoutId);
      cleanup();
      resolve(response);
    };
    
    // Handle script load errors
    script.onerror = () => {
      clearTimeout(timeoutId);
      cleanup();
      reject(new Error('Network error - please check your connection'));
    };
    
    // Execute request
    document.body.appendChild(script);
  });
};

// =============================================================================
// API FUNCTIONS
// =============================================================================

/**
 * Subscribe an email to the Mailchimp newsletter
 * 
 * @param {Object} data - Subscriber data
 * @param {string} data.email - Email address (required)
 * @param {string} [data.firstName] - First name (optional)
 * @returns {Promise<Object>} - Mailchimp response
 * @throws {Error} - If subscription fails
 */
export const subscribeToNewsletter = async ({ email, firstName = '' }) => {
  // Validate email
  if (!email || !email.includes('@')) {
    throw new Error('INVALID_EMAIL');
  }
  
  // Build request URL with parameters
  const baseUrl = getMailchimpUrl();
  const params = new URLSearchParams({
    EMAIL: email.trim(),
    FNAME: firstName.trim(),
  });
  
  const url = `${baseUrl}&${params.toString()}`;
  
  // Make JSONP request
  const response = await jsonpRequest(url);
  
  // Check response
  if (response.result === 'success') {
    markAsSubscribed();
    return response;
  }
  
  // Handle error response
  const errorMsg = response.msg || 'Subscription failed';
  
  // Parse common Mailchimp error messages
  if (errorMsg.includes('already subscribed')) {
    throw new Error('ALREADY_SUBSCRIBED');
  }
  if (errorMsg.includes('invalid') || errorMsg.includes('fake') || errorMsg.includes('looks fake')) {
    throw new Error('INVALID_EMAIL');
  }
  if (errorMsg.includes('too many')) {
    throw new Error('TOO_MANY_REQUESTS');
  }
  
  throw new Error(errorMsg);
};

// =============================================================================
// ERROR MESSAGES (Hebrew)
// =============================================================================

export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'אנא הזינו כתובת אימייל תקינה',
  ALREADY_SUBSCRIBED: 'כתובת האימייל הזו כבר רשומה לעדכונים',
  TOO_MANY_REQUESTS: 'יותר מדי בקשות. אנא נסו שוב מאוחר יותר.',
  NETWORK_ERROR: 'שגיאת תקשורת. אנא בדקו את החיבור לאינטרנט.',
  GENERIC_ERROR: 'שגיאה בהרשמה. אנא נסו שוב.',
};

/**
 * Get Hebrew error message for error code
 * @param {string} errorMessage - Error message or code
 * @returns {string} - Hebrew error message
 */
export const getErrorMessage = (errorMessage) => {
  if (ERROR_MESSAGES[errorMessage]) {
    return ERROR_MESSAGES[errorMessage];
  }
  
  // Check for partial matches
  const lowerMsg = errorMessage.toLowerCase();
  if (lowerMsg.includes('network') || lowerMsg.includes('timeout')) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  return ERROR_MESSAGES.GENERIC_ERROR;
};

