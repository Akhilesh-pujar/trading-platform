import styled from "styled-components";
import { useState } from "react";

const FooterElement = styled.footer`
  background-color: rgb(var(--dark-color), 0.05);
  width: 100%;
  margin-top: 3rem;
  text-align: center;
  padding-block: 2.5rem 0;
  transition: 0.15s;
  & .description {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.25rem;
    @media screen and (width < 50rem) {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    & .hero {
      text-align: left;
      @media screen and (width < 50rem) {
        text-align: center;
      }
      & h2 {
        font-size: 2rem;
        color: rgb(var(--primary-color));
        font-weight: 500;
        transition: 0.15s;
      }
      & span {
        font-size: 1.25rem;
        font-weight: 400;
        color: rgb(var(--dark-color), 0.5);
      }
      & p {
        font-size: 1rem;
        color: rgb(var(--dark-color), 0.5);
      }
    }
    & .socials {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 0.25rem;
      @media screen and (width < 50rem) {
        align-items: center;
      }
      & h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: rgb(var(--primary-color));
      }
      & ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 0.25rem;
        list-style: none;
        @media screen and (width < 50rem) {
          align-items: center;
        }
        & li {
          position: relative;
          font-weight: 400;
          color: rgb(var(--dark-color), 0.75);
          transition: 0.15s;
          &::before {
            content: "";
            position: absolute;
            inset: auto 0 0 0;
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
  }
  & .credits {
    padding: 1.25rem 0;
    font-size: 0.8rem;
    font-weight: 400;
    color: rgb(var(--dark-color), 0.5);
    border-top: 1px solid rgb(var(--dark-color), 0.1);
  }
`;

const Footer = () => {
  const original = "FlashCliq";
  const [logo, setLogo] = useState<string>(original);
  const mouseOver = (): void => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let iterations = 0;
    const interval = setInterval(() => {
      setLogo((prev) =>
        prev
          .split("")
          .map((_, index) => {
            if (index < iterations) {
              return original[index];
            }
            return letters[Math.floor(Math.random() * 52)];
          })
          .join("")
      );
      if (iterations >= original.length) clearInterval(interval);
      iterations += 1 / 2;
    }, 30);
  };
  const socials = [
    {
      name: "Linkedin",
      link: "https://www.linkedin.com/in/tojo",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/tojo",
    },
    {
      name: "Github",
      link: "https://github.com/tojo",
    },
    {
      name: "Instagram",
      link: "http://instagram.com/tojo",
    },
    {
      name: "Youtube",
      link: "https://www.youtube.com/@tojo/",
    },
  ];
  return (
    <FooterElement className="">
      <div className="description container">
        <div className="hero">
          <h2 onMouseOver={mouseOver}>{logo}</h2>
          <span>Get a turbocharged rush with FlashCliq Tradings</span>
          <p>
            Designed and built with all the love in the world by the FlashCliq
            using Next.js.
          </p>
        </div>
        <div className="socials">
          <h3>Socials</h3>
          <ul>
            {socials.map((social, index) => (
              <li key={index}>
                <a href={social.link} target="_blank" rel="noreferrer">
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="credits">© 2023 FlashCliq Tradings, Inc.</div>
    </FooterElement>
  );
};

export default Footer;

{
  /* <div className="col">
  <Link href="/dashboard" className="dashboard">
    Dashboard
  </Link>
</div> */
}
