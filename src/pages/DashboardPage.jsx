// src/pages/DashboardPage.jsx
import { useState } from "react";
import styled from "styled-components";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import OverviewCard from "@/components/dashboard/OverviewCard";
import Chart from "@/components/dashboard/Chart";
import KPIDisplay from "@/components/dashboard/KPIDisplay";

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

const UserInfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const UserInfo = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.875rem;
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

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const currentDate = "2025-02-01 17:07:18"; // Current UTC time
  const currentUser = "Surajgore007";

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <DashboardContainer>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <MainContent sidebarOpen={sidebarOpen}>
        <Header />
        <UserInfoSection>
          <UserInfo>
            <strong>Current User:</strong> {currentUser}
          </UserInfo>
          <UserInfo>
            <strong>Last Updated:</strong> {currentDate} UTC
          </UserInfo>
        </UserInfoSection>
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
          <Chart />
          <KPIDisplay />
        </BottomSection>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPage;