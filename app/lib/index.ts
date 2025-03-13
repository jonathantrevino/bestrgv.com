export function slugify(str: string) {
  return str
    .toLowerCase()                          // Convert to lowercase
    .replace(/\s+/g, '-')                   // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')               // Remove non-alphanumeric characters except hyphens
    .replace(/--+/g, '-')                   // Replace multiple hyphens with a single one
    .replace(/^-+/, '')                     // Trim leading hyphens
    .replace(/-+$/, '');                    // Trim trailing hyphens
}

export function unslugify(str: string): string {
  return str
    .replace(/-/g, ' ')            // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
}


export function underscoreify(str: string) {
  return str
    .toLowerCase()                          // Convert to lowercase
    .replace(/\s+/g, '_')                   // Replace spaces with underscores
    .replace(/[^\w_]+/g, '')                // Remove non-alphanumeric characters except underscores
    .replace(/__+/g, '_')                   // Replace multiple underscores with a single one
    .replace(/^_+/, '')                     // Trim leading underscores
    .replace(/_+$/, '');                    // Trim trailing underscores
}

export function slugToUnderscore(str: string) {
  return str.replace(/-/g, '_'); // Replace all hyphens with underscores
}

