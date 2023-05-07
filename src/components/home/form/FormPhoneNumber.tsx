import { yupResolver } from "@hookform/resolvers/yup";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { object, InferType, number } from "yup";
import { auth } from "../../../../firebase";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const phoneNumberSchema = object({
  // phoneNumber is only number and length is 10
  phoneNumber: number().min(10).max(10).required("Phone number is required"),
});

type FormDataPhoneNumber = InferType<typeof phoneNumberSchema>;
type Window = typeof window & {
  recaptchaVerifier?: RecaptchaVerifier;
};

const container = {
  hidden: { opacity: 0, x: "-100vw" },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "100vw" },
};

const FormPhoneNumber = ({
  setShowOTP,
}: {
  setShowOTP: Dispatch<SetStateAction<ConfirmationResult | null>>;
}) => {
  const [loading, setLoading] = useState(false);
  const {
    register: registerPhoneNumber,
    handleSubmit: handleSubmitPhoneNumber,
    formState: { errors: errorsPhoneNumber },
  } = useForm<FormDataPhoneNumber>({
    resolver: yupResolver(phoneNumberSchema),
  });
  const sendOTP = async ({ phoneNumber }: FormDataPhoneNumber) => {
    setLoading(true);
    const windowWithVerifier = window as Window;
    try {
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
      setShowOTP(confirmationResult);
      toast.success("OTP is sent successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <motion.form
      onSubmit={handleSubmitPhoneNumber(sendOTP)}
      key="form-phone-number"
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
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
        <p className="small alert">{errorsPhoneNumber.phoneNumber?.message}</p>
      )}
      <div id="recaptcha-container"></div>
      <button type="submit" disabled={loading}>
        {loading && <span className="loader"></span>}
        Get OTP
      </button>
    </motion.form>
  );
};

export default FormPhoneNumber;
