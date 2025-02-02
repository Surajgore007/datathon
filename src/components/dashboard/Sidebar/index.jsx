// src/components/dashboard/Sidebar/index.jsx
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${props => props.$isOpen ? '250px' : '70px'};
  background: white;
  border-right: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  z-index: 50;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: ${props => props.$isOpen ? 'space-between' : 'center'};
  border-bottom: 1px solid #e2e8f0;
`;

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  span {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    transition: opacity 0.3s ease;
  }
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: color 0.2s ease;

  &:hover {
    color: #1e293b;
  }
`;

const NavList = styled.nav`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s ease;
  gap: 0.75rem;
  background: ${props => props.$isActive ? '#f1f5f9' : 'transparent'};
  color: ${props => props.$isActive ? '#1e293b' : '#64748b'};

  span {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    white-space: nowrap;
    opacity: ${props => props.$isOpen ? 1 : 0};
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }

  svg {
    min-width: 20px;
  }
`;

const Sidebar = ({ $isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      path: '/watchlist',
      name: 'Watchlist',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V21L12 17.5L5 21V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 13.2554C18.2207 14.3805 15.1827 15 12 15C8.81732 15 5.77931 14.3805 3 13.2554M16 6V4C16 3.44772 15.5523 3 15 3H9C8.44772 3 8 3.44772 8 4V6M12 12H12.01M5 20H19C20.1046 20 21 19.1046 21 18V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V18C3 19.1046 3.89543 20 5 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <SidebarContainer $isOpen={$isOpen}>
      <SidebarHeader $isOpen={$isOpen}>
        <Logo $isOpen={$isOpen}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Finanalysis</span>
        </Logo>
        <ToggleButton onClick={toggleSidebar}>
          {$isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </ToggleButton>
      </SidebarHeader>

      <NavList>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            $isOpen={$isOpen}
            $isActive={location.pathname === item.path}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavItem>
        ))}
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;