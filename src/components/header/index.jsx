// src/component/header/index.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.white};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.secondary};
  text-decoration: none;
  font-weight: 500;
  transition: color ${props => props.theme.transitions};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const TrialButton = styled(Link)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius};
  text-decoration: none;
  transition: opacity ${props => props.theme.transitions};

  &:hover {
    opacity: 0.9;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo to="/">Finalysis</Logo>
        <Nav>
          <NavLink to="/demos">Demos</NavLink>
          <NavLink to="/pages">Pages</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/blocks">Blocks</NavLink>
          <NavLink to="/documentation">Documentation</NavLink>
          <TrialButton to="/dashboard">Free Trial</TrialButton>
        </Nav>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;