const API_BASE_URL = 'http://localhost:5000/api';

export const fetchStocksData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stocks`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stocks data:', error);
    throw error;
  }
};