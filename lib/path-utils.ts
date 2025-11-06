/**
 * Valid path names from schemas.ts PATH_POINTS
 */
export const VALID_PATHS = [
  'ye-to-kar-looge-tum',
  'ye-nahi-kar-paaoge-tum',
  'apply',
  'angry-hr',
  'stack',
  'policy',
  'swag-store',
  'internship',
  'grievance'
] as const;

export type ValidPath = typeof VALID_PATHS[number];

/**
 * Extract valid path name from raw path parameter
 * Handles cases like "apply-1", "angry-hr-9", or direct path names
 */
export function extractValidPath(rawPath: string | null): string {
  if (!rawPath) return 'unknown';
  
  // Check if the path directly matches a valid path
  if (VALID_PATHS.includes(rawPath as ValidPath)) {
    return rawPath;
  }
  
  // Try to extract the base path name from paths like "apply-1", "angry-hr-9"
  // by removing the trailing number
  const basePath = rawPath.split('-').slice(0, -1).join('-');
  if (VALID_PATHS.includes(basePath as ValidPath)) {
    return basePath;
  }
  
  // Check if any valid path is contained in the raw path
  const matchedPath = VALID_PATHS.find(validPath => rawPath.includes(validPath));
  return matchedPath || 'unknown';
}

/**
 * Check if a path is valid
 */
export function isValidPath(path: string): boolean {
  return VALID_PATHS.includes(path as ValidPath);
}
