// src/components/dashboard/StockCard/index.jsx
import { useState } from 'react';
import styled from "styled-components";
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

const StockCardContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const StockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const StockLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.$bgColor || '#f8fafc'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.125rem;
  color: #1e293b;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const StockInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const StockSymbol = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StockName = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PriceInfo = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  line-height: 1;
`;

const PriceChange = styled.div`
  color: ${props => props.$isPositive ? '#10b981' : '#ef4444'};
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: ${props => props.$isPositive ? '#dcfce7' : '#fee2e2'};
  border-radius: 6px;
`;

const ChartContainer = styled.div`
  height: 120px;
  margin: 0.5rem -1.25rem;
  padding: 0.5rem 0;
  position: relative;
  
  .chart-error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #dc2626;
    font-size: 0.75rem;
    text-align: center;
    background: #fee2e2;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    white-space: nowrap;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 1rem;
`;

const StatCard = styled.div`
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f1f5f9;
  }
`;

const StatLabel = styled.div`
  color: #64748b;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;

const StatValue = styled.div`
  color: #1e293b;
  font-size: 0.875rem;
  font-weight: 500;
`;

const InsightsContainer = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  font-size: 0.875rem;
  color: #475569;
  flex: 1;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
  }

  p {
    margin: 0.25rem 0;
    line-height: 1.5;
  }
`;

const CustomTooltip = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 0.75rem;
`;

const TooltipContent = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltip>
        <div style={{ fontWeight: 600, color: '#1e293b' }}>
          ${payload[0].value.toFixed(2)}
        </div>
        <div style={{ fontSize: '0.625rem', color: '#64748b', marginTop: '0.25rem' }}>
          {new Date(payload[0].payload.time).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      </CustomTooltip>
    );
  }
  return null;
};

const formatNumber = (num) => {
  const lookup = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' }
  ];

  const item = lookup.find(item => num >= item.value);
  return item ? (num / item.value).toFixed(1) + item.symbol : num.toString();
};

const getStockColor = (symbol) => {
  const colors = [
    '#818cf8', '#f472b6', '#34d399', '#fbbf24', '#60a5fa',
    '#a78bfa', '#fb923c', '#4ade80', '#f87171', '#22d3ee'
  ];
  
  const hash = symbol.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

const StockCard = ({
  symbol,
  name,
  currentPrice,
  priceChange,
  percentageChange,
  volume,
  high,
  low,
  chartData,
  insights
}) => {
  const [chartError, setChartError] = useState(null);
  const isPositive = priceChange >= 0;
  const bgColor = getStockColor(symbol);

  return (
    <StockCardContainer>
      <StockHeader>
        <StockLogo $bgColor={`${bgColor}15`}>
          <span style={{ color: bgColor }}>{symbol.charAt(0)}</span>
        </StockLogo>
        <StockInfo>
          <StockSymbol>{symbol}</StockSymbol>
          <StockName>{name}</StockName>
        </StockInfo>
      </StockHeader>
      
      <PriceInfo>
        <CurrentPrice>${currentPrice.toFixed(2)}</CurrentPrice>
        <PriceChange $isPositive={isPositive}>
          {isPositive ? '↑' : '↓'} ${Math.abs(priceChange).toFixed(2)} ({Math.abs(percentageChange).toFixed(2)}%)
        </PriceChange>
      </PriceInfo>

      <ChartContainer>
        {chartError ? (
          <div className="chart-error">
            {chartError.includes('Rate limit') 
              ? 'Rate limit reached. Please try again later.'
              : 'Unable to load chart data.'}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <YAxis domain={['dataMin', 'dataMax']} hide />
              <Tooltip content={<TooltipContent />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? '#10b981' : '#ef4444'}
                strokeWidth={2}
                dot={false}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartContainer>

      <StatsGrid>
        <StatCard>
          <StatLabel>Volume</StatLabel>
          <StatValue>{formatNumber(volume)}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>24h High</StatLabel>
          <StatValue>${high.toFixed(2)}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>24h Low</StatLabel>
          <StatValue>${low.toFixed(2)}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Change</StatLabel>
          <StatValue style={{ color: isPositive ? '#10b981' : '#ef4444' }}>
            {isPositive ? '+' : ''}{percentageChange.toFixed(2)}%
          </StatValue>
        </StatCard>
      </StatsGrid>

      {insights && (
        <InsightsContainer>
          {insights.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </InsightsContainer>
      )}
    </StockCardContainer>
  );
};

export default StockCard;