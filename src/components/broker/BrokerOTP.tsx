import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, number, object } from "yup";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

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

const BrokerOTP = () => {
  const { push } = useRouter();
  const {
    register: registerOTP,
    handleSubmit: handleSubmitOTP,
    formState: { errors: errorsOTP },
  } = useForm<FormDataOTP>({
    resolver: yupResolver(otpSchema),
  });
  const verifyOTP = (data: FormDataOTP) => {
    console.log(data);
    push("/broker-list");
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
      <div className="input-group">
        <input type="text" id="otp" {...registerOTP("otp")} required />
        <label htmlFor="otp">OTP</label>
        <p className="error">{errorsOTP.otp?.message}</p>
      </div>
      <div className="buttons">
        <button type="submit">Verify OTP</button>
        <Link href="/broker-list">Cancel</Link>
      </div>
    </motion.form>
  );
};

export default BrokerOTP;
