// src/component/dashboard/OverviewCard/index.jsx
import styled from 'styled-components';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

const Card = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform ${props => props.theme.transitions};

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.gray};
  font-size: 0.875rem;
  font-weight: 500;
`;

const TrendIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: ${props => props.isPositive ? '#10B981' : '#EF4444'};

  svg {
    font-size: 1rem;
  }
`;

const Value = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.secondary};
`;

const OverviewCard = ({ title, value, trend, isPositive }) => {
  return (
    <Card>
      <CardHeader>
        <Title>{title}</Title>
        <TrendIndicator isPositive={isPositive}>
          {isPositive ? <TrendingUp /> : <TrendingDown />}
          {trend}
        </TrendIndicator>
      </CardHeader>
      <Value>{value}</Value>
    </Card>
  );
};

export default OverviewCard;