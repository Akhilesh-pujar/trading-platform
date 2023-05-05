import BrokerDetails from "@/components/broker/BrokerDetails";
import BrokerOTP from "@/components/broker/BrokerOTP";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps } from "next";
import { ReactElement, useState } from "react";
import styled from "styled-components";

const AddBrokerStyled = styled.div`
  color: rgb(var(--dark-color), 0.5);
  min-height: 100vh;
  display: grid;
  place-items: center;
  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: min(100%, 40rem);
    gap: 1.75rem;
    padding: 2rem;
    border: 1px solid rgb(var(--dark-color), 0.1);
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem rgb(var(--dark-color), 0.1);
    & .form-top {
      width: 100%;
      & h2 {
        font-size: 2rem;
        font-weight: 500;
        color: rgb(var(--dark-color));
        width: 100%;
      }
      & p {
        font-size: 1rem;
        font-weight: 500;
        width: 100%;
      }
    }
    & .input-group {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      & > * {
        width: 100%;
      }
      & label {
        position: absolute;
        top: 50%;
        left: 1rem;
        width: fit-content;
        transform: translateY(-50%);
        background-color: rgb(var(--light-color));
        transition: 0.15s;
      }
      & input {
        padding: 0.75rem 1rem;
        border: 1px solid rgb(var(--dark-color), 0.1);
        border-radius: 0.5rem;
        outline: none;
        transition: border-color 0.15s;
        &:focus-visible {
          border-color: rgb(var(--primary-color));
        }
        &:focus-visible + label,
        &:valid + label {
          color: rgb(var(--primary-color));
          top: -0.5rem;
          left: 0.5rem;
          transform: translateY(0);
          font-size: 0.75rem;
        }
      }
      & .error {
        position: absolute;
        bottom: -1rem;
        left: 0.5rem;
        color: rgb(var(--danger-color));
        font-size: 0.75rem;
      }
    }
    & .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      --radius: 5rem;
      & button {
        padding: 0.5rem 1.5rem;
        border-radius: 1rem var(--radius);
        border: 1px solid rgb(var(--primary-color));
        background-color: rgb(var(--primary-color));
        color: rgb(var(--light-color));
        font-weight: 500;
        transition: 0.15s;
        &:hover {
          background-color: rgb(var(--primary-color), 0.8);
          border: 1px solid rgb(var(--primary-color), 0.8);
        }
      }
      & a {
        padding: 0.5rem 1.5rem;
        border-radius: 1rem var(--radius);
        border: 1px solid rgb(var(--danger-color), 0.5);
        color: rgb(var(--danger-color), 0.5);
        font-weight: 500;
        transition: 0.15s;
        &:hover {
          border: 1px solid transparent;
          background-color: rgb(var(--danger-color));
          color: rgb(var(--light-color));
        }
      }
    }
  }
`;

const AddBroker = () => {
  const [showOTP, setShowOTP] = useState<boolean>(false);
  return (
    <AddBrokerStyled className="container">
      {!showOTP ? (
        <AnimatePresence mode="wait">
          <BrokerDetails setShowOTP={setShowOTP} />
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <BrokerOTP />
        </AnimatePresence>
      )}
    </AddBrokerStyled>
  );
};

export default AddBroker;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log(req.cookies);
  return !Object.keys(req.cookies).length
    ? { redirect: { destination: "/", permanent: false } }
    : { props: {} };
};

AddBroker.getLayout = function pageLayout(page: ReactElement) {
  return <>{page}</>;
};
