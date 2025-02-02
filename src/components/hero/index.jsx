// src/component/hero/index.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  padding: 8rem 4rem 4rem;
  background: ${props => props.theme.colors.background};
  min-height: 100vh;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 6rem 2rem 2rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Content = styled.div`
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.secondary};

  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.gray};
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled(Link)`
  padding: 0.875rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: 500;
  text-decoration: none;
  transition: all ${props => props.theme.transitions};
`;

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.colors.primary};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const SecondaryButton = styled(Button)`
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <Container>
        <Content>
          <Title>
            Grow Your Business with <span>Our Custom AI Model</span>
          </Title>
          <Description>
            We help our clients to increase their insights in about there stocks data.
          </Description>
          <ButtonGroup>
            <PrimaryButton to="/dashboard">Check Dashboard</PrimaryButton>
            <SecondaryButton to="/learn-more">Explore Now</SecondaryButton>
          </ButtonGroup>
        </Content>
      </Container>
    </HeroSection>
  );
};

export default Hero;