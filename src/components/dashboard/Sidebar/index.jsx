// src/component/dashboard/Sidebar/index.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  Dashboard,
  ShoppingCart,
  People,
  BarChart,
  Mail,
  ChatBubble,
  Settings,
  Menu,
  ChevronLeft,
} from '@mui/icons-material';

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${props => props.isOpen ? '250px' : '70px'};
  background: ${props => props.theme.colors.white};
  border-right: 1px solid rgba(0,0,0,0.1);
  transition: width ${props => props.theme.transitions};
  z-index: 1000;
  overflow-x: hidden;
`;

const LogoSection = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,0.1);
`;

const Logo = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${props => props.theme.transitions};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const NavSection = styled.nav`
  padding: 1rem;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.secondary};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius};
  transition: all ${props => props.theme.transitions};
  margin-bottom: 0.5rem;
  background: ${props => props.active ? `${props.theme.colors.primary}10` : 'transparent'};

  &:hover {
    background: ${props => `${props.theme.colors.primary}10`};
  }

  svg {
    margin-right: ${props => props.isOpen ? '1rem' : '0'};
  }

  span {
    display: ${props => props.isOpen ? 'block' : 'none'};
    white-space: nowrap;
  }
`;

const menuItems = [
  { icon: <Dashboard />, label: 'Dashboard', path: '/dashboard' },
  { icon: <ShoppingCart />, label: 'Products', path: '/dashboard/products' },
  { icon: <People />, label: 'Customers', path: '/dashboard/customers' },
  { icon: <BarChart />, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: <Mail />, label: 'Messages', path: '/dashboard/messages' },
  { icon: <ChatBubble />, label: 'Support', path: '/dashboard/support' },
  { icon: <Settings />, label: 'Settings', path: '/dashboard/settings' },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <SidebarContainer isOpen={isOpen}>
      <LogoSection>
        {isOpen && <Logo to="/dashboard">Finalysis</Logo>}
        <ToggleButton onClick={toggleSidebar}>
          {isOpen ? <ChevronLeft /> : <Menu />}
        </ToggleButton>
      </LogoSection>
      <NavSection>
        {menuItems.map((item, index) => (
          <NavItem
            key={index}
            to={item.path}
            active={location.pathname === item.path ? 1 : 0}
            isOpen={isOpen}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavItem>
        ))}
      </NavSection>
    </SidebarContainer>
  );
};

export default Sidebar;