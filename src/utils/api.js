// Fetch neighbors data from the API through our proxy endpoint
export const fetchNeighbors = async () => {
  try {
    // Using our own API route instead of directly calling the external API
    const response = await fetch('/api/neighbors');
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.neighbors || [];
  } catch (error) {
    console.error('Error fetching neighbors data:', error);
    return [];
  }
}; 