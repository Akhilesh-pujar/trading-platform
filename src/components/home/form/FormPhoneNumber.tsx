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
  // phoneNumber is only number and exactly 10 digits
  phoneNumber: number()
    .test(
      "len",
      "Must be exactly 10 digits",
      (val) => val?.toString().length === 10
    )
    .typeError("Phone number must be exactly 10 digits")
    .required(),
});

type FormDataPhoneNumber = InferType<typeof phoneNumberSchema>;

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
    try {
      const phoneNumberWithCountryCode = `+91${phoneNumber}`;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumberWithCountryCode,
        new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "visible",
            callback: () => {},
            "expired-callback": () => {},
          },
          auth
        )
      );
      setShowOTP(confirmationResult);
      toast.success("OTP is sent successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      setLoading(false);
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
        {loading && <span className="loader" />}
        Get OTP
      </button>
    </motion.form>
  );
};

export default FormPhoneNumber;
