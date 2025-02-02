// src/pages/DashboardPage.jsx
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StockCard from "@/components/dashboard/StockCard";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: ${props => props.$sidebarOpen ? '250px' : '70px'};
  transition: margin-left 0.3s ease;
  padding: 1.25rem;
  max-width: calc(100vw - ${props => props.$sidebarOpen ? '250px' : '70px'});
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
    max-width: 100vw;
  }
`;

const StockGridContainer = styled.div`
  display: grid;
  gap: 1rem;
  padding: 0.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (min-width: 1536px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const UserInfo = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const UserWelcome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background: ${props => props.$isOnline ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.$isOnline ? '#166534' : '#991b1b'};
  font-weight: 500;

  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${props => props.$isOnline ? '#22c55e' : '#ef4444'};
  }
`;

const LoadingSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid #e2e8f0;
  border-radius: 50%;
  border-top: 2px solid white;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const InfoBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const TimeStamp = styled.span`
  color: #64748b;
  font-size: 0.875rem;
  white-space: nowrap;
`;

const RefreshButton = styled.button`
  background: ${props => props.disabled ? '#94a3b8' : '#3b82f6'};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  min-width: 100px;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #2563eb;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #64748b;
  font-size: 0.875rem;
  gap: 0.75rem;
`;

const ErrorContainer = styled.div`
  background: #fee2e2;
  border: 1px solid #fca5a5;
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
  color: #991b1b;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 0.875rem;
`;

const RateLimitError = styled(ErrorContainer)`
  background: #fff7ed;
  border-color: #fdba74;
  color: #c2410c;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
// Continuing from previous part...

const MOCK_STOCKS_DATA = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 185.85,
    priceChange: 2.35,
    percentageChange: 1.28,
    volume: 58972310,
    high: 187.05,
    low: 183.51,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      price: 180 + Math.random() * 10
    })),
    insights: "Strong buy signal based on technical indicators.\nPositive momentum in the past 24 hours."
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    currentPrice: 405.32,
    priceChange: -1.48,
    percentageChange: -0.36,
    volume: 25789430,
    high: 408.15,
    low: 403.89,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      price: 400 + Math.random() * 10
    })),
    insights: "Neutral trading pattern observed.\nSupport level at $400."
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    currentPrice: 142.45,
    priceChange: 1.23,
    percentageChange: 0.87,
    volume: 31456780,
    high: 143.20,
    low: 141.30,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      price: 140 + Math.random() * 5
    })),
    insights: "Bullish trend continuation likely.\nStrong volume support."
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    currentPrice: 168.32,
    priceChange: 3.45,
    percentageChange: 2.09,
    volume: 42567890,
    high: 169.50,
    low: 165.20,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      price: 165 + Math.random() * 8
    })),
    insights: "Breaking out of resistance level.\nIncreased institutional buying."
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    currentPrice: 187.65,
    priceChange: -5.23,
    percentageChange: -2.71,
    volume: 38921450,
    high: 193.45,
    low: 186.30,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      price: 185 + Math.random() * 12
    })),
    insights: "Bearish trend developing.\nWatch support at $185."
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    currentPrice: 576.45,
    priceChange: 12.34,
    percentageChange: 2.19,
    volume: 29345670,
    high: 578.90,
    low: 565.20,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      price: 565 + Math.random() * 15
    })),
    insights: "Strong momentum continuation.\nAI sector leadership position."
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    currentPrice: 394.78,
    priceChange: 8.92,
    percentageChange: 2.31,
    volume: 27834560,
    high: 396.20,
    low: 387.45,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      price: 385 + Math.random() * 12
    })),
    insights: "Breaking all-time highs.\nStrong social media metrics."
  },
  {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    currentPrice: 562.98,
    priceChange: -3.45,
    percentageChange: -0.61,
    volume: 18234567,
    high: 568.30,
    low: 559.80,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      price: 558 + Math.random() * 12
    })),
    insights: "Consolidating after earnings.\nSubscriber growth remains strong."
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    currentPrice: 172.45,
    priceChange: 1.23,
    percentageChange: 0.72,
    volume: 15678234,
    high: 173.20,
    low: 171.15,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      price: 170 + Math.random() * 5
    })),
    insights: "Financial sector leadership.\nStrong dividend outlook."
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    currentPrice: 276.89,
    priceChange: 2.34,
    percentageChange: 0.85,
    volume: 12345678,
    high: 277.50,
    low: 274.20,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      price: 274 + Math.random() * 6
    })),
    insights: "Payment volumes increasing.\nInternational growth strong."
  }
];

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stocksData, setStocksData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [serverStatus, setServerStatus] = useState('online');

  const currentDate = "2025-02-02 05:34:55";
  const currentUser = "Surajgore007";

  const checkServerStatus = useCallback(async () => {
    setServerStatus('online');
    return true;
  }, []);

  const fetchStockData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStocksData(MOCK_STOCKS_DATA);
      setLastUpdated(new Date().toISOString());
      setError(null);
    } catch (err) {
      console.error('Error fetching stocks:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStockData();
    const interval = setInterval(fetchStockData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [fetchStockData]);

  return (
    <DashboardContainer>
      <Sidebar $isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(prev => !prev)} />
      <MainContent $sidebarOpen={sidebarOpen}>
        <Header />
        <UserInfo>
          <UserWelcome>
            <h1>Welcome back, {currentUser}!</h1>
            <StatusBadge $isOnline={serverStatus === 'online'}>
              {serverStatus === 'online' ? 'Server Connected' : 'Server Offline'}
            </StatusBadge>
          </UserWelcome>
          <InfoBar>
            <TimeStamp>Last Updated: {currentDate} UTC</TimeStamp>
            <RefreshButton 
              onClick={fetchStockData} 
              disabled={loading}
              $isLoading={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Refresh</span>
                </>
              )}
            </RefreshButton>
          </InfoBar>
        </UserInfo>

        {loading && !stocksData.length ? (
          <LoadingContainer>
            <LoadingSpinner />
            <span>Loading stock data...</span>
          </LoadingContainer>
        ) : (
          <StockGridContainer>
            {stocksData.map((stock, index) => (
              <StockCard
                key={`${stock.symbol}-${index}`}
                {...stock}
              />
            ))}
          </StockGridContainer>
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPage;