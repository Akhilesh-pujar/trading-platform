import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { SHA256 } from "crypto-js";
import axios from "axios";
import { BrokerType } from "./../../../types/Broker";
import ButtonGroup from "./../buttons/ButtonGroup";
import { BsChevronLeft } from "react-icons/bs";

const brokerSchema = object({
  userid: string()
    .test(
      "len",
      "Must be exactly 7 digits",
      (val) => val?.toString().length === 7
    )
    .typeError("User ID must be exactly 7 digits")
    .required(),
  pan: string().required("Pan Number is required"),
  password: string().required("Password is required"),
  venderCode: string().required("Vender Code is required"),
  apiKey: string().required("API Key is required"),
});

const container = {
  hidden: { opacity: 0, x: "-100vw" },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "100vw" },
};

const BrokerDetails = ({
  setShowOTP,
  setBroker,
}: {
  setShowOTP: Dispatch<SetStateAction<boolean>>;
  setBroker: Dispatch<SetStateAction<BrokerType>>;
}) => {
  const {
    register: registerBroker,
    handleSubmit: handleSubmitBroker,
    formState: { errors: errorsBroker },
  } = useForm<BrokerType>({
    resolver: yupResolver(brokerSchema),
  });
  const sendOTP = async ({
    userid,
    apiKey,
    pan,
    password,
    venderCode,
  }: BrokerType) => {
    setShowOTP(true);
    // let encryptedData = {
    //   userid: userid,
    //   pan: pan,
    //   password: SHA256(password).toString(),
    //   venderCode: venderCode,
    //   apiKey: apiKey,
    // };
    // localStorage.setItem("broker", JSON.stringify(encryptedData));
    await axios
      .post(
        "https://shoonya.finvasia.com/NorenWClientWeb/FgtPwdOTP",
        "jData=" + JSON.stringify({ uid: userid, pan: pan.toUpperCase() })
      )
      .then(({ data }) => {
        let encryptedData = {
          userid: userid,
          pan: pan,
          password: SHA256(password).toString(),
          venderCode: venderCode,
          apiKey: apiKey,
        };
        // localStorage.setItem("broker", JSON.stringify(encryptedData));
        setBroker(encryptedData);
        toast.success("OTP sent successfully");
        console.log(data);
        setShowOTP(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went Wrong");
      });
  };
  return (
    <motion.form
      onSubmit={handleSubmitBroker(sendOTP)}
      key="form-details-add-broker"
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Link href="/broker-list" data-back>
        <BsChevronLeft />
        <span>Back</span>
      </Link>
      <div className="content">
        <div className="form-top">
          <h2>Add Broker</h2>
        </div>
        <div className="input-group">
          <input
            type="text"
            id="userid"
            {...registerBroker("userid")}
            required
          />
          <label htmlFor="userid">User ID</label>
          <p className="error">{errorsBroker?.userid?.message}</p>
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
            autoComplete="on"
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
          <input
            type="text"
            id="apiKey"
            {...registerBroker("apiKey")}
            required
          />
          <label htmlFor="apiKey">API Key</label>
          <p className="error">{errorsBroker.apiKey?.message}</p>
        </div>
      </div>
      <ButtonGroup>
        <button type="submit">Get OTP</button>
      </ButtonGroup>
    </motion.form>
  );
};

export default BrokerDetails;
