import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styled from "styled-components";
import { BsChevronLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, number, object, string } from "yup";
import ButtonGroup from "../buttons/ButtonGroup";
import { TokenGenType } from "../../../types/TokenGenType";
import axios, { AxiosError } from "axios";
import { SHA256 } from "crypto-js";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";

const ModalStyled = styled.dialog`
  padding: 1rem 2rem;
  margin: auto;
  border: none;
  border-radius: 0.5rem;
  width: min(90%, 40rem);
  height: min(90%, 40rem);
  .form-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    & h2 {
      font-size: 2rem;
      color: rgb(var(--dark-color));
    }
    & button[data-close] {
      position: absolute;
      top: 1rem;
      left: 0;
      padding: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.25rem;
      border-radius: 0.25rem;
      font-size: 1rem;
      background-color: rgb(var(--dark-color), 0.05);
      &:hover {
        background-color: rgb(var(--dark-color), 0.1);
      }
    }
    & form {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      & .input-group {
        width: 100%;
        position: relative;
        & input {
          width: 100%;
          font-size: 1rem;
          padding: 0.75rem 1rem;
          outline: 0 solid rgb(var(--primary-color), 0.25);
          border: 1px solid rgb(var(--dark-color), 0.5);
          border-radius: 5rem;
          transition: 0.15s;
          &:focus {
            color: rgb(var(--primary-color));
            outline-width: 5px;
          }
        }
        & label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: rgb(var(--dark-color), 0.75);
          transition: 0.15s;
        }
        & input:valid ~ label,
        input:focus ~ label {
          top: 0;
          left: 5rem;
          font-size: 0.8rem;
          padding: 0 0.25rem;
          color: rgb(var(--primary-color));
          background-color: rgb(var(--light-color));
        }
      }
      & .button-group {
        width: 100%;
      }
    }
  }
`;

const brokerOTPSchema = object({
  password: string().required("Password is required"),
  otp: number()
    .required()
    .typeError("OTP is required")
    .test({
      name: "len",
      message: "OTP must be exactly 5 digits",
      test: (val) => val?.toString().length === 5,
    }),
});

type BrokerOTPType = InferType<typeof brokerOTPSchema>;

const ModalOTP = ({
  showModal,
  setShowModal,
}: {
  showModal: TokenGenType;
  setShowModal: Dispatch<SetStateAction<TokenGenType | null>>;
}) => {
  const [, setCookie] = useCookies();
  const modalRef = useRef<HTMLDialogElement>(null);
  const {
    register: registerBroker,
    handleSubmit: handleSubmitOTP,
    formState: { errors: errorsBroker },
  } = useForm<BrokerOTPType>({
    resolver: yupResolver(brokerOTPSchema),
  });
  const closeModal = () => setShowModal(null);
  useEffect(() => {
    if (showModal) {
      !modalRef.current?.open && modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);
  modalRef.current?.addEventListener(
    "click",
    ({ clientX, clientY }: { clientX: number; clientY: number }): void => {
      const dialogDimensions = modalRef.current?.getBoundingClientRect();
      if (
        clientX < dialogDimensions?.left! ||
        clientX > dialogDimensions?.right! ||
        clientY < dialogDimensions?.top! ||
        clientY > dialogDimensions?.bottom!
      ) {
        modalRef.current?.close();
      }
    }
  );
  const verifyOTP = ({ otp, password }: BrokerOTPType) => {
    if (!showModal) return;
    const { userID, venderCode, apiKey }: TokenGenType = showModal;
    const appKey = SHA256(`${userID}|${apiKey}`).toString();
    const imei = "abc1234";
    const data = {
      uid: userID,
      pwd: SHA256(password).toString(),
      factor2: otp.toString(),
      vc: venderCode,
      appkey: appKey,
      apkversion: "1.0.0",
      source: "API",
      imei,
    };
    const jData = "jData=" + JSON.stringify(data);
    axios
      .post("https://api.shoonya.com/NorenWClientTP/QuickAuth/", jData)
      .then(async ({ data: { susertoken: userToken } }) => {
        console.log(userToken);
        closeModal();
        setCookie(userID, userToken, { path: "/", maxAge: 86400 });
        toast.success("OTP Verified");
      })
      .catch((err: AxiosError) => {
        console.error(err);
        toast.error("Invalid OTP");
      });
  };
  return (
    <ModalStyled ref={modalRef}>
      <div className="form-container">
        <h2>Broker Login Form</h2>
        <button onClick={closeModal} data-close>
          <BsChevronLeft />
          <span>Back</span>
        </button>
        <form onSubmit={handleSubmitOTP(verifyOTP)}>
          <div className="input-group">
            <input
              type="password"
              id="password"
              autoComplete="on"
              {...registerBroker("password")}
              required
            />
            <label htmlFor="password">Password</label>
            <p className="error">{errorsBroker.password?.message}</p>
          </div>
          <div className="input-group">
            <input type="text" id="otp" {...registerBroker("otp")} required />
            <label htmlFor="otp">OTP</label>
            <p className="error">{errorsBroker.otp?.message}</p>
          </div>
          <ButtonGroup>
            <button type="submit" data-submit>
              Login
            </button>
          </ButtonGroup>
        </form>
      </div>
    </ModalStyled>
  );
};

export default ModalOTP;
