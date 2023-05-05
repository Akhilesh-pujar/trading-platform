import Image from "next/image";
import landing from "../../../public/img/landing.png";
import styled from "styled-components";
import Link from "next/link";

const Section = styled.section`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  & img {
    width: auto;
    height: 50vh;
    object-fit: cover;
    object-position: center;
  }
  & .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    & h2 {
      font-size: 2.75rem;
      font-weight: 600;
    }
    & p {
      font-size: 1.25rem;
    }
  }
  & button {
    font-size: 1rem;
    font-weight: 500;
    color: rgb(var(--light-color));
    padding: 0.75rem 1.25rem;
    border-radius: 5rem;
    background-color: rgb(var(--primary-color));
    border: 1px solid rgb(var(--light-color), 0.1);
    box-shadow: 0 0.25rem 0.5rem rgb(var(--primary-color), 0.25),
      0 0.35rem 1rem rgb(var(--primary-color), 0.1);
    width: fit-content;
    cursor: pointer;
    overflow: hidden;
    transition: 0.5s;
    animation: animate-size 0.75s infinite ease alternate;
    @keyframes animate-size {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.05);
      }
    }
    &:hover {
      border-color: transparent;
      box-shadow: 0 0 0.75rem rgb(var(--primary-color), 0.75);
      animation-play-state: paused;
    }
  }
`;

const Hero = () => {
  return (
    <Section>
      <Link href="/"><Image src={landing} alt="Tojo, no. 1 stock broker in India" /></Link>
      <div className="content">
        <h2>Invest in everything</h2>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
      </div>
      <button>Sign up now</button>
      <Link href="BrokerList/Index">go to add broker</Link>
    </Section>
  );
};

export default Hero;
