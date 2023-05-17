import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styled from "styled-components";
import { BsChevronLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, number, object, string } from "yup";
import ButtonGroup from "../buttons/ButtonGroup";

const ModalStyled = styled.dialog`
  margin: auto;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  width: min(90%, 40rem);
  height: min(90%, 40rem);
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
    left: 1rem;
    top: 1rem;
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
`;

const brokerOTPSchema = object({
  password: string().required("Password is required"),
  otp: number()
    .required()
    .typeError("OTP is required")
    .test({
      name: "len",
      message: "OTP must be exactly 6 digits",
      test: (val) => val?.toString().length === 6,
    }),
});

type BrokerOTPType = InferType<typeof brokerOTPSchema>;

const ModalOTP = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const {
    register: registerBroker,
    handleSubmit: handleSubmitBroker,
    formState: { errors: errorsBroker },
  } = useForm<BrokerOTPType>({
    resolver: yupResolver(brokerOTPSchema),
  });
  const closeModal = () => setShowModal(false);
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
  return (
    <ModalStyled ref={modalRef}>
      <h2>Broker Login Form</h2>
      <button onClick={closeModal} data-close>
        <BsChevronLeft />
        <span>Back</span>
      </button>
      <form>
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
          <label htmlFor="otp">Vender Code</label>
          <p className="error">{errorsBroker.otp?.message}</p>
        </div>
        <ButtonGroup>
          <button type="submit" data-submit>
            Login
          </button>
        </ButtonGroup>
      </form>
    </ModalStyled>
  );
};

export default ModalOTP;
