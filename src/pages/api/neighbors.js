export default async function handler(req, res) {
  try {
    const response = await fetch('https://adventure-time.hackclub.dev/api/getNeighborsSecurely');
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching neighbors data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
} 