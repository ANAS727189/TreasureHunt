/**
 * Utility functions for WinnerPage components
 */

/**
 * Extract the hash from the current URL path
 * The hash is the unique identifier in the URL that corresponds to a specific path
 * Example: /stack/ABC123XYZ -> returns "ABC123XYZ"
 */
export function getHashFromUrl(): string {
  if (typeof window !== 'undefined') {
    const urlPath = window.location.pathname;
    const segments = urlPath.split('/');
    // The hash is the last segment of the path (before query params)
    const lastSegment = segments[segments.length - 1];
    return lastSegment || '';
  }
  return '';
}

/**
 * Submit winner data to the API with hash validation
 */
export async function submitWinner(name: string, path: string): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const hash = getHashFromUrl();
    
    const res = await fetch('/api/submit-winner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: name.trim(),
        path: path,
        hash: hash // Include hash for validation
      }),
    });

    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        message: `Welcome to the club, ${name}!`,
        data
      };
    } else {
      return {
        success: false,
        message: data.error || 'Submission failed',
        data
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
}
