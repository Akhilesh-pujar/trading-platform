import Hero from "@/components/home/Hero";
import Signup from "@/components/home/Signup";
import styled from "styled-components";

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const index = () => {
  return (
    <Main className="container">
      <Signup />
      <Hero />
    </Main>
  );
};

export default index;
