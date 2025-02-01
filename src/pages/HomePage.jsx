// src/pages/HomePage.jsx
import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <Header />
      <Hero />
      <Services />
    </HomeContainer>
  );
};

export default HomePage;