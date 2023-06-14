import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import rocket from "./../../public/icon/rocket.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import HeaderSkeleton from "./skeleton/HeaderSkeleton";
import { BiUserCircle } from "react-icons/bi";
import { useRef } from "react";

const HeaderStyle = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(0.25rem);
  border: 1px solid rgb(var(--dark-color), 0.1);
  z-index: 1;
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
        display: flex;
        gap: 0.5rem;
        position: relative;
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
      gap: 2rem;
      & > a {
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
      & button {
        position: relative;
        font-size: 1.75rem;
        display: grid;
        place-items: center;
        & dialog {
          top: 150%;
          right: 0;
          left: 0;
          border: 1px solid rgb(var(--dark-color), 0.1);
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: rgb(var(--light-color));
          box-shadow: 0 0.1rem 0.5rem rgb(var(--dark-color), 0.25);
          & > :first-child {
            border-bottom: 1px solid rgb(var(--dark-color), 0.1);
          }
          & a,
          span {
            color: rgb(var(--dark-color));
            background-color: transparent;
            white-space: nowrap;
            display: block;
            padding: 0.75rem;
            font-size: 0.9rem;
            font-weight: 600;
          }
        }
      }
    }
  }
`;

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <HeaderStyle>
      <div className="navbar container">
        <div className="links">
          <h1>
            FlashCliq <Image src={rocket} alt=""></Image>
          </h1>
          <ul>
            <li>
              <Link href="/#home">Home</Link>
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
          {!!loading ? (
            <HeaderSkeleton />
          ) : !!error || !user ? (
            <Link href="/">Get Started</Link>
          ) : (
            !!user && (
              <>
                <button
                  onClick={() => {
                    if (dialogRef.current?.open) {
                      dialogRef.current?.close();
                    } else {
                      dialogRef.current?.show();
                    }
                  }}
                >
                  <BiUserCircle />
                  <dialog ref={dialogRef}>
                    <Link href="/setting">Setting</Link>
                    <span
                      onClick={() => {
                        auth.signOut();
                        dialogRef.current?.close();
                      }}
                    >
                      Sign Out
                    </span>
                  </dialog>
                </button>
                <Link href="/broker-list">Trade</Link>
              </>
            )
          )}
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
