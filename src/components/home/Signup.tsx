import Image from "next/image";
import accountOpen from "../../../public/img/account_open.png";
import styled from "styled-components";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { object, InferType, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/router";

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
      & .form-top {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.5rem;
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
    }
  }
`;

const phoneNumberSchema = object({
  // phoneNumber is only number and length is 10
  phoneNumber: number()
    .required()
    .typeError("Phone number is required")
    .test({
      name: "len",
      message: "Phone number must be exactly 10 digits",
      test: (val) => val?.toString().length === 10,
    }),
});

const otpSchema = object({
  // otp is only number and length is 6
  otp: number()
    .required()
    .typeError("OTP is required")
    .test({
      name: "len",
      message: "OTP must be exactly 6 digits",
      test: (val) => val?.toString().length === 6,
    }),
});

type FormDataPhoneNumber = InferType<typeof phoneNumberSchema>;
type FormDataOTP = InferType<typeof otpSchema>;

type Window = typeof window & {
  recaptchaVerifier?: RecaptchaVerifier;
};

const Signup = () => {
  const [user, loading, error] = useAuthState(auth);
  const [showOTP, setShowOTP] = useState<ConfirmationResult | null>(null);
  const { push } = useRouter();
  const {
    register: registerPhoneNumber,
    handleSubmit: handleSubmitPhoneNumber,
    reset: resetPhoneNumber,
    formState: { errors: errorsPhoneNumber },
  } = useForm<FormDataPhoneNumber>({
    resolver: yupResolver(phoneNumberSchema),
  });
  const sendOTP = async ({ phoneNumber }: FormDataPhoneNumber) => {
    const windowWithVerifier = window as Window;
    const appVerifier = windowWithVerifier.recaptchaVerifier
      ? windowWithVerifier.recaptchaVerifier
      : (windowWithVerifier.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {},
            "expired-callback": () => {},
          },
          auth
        ));
    const phoneNumberWithCountryCode = `+91${phoneNumber}`;
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumberWithCountryCode,
      appVerifier
    );
    console.log(confirmationResult);
    setShowOTP(confirmationResult);
    resetPhoneNumber();
  };
  const {
    register: registerOTP,
    handleSubmit: handleSubmitOTP,
    reset: resetOTP,
    formState: { errors: errorsOTP },
  } = useForm<FormDataOTP>({
    resolver: yupResolver(otpSchema),
  });
  const verifyOTP = async ({ otp }: FormDataOTP) => {
    if (showOTP) {
      const confirmationResult = showOTP;
      const credential = await confirmationResult.confirm(otp.toString());
      console.log(credential);
      setShowOTP(null);
      resetOTP();
      // redirect to broker list page
      push("/broker-list");
    }
  };
  return (
    <Section>
      <div className="content">
        <h2>Join 1+ Crore investors & traders</h2>
        <p>
          Open a trading and Demat account online and start investing for free
        </p>
      </div>
      <div className="form-container">
        <Image src={accountOpen} alt="Tojo, no. 1 stock broker in India" />
        {!showOTP ? (
          <form onSubmit={handleSubmitPhoneNumber(sendOTP)}>
            <div className="form-top">
              <h2>Signup now</h2>
              <p>Or track your existing application</p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>+91</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Your 10 digit mobile number"
                      {...registerPhoneNumber("phoneNumber")}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="small">You will receive an OTP on your number</p>
            {errorsPhoneNumber.phoneNumber && (
              <p className="small alert">
                {errorsPhoneNumber.phoneNumber?.message}
              </p>
            )}
            <div id="recaptcha-container"></div>
            <button type="submit">Continue</button>
          </form>
        ) : (
          <form onSubmit={handleSubmitOTP(verifyOTP)}>
            <div className="form-top">
              <h2>Enter OTP</h2>
              <p>Enter the OTP sent to your mobile number</p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>OTP</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Enter OTP"
                      {...registerOTP("otp")}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="small">You will receive an OTP on your number</p>
            <button type="submit">Continue</button>
          </form>
        )}
      </div>
    </Section>
  );
};

export default Signup;
