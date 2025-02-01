// src/component/services/index.jsx
import styled from 'styled-components';
import {
  Language,
  Code,
  People,
  PhoneIphone,
} from '@mui/icons-material';

const ServicesSection = styled.section`
  padding: 4rem;
  background: white;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.gray};
  max-width: 600px;
  margin: 0 auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled.div`
  padding: 2rem;
  background: white;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform ${props => props.theme.transitions};

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => `${props.theme.colors.primary}10`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  svg {
    font-size: 24px;
    color: ${props => props.theme.colors.primary};
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const services = [
  {
    icon: <Language />,
    title: "SEO Optimization",
    description: "Boost your website's visibility in search engines and drive organic traffic to your business."
  },
  {
    icon: <Code />,
    title: "Web Design",
    description: "Create beautiful, responsive websites that convert visitors into customers."
  },
  {
    icon: <People />,
    title: "Social Engagement",
    description: "Build and grow your social media presence to connect with your target audience."
  },
  {
    icon: <PhoneIphone />,
    title: "App Development",
    description: "Develop powerful mobile applications that enhance your business capabilities."
  }
];

const Services = () => {
  return (
    <ServicesSection>
      <Container>
        <SectionHeader>
          <Title>What We Do?</Title>
          <Subtitle>
            The full service we are offering is specifically designed to meet 
            your business needs.
          </Subtitle>
        </SectionHeader>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <IconWrapper>{service.icon}</IconWrapper>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default Services;