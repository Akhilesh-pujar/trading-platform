import BrokerDetails from "@/components/broker/BrokerDetails";
import BrokerOTP from "@/components/broker/BrokerOTP";
import { AnimatePresence } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { BrokerType } from "../../../types/Broker";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import bgImage from "../../../public/img/bg-image.svg";

const AddBrokerStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${bgImage.src});
  background-repeat: repeat-x;
  background-position: center bottom;
  color: rgb(var(--dark-color), 0.5);
  min-height: 100vh;
  display: grid;
  place-items: center;
  &::before {
    content: "FlashCliq";
    position: absolute;
    top: 2rem;
    left: 2rem;
    font-size: 2rem;
    font-weight: 500;
    color: rgb(var(--primary-color));
    @media screen and (width < 65rem) {
      content: "";
    }
  }
  & form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgb(var(--light-color));
    gap: 1.75rem;
    border: 1px solid rgb(var(--dark-color), 0.1);
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem rgb(var(--dark-color), 0.1);
    @media screen and (width > 50rem) {
      max-width: 40rem;
      max-height: calc(100vh - 4rem);
    }
    & .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      width: 100%;
      gap: 1.75rem;
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
    }
    & .button-group {
      width: 100%;
      border-top: 1px solid rgb(var(--dark-color), 0.1);
      padding: 1rem 2rem;
    }
  }
`;

const AddBroker = () => {
  const [user, loading, error] = useAuthState(auth);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [broker, setBroker] = useState<BrokerType>({} as BrokerType);
  const router = useRouter();
  useEffect(() => {
    if (!loading && (!user?.uid || error)) {
      if (error) {
        toast.error("Something Went Wrong");
      }
      router.push("/");
      return;
    }
  }, [error, loading, router, user?.uid]);
  return (
    <AddBrokerStyled>
      {!showOTP ? (
        <AnimatePresence mode="wait">
          <BrokerDetails setShowOTP={setShowOTP} setBroker={setBroker} />
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <BrokerOTP broker={broker} setShowOTP={setShowOTP} />
        </AnimatePresence>
      )}
    </AddBrokerStyled>
  );
};

export default AddBroker;

AddBroker.getLayout = function pageLayout(page: ReactElement) {
  return <>{page}</>;
};
