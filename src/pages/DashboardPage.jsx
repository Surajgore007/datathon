// src/pages/DashboardPage.jsx
import { useState } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import OverviewCard from "@/components/dashboard/OverviewCard";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: ${props => props.sidebarOpen ? '250px' : '70px'};
  transition: margin-left ${props => props.theme.transitions};
  padding: 1rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  padding: 0 1rem;
`;

const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 1.5rem;
  margin-top: 2rem;
  padding: 0 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  height: 400px;
`;

const TextContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const UserInfo = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const dashboardData = [
  {
    title: 'Total Visits',
    value: '15,640',
    trend: '+12.5%',
    isPositive: true
  },
  {
    title: 'Total Revenue',
    value: '$23,580',
    trend: '+8.2%',
    isPositive: true
  },
  {
    title: 'Total Sales',
    value: '1,205',
    trend: '-3.8%',
    isPositive: false
  },
  {
    title: 'Average Order',
    value: '$86.4',
    trend: '+4.2%',
    isPositive: true
  }
];

const chartData = [
  { name: 'Jan', visits: 4000, revenue: 2400, sales: 2400 },
  { name: 'Feb', visits: 3000, revenue: 1398, sales: 2210 },
  { name: 'Mar', visits: 2000, revenue: 9800, sales: 2290 },
  { name: 'Apr', visits: 2780, revenue: 3908, sales: 2000 },
  { name: 'May', visits: 1890, revenue: 4800, sales: 2181 },
  { name: 'Jun', visits: 2390, revenue: 3800, sales: 2500 },
];

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const currentDate = "2025-02-01 18:34:53";
  const currentUser = "Surajgore007";

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <DashboardContainer>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <MainContent sidebarOpen={sidebarOpen}>
        <Header />
        <UserInfo>
          <div>Welcome back, {currentUser}!</div>
          <div>Last Updated: {currentDate} UTC</div>
        </UserInfo>
        <GridContainer>
          {dashboardData.map((item, index) => (
            <OverviewCard
              key={index}
              title={item.title}
              value={item.value}
              trend={item.trend}
              isPositive={item.isPositive}
            />
          ))}
        </GridContainer>
        <BottomSection>
          <ChartContainer>
            <h3>Performance Overview</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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
          </ChartContainer>
          <TextContainer>
            <h2>Key Insights</h2>
            <br></br>
            <p>Total Revenue is up by 8.2% compared to last month</p>
            <p>Customer visits have increased by 12.5%</p>
            <p>Average order value remains stable at $86.4</p>
          </TextContainer>
        </BottomSection>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPage;