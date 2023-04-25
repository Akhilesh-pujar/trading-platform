import styled from "styled-components";
import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { useState } from "react";
import Link from "next/link";

const FooterElement = styled.footer`
  background-color: rgb(var(--dark-color), 0.05);
  margin-block: 3rem 5rem;
  padding: 3rem;
  border-radius: 2rem;
  text-align: center;
  transition: 0.15s;
  box-shadow: 0 0 1rem rgb(var(--dark-color), 0.1);
  & .row {
    margin-bottom: 2rem;
    display: flex;
    gap: 5rem;
    @media screen and (max-width: 50rem) {
      flex-direction: column;
      gap: 2rem;
    }
    & .col {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      text-align: left;
      @media screen and (max-width: 50rem) {
        text-align: center;
      }
      & .col-header {
        display: flex;
        flex-direction: column;
        & h2 {
          font-size: 1.5rem;
          color: rgb(var(--primary-color));
          text-transform: uppercase;
        }
        & span {
          font-size: 1rem;
          color: rgb(var(--primary-color), 0.8);
          font-weight: 300;
        }
      }
      @media screen and (max-width: 50rem) {
        &.social .col-body {
          & ul {
            align-items: center;
          }
        }
      }
      & .col-body {
        & ul {
          list-style: none;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          gap: 0.5rem;
          & li {
            font-size: 0.9rem;
            color: rgb(var(--dark-color), 0.5);
            transition: 0.15s;
            white-space: nowrap;
            font-weight: 500;
            &:hover {
              color: rgb(var(--primary-color));
            }
          }
          &.description li {
            white-space: normal;
          }
        }
      }
      & a.dashboard {
        position: relative;
        font-weight: 600;
        font-size: small;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        color: rgb(var(--light-color));
        margin-left: auto;
        width: fit-content;
        padding: 0.75rem 1.5rem;
        border-radius: 5rem;
        background-color: rgb(var(--primary-color));
        border: 1px solid rgb(var(--light-color), 0.1);
        cursor: pointer;
        overflow: hidden;
        box-shadow: 0 0.15rem 0.5rem rgb(var(--primary-color), 0.25),
          0 0.25rem 1rem rgb(var(--primary-color), 0.1);
        transition: 0.5s;
        @media screen and (max-width: 50rem) {
          margin-inline: auto;
        }
        &:hover {
          box-shadow: 0 0 0.75rem rgb(var(--primary-color), 0.25);
        }
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 3rem;
          height: 100%;
          background-color: rgb(var(--dark-color), 0.5);
          transform: skewX(-30deg) translateX(-400%);
          transition: 0.75s;
        }
        &:hover::before {
          transform: skewX(-30deg) translateX(400%);
        }
      }
    }
  }
  & .credits {
    font-size: 1rem;
    color: rgb(var(--dark-color), 0.5);
    letter-spacing: 0.05rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    @media screen and (max-width: 50rem) {
      flex-direction: column;
      gap: 1rem;
    }
    & .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      @media screen and (max-width: 50rem) {
        flex-direction: column;
      }
      & .socials {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.15rem;
        & a {
          display: flex;
          justify-content: center;
          align-items: center;
          & svg {
            transition: 0.15s;
            &:hover {
              color: rgb(var(--primary-color), 0.8);
            }
          }
        }
      }
    }
    & .right {
      cursor: pointer;
    }
  }
`;

const Footer = () => {
  const original = "Tojo";
  const [logo, setLogo] = useState<string>(original);
  const mouseOver = (): void => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iterations = 0;
    const interval = setInterval(() => {
      setLogo((prev) =>
        prev
          .split("")
          .map((_, index) => {
            if (index < iterations) {
              return original[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );
      if (iterations >= original.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
  };
  return (
    <FooterElement className="container">
      <div>
        <div className="row">
          <div className="col">
            <div className="col-header">
              <h2 onMouseOver={mouseOver}>{logo}</h2>
              <span>
                Get a turbocharged rush with Tojo&apos;s Trading solutions
              </span>
            </div>
            <div className="col-body">
              <ul className="description">
                <li>
                  Designed and built with all the love in the world by the Tojo
                  using Next.js.
                </li>
                <li>Code licensed GNU General Public License v3.0.</li>
              </ul>
            </div>
          </div>
          <div className="col">
            <Link href="/dashboard" className="dashboard">
              Dashboard
            </Link>
          </div>
        </div>
        <div className="credits">
          <div className="left">
            <div className="socials">
              <a
                href="https://www.linkedin.com/in/tojo"
                target="_blank"
                rel="noopener noreferrer"
                title="Linkedin"
              >
                <BsLinkedin />
              </a>
              <a
                href="https://twitter.com/tojo"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
              >
                <BsTwitter />
              </a>
              <a
                href="https://github.com/tojo"
                target="_blank"
                rel="noopener noreferrer"
                title="Github"
              >
                <BsGithub />
              </a>
              <a
                href="http://instagram.com/tojo"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <BsInstagram />
              </a>
              <a
                href="https://www.youtube.com/@tojo/"
                target="_blank"
                rel="noopener noreferrer"
                title="Youtube"
              >
                <BsYoutube />
              </a>
            </div>
          </div>
          <div className="right">© 2023 Tojo, Inc.</div>
        </div>
      </div>
    </FooterElement>
  );
};

export default Footer;
