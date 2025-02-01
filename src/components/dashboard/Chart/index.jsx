// src/components/dashboard/Chart/index.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const ChartWrapper = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 1.5rem;
  height: 300px;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.secondary};
`;

const data = [
  { name: 'Jan', visits: 4000, revenue: 2400, sales: 2400 },
  { name: 'Feb', visits: 3000, revenue: 1398, sales: 2210 },
  { name: 'Mar', visits: 2000, revenue: 9800, sales: 2290 },
  { name: 'Apr', visits: 2780, revenue: 3908, sales: 2000 },
  { name: 'May', visits: 1890, revenue: 4800, sales: 2181 },
  { name: 'Jun', visits: 2390, revenue: 3800, sales: 2500 },
];

const Chart = () => {
  return (
    <ChartWrapper>
      <Title>Performance Overview</Title>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="visits" stroke="#6B46C1" />
          <Line type="monotone" dataKey="revenue" stroke="#48BB78" />
          <Line type="monotone" dataKey="sales" stroke="#4299E1" />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default Chart;