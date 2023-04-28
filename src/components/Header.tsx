import Link from "next/link";
import styled from "styled-components";

const HeaderStyle = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(0.25rem);
  border: 1px solid rgb(var(--dark-color), 0.1);
  z-index: 10;
  & .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    padding: 0.75rem 0;
    & .links {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      & h1 {
        position: relative;
        text-transform: uppercase;
        font-size: 1.5rem;
        font-weight: 600;
        color: rgb(var(--primary-color));
        margin-right: 1rem;
        cursor: pointer;
        @media screen and (max-width: 50rem) {
          margin-right: auto;
        }
      }
      & ul {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        @media screen and (max-width: 50rem) {
          display: none;
        }
        & li {
          position: relative;
          list-style: none;
          font-weight: 600;
          font-size: small;
          text-transform: uppercase;
          color: rgb(var(--dark-color), 0.75);
          cursor: pointer;
          transition: 0.15s;
          &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 0.15rem;
            transform: scaleX(0);
            border-radius: 0.25rem;
            background-color: rgb(var(--primary-color));
            @keyframes animate-links {
              0% {
                transform: scaleX(0);
                transform-origin: left;
              }
              50% {
                transform: scaleX(1);
                transform-origin: left;
              }
              100% {
                transform: scaleX(0);
                transform-origin: right;
              }
            }
          }
          &:hover {
            color: rgb(var(--primary-color));
          }
          &:hover::before {
            animation: animate-links 0.5s ease;
          }
        }
      }
    }
    & .icons {
      display: flex;
      align-items: center;
      & a {
        position: relative;
        font-weight: 600;
        font-size: small;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        padding: 0.75rem 1.5rem;
        border-radius: 5rem;
        color: rgb(var(--light-color));
        background-color: rgb(var(--primary-color));
        border: 1px solid rgb(var(--light-color), 0.1);
        cursor: pointer;
        overflow: hidden;
        box-shadow: 0 0.15rem 0.5rem rgb(var(--primary-color), 0.25),
          0 0.25rem 1rem rgb(var(--primary-color), 0.1);
        transition: 0.5s;
        &:hover {
          box-shadow: 0 0 0.75rem rgb(var(--primary-color), 0.25);
        }
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 1.5rem;
          height: 100%;
          background-color: rgb(var(--light-color), 0.5);
          transform: skewX(-30deg) translateX(-700%);
          transition: 0.5s;
        }
        &:hover::before {
          transform: skewX(-30deg) translateX(700%);
        }
      }
    }
  }
`;

const Header = () => {
  return (
    <HeaderStyle>
      <div className="navbar container">
        <div className="links">
          <h1>Flash Cliq</h1>
          <ul>
            <li>
              <Link href="#home">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/support">Support</Link>
            </li>
          </ul>
        </div>
        <div className="icons">
          <Link href="/signup">Get Started</Link>
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
