import Hero from "@/components/home/Hero";
import Signup from "@/components/home/Signup";
import styled from "styled-components";

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (width < 50rem) {
    margin-top: 5rem;
    text-align: center;
  }
`;

const Home = () => {
  return (
    <Main className="container">
      <Signup />
      <Hero />
    </Main>
  );
};

export default Home;
