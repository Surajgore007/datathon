// src/components/dashboard/KPIDisplay/index.jsx
import styled from 'styled-components';

const KPIWrapper = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 1.5rem;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Value = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const Label = styled.div`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.secondary};
`;

const KPIDisplay = () => {
  return (
    <KPIWrapper>
      <Value>$1.2M</Value>
      <Label>Total Revenue This Quarter</Label>
    </KPIWrapper>
  );
};

export default KPIDisplay;