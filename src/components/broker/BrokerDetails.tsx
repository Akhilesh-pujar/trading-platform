import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, object, string } from "yup";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const brokerSchema = object({
  userid: string()
    .required()
    .min(6)
    .max(6)
    .test({
      name: "required",
      message: "User ID is required",
      test: (val) => val?.toString().length === 6,
    }),
  pan: string()
    .required()
    .test({
      name: "required",
      message: "Password is required",
      test: (val) => val?.toString().length > 0,
    }),
  password: string()
    .required()
    .test({
      name: "required",
      message: "Password is required",
      test: (val) => val?.toString().length > 0,
    }),
  venderCode: string()
    .required()
    .test({
      name: "required",
      message: "Vender Code is required",
      test: (val) => val?.toString().length > 0,
    }),
  apiKey: string()
    .required()
    .test({
      name: "required",
      message: "API Key is required",
      test: (val) => val?.toString().length > 0,
    }),
});

type FormDataBroker = InferType<typeof brokerSchema>;

const container = {
  hidden: { opacity: 0, x: "-100vw" },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "100vw" },
};

const BrokerDetails = ({
  setShowOTP,
}: {
  setShowOTP: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register: registerBroker,
    handleSubmit: handleSubmitBroker,
    formState: { errors: errorsBroker },
  } = useForm<FormDataBroker>({
    resolver: yupResolver(brokerSchema),
  });
  const sendOTP = async (data: FormDataBroker) => {
    console.log(data);
    toast.success("OTP sent successfully");
    setShowOTP(true);
  };
  return (
    <motion.form
      onSubmit={handleSubmitBroker(sendOTP)}
      key="form-otp"
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="form-top">
        <h2>Add Broker</h2>
      </div>
      <div className="input-group">
        <input type="text" id="userid" {...registerBroker("userid")} required />
        <label htmlFor="userid">User ID</label>
        <p className="error">{errorsBroker.userid?.message}</p>
      </div>
      <div className="input-group">
        <input type="text" id="pan" {...registerBroker("pan")} required />
        <label htmlFor="pan">Pan Number</label>
        <p className="error">{errorsBroker.pan?.message}</p>
      </div>
      <div className="input-group">
        <input
          type="password"
          id="password"
          {...registerBroker("password")}
          required
        />
        <label htmlFor="password">Password</label>
        <p className="error">{errorsBroker.password?.message}</p>
      </div>
      <div className="input-group">
        <input
          type="text"
          id="venderCode"
          {...registerBroker("venderCode")}
          required
        />
        <label htmlFor="venderCode">Vender Code</label>
        <p className="error">{errorsBroker.venderCode?.message}</p>
      </div>
      <div className="input-group">
        <input type="text" id="apiKey" {...registerBroker("apiKey")} required />
        <label htmlFor="apiKey">API Key</label>
        <p className="error">{errorsBroker.apiKey?.message}</p>
      </div>
      <div className="buttons">
        <button type="submit">Get OTP</button>
        <Link href="/broker-list">Cancel</Link>
      </div>
    </motion.form>
  );
};

export default BrokerDetails;
