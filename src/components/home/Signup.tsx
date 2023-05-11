import Image from "next/image";
import accountOpen from "../../../public/img/account_open.png";
import styled from "styled-components";
import { ConfirmationResult } from "firebase/auth";
import { useState } from "react";
import FormPhoneNumber from "./form/FormPhoneNumber";
import FormOTP from "./form/FormOTP";
import { AnimatePresence } from "framer-motion";

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  & .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    & h2 {
      font-size: 2rem;
      font-weight: 400;
    }
    & p {
      font-size: 1.25rem;
    }
  }
  & .form-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    @media screen and (max-width: 50rem) {
      flex-direction: column;
    }
    & img {
      width: auto;
      height: 50vh;
      object-fit: cover;
      object-position: center;
    }
    & form {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 1rem;
      @media screen and (width < 50rem) {
        align-items: center;
      }
      & .form-top {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.5rem;
        @media screen and (width < 50rem) {
          align-items: center;
        }
        & h2 {
          font-size: 2rem;
          font-weight: 500;
        }
        & p {
          font-size: 1rem;
          font-weight: 400;
          color: rgb(var(--dark-color), 0.5);
        }
      }
      & table {
        border-collapse: collapse;
        border-radius: 0.25rem;
        width: 100%;
        & td {
          padding: 0.75rem;
          font-size: 1.25rem;
          & input {
            color: rgb(var(--dark-color));
            width: 100%;
            border: none;
            outline: none;
            font-size: 1.25rem;
            &::placeholder {
              font-size: 1.2rem;
              color: rgb(var(--dark-color), 0.5);
            }
            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
              -webkit-appearance: none;
            }
          }
        }
      }
      td {
        border: 1px solid rgb(var(--dark-color), 0.1);
      }
      & .small {
        margin-top: -0.5rem;
        font-size: 0.8rem;
        font-weight: 400;
        color: rgb(var(--dark-color), 0.5);
      }
      & button {
        font-size: 1rem;
        font-weight: 500;
        color: rgb(var(--light-color));
        padding: 0.75rem 1.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
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
        &:disabled {
          background-color: rgb(var(--dark-color), 0.25);
          box-shadow: none;
          animation-play-state: paused;
        }
        & span.loader {
          width: 1rem;
          height: 1rem;
          display: inline-block;
          position: relative;
          &::after,
          &::before {
            content: "";
            box-sizing: border-box;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            border: 2px solid #fff;
            position: absolute;
            inset: -0.25rem;
            animation: animloader 2s linear infinite;
          }
          &::after {
            animation-delay: 1s;
          }
          @keyframes animloader {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
        }
      }
    }
  }
`;

const Signup = () => {
  const [showOTP, setShowOTP] = useState<ConfirmationResult | null>(null);
  return (
    <Section>
      <div className="content">
        <h2>Join 1+ Crore investors & traders</h2>
        <p>Open a trading and Demat account online and start investing</p>
      </div>
      <div className="form-container">
        <Image src={accountOpen} alt="FlashCliq, no. 1 stock broker in India" />
        {!showOTP ? (
          <AnimatePresence mode="wait">
            <FormPhoneNumber setShowOTP={setShowOTP} />
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="wait">
            <FormOTP showOTP={showOTP} />
          </AnimatePresence>
        )}
      </div>
    </Section>
  );
};

export default Signup;
