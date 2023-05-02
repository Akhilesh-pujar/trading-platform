import { yupResolver } from "@hookform/resolvers/yup";
import { ConfirmationResult } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, InferType, number } from "yup";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

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

type FormDataOTP = InferType<typeof otpSchema>;

const container = {
  hidden: { opacity: 0, x: "-100vw" },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "100vw" },
};

const FormOTP = ({ showOTP }: { showOTP: ConfirmationResult }) => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register: registerOTP,
    handleSubmit: handleSubmitOTP,
    formState: { errors: errorsOTP },
  } = useForm<FormDataOTP>({
    resolver: yupResolver(otpSchema),
  });
  const verifyOTP = async ({ otp }: FormDataOTP) => {
    if (showOTP) {
      setLoading(true);
      const confirmationResult = showOTP;
      try {
        await confirmationResult.confirm(otp.toString());
      } catch (err) {
        toast.error("Invalid OTP");
        setLoading(false);
        return;
      }
      // redirect to broker list page
      push("/broker-list");
      setLoading(false);
    }
  };
  return (
    <motion.form
      onSubmit={handleSubmitOTP(verifyOTP)}
      key="form-otp"
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
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
      {errorsOTP.otp && <p className="small alert">{errorsOTP.otp?.message}</p>}
      <button type="submit" disabled={loading}>
        {loading && <span className="loader"></span>}
        Verify OTP
      </button>
    </motion.form>
  );
};

export default FormOTP;
