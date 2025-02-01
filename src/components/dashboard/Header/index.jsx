// src/component/dashboard/Header/index.jsx
import styled from 'styled-components';
import {
  Notifications,
  Settings,
  Person,
  Search,
} from '@mui/icons-material';

const HeaderWrapper = styled.header`
  background: ${props => props.theme.colors.white};
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius};
  padding: 0.5rem 1rem;
  width: 300px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  margin-left: 0.5rem;
  width: 100%;
  color: ${props => props.theme.colors.secondary};

  &::placeholder {
    color: ${props => props.theme.colors.gray};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  color: ${props => props.theme.colors.secondary};
  transition: background ${props => props.theme.transitions};

  &:hover {
    background: ${props => props.theme.colors.background};
  }

  svg {
    font-size: 1.25rem;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  transition: background ${props => props.theme.transitions};

  &:hover {
    background: ${props => props.theme.colors.background};
  }
`;

const UserInfo = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserName = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.secondary};
`;

const UserRole = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray};
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <SearchBar>
        <Search sx={{ color: 'gray' }} />
        <SearchInput placeholder="Search..." />
      </SearchBar>
      <Actions>
        <IconButton>
          <Notifications />
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
        <UserProfile>
          <Person />
          <UserInfo>
            <UserName>Surajgore007</UserName>
            <UserRole>Administrator</UserRole>
          </UserInfo>
        </UserProfile>
      </Actions>
    </HeaderWrapper>
  );
};

export default Header;