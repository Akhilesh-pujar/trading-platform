import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, number, object } from "yup";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { SHA256 } from "crypto-js";
import axios, { AxiosError } from "axios";
// import { authenticator } from "otplib";
import { toast } from "react-hot-toast";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { BrokerType } from "../../../types/Broker";
import { Dispatch, SetStateAction } from "react";
import ButtonGroup from "../buttons/ButtonGroup";
import { useCollection } from "react-firebase-hooks/firestore";

const otpSchema = object({
  // otp is only number and length is 5
  otp: number()
    .required()
    .typeError("OTP is required")
    .test({
      name: "len",
      message: "OTP must be exactly 5 digits",
      test: (val) => val?.toString().length === 5,
    }),
});

type FormDataOTP = InferType<typeof otpSchema>;

const container = {
  hidden: { opacity: 0, x: "-100vw" },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "100vw" },
};

const BrokerOTP = ({
  broker,
  setShowOTP,
}: {
  broker: BrokerType;
  setShowOTP: Dispatch<SetStateAction<boolean>>;
}) => {
  const { push } = useRouter();
  const [user] = useAuthState(auth);
  const {
    register: registerOTP,
    handleSubmit: handleSubmitOTP,
    formState: { errors: errorsOTP },
  } = useForm<FormDataOTP>({
    resolver: yupResolver(otpSchema),
  });
  const userQuery = query(
    collection(db, "users"),
    where("uid", "==", user?.uid)
  );
  const [userDocs, loading, error] = useCollection(userQuery);
  const verifyOTP = async ({ otp }: FormDataOTP) => {
    // const password = sha256("Shan@1234").toString();
    // const userid = "FA97180";
    // const apiSecret = "0d14c648394ca23897d46627fe7e08a8";
    // const secret = "2SKOG3TLZR4ZE7U4NKS2677X4KJ54W3D";
    // const totp = authenticator.generate(secret);
    const { pan, userid, password, venderCode, apiKey }: BrokerType = broker;
    const appKey = SHA256(`${userid}|${apiKey}`).toString();
    const imei = "abc1234";
    const data = {
      uid: userid,
      pwd: password,
      // factor2: totp,
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
      .then(async ({ data: { brkname, email, uname, uid, brnchid } }) => {
        toast.success("OTP Verified");
        if (loading) {
          console.log(loading);
          toast.loading("Loading...");
        }
        if (error) {
          console.log(error);
          toast.dismiss();
          toast.error("Something went wrong");
        }
        if (!userDocs?.docs?.length) {
          toast.dismiss();
          // user document doesn't exist, create a new one
          const userDocRef = await addDoc(collection(db, "users"), {
            uid: user?.uid,
            brokers: [
              {
                brokerName: brkname,
                email,
                lastAccessTime: serverTimestamp(),
                userName: uname,
                userId: uid,
                branchId: brnchid,
                password,
                venderCode,
                apiKey,
                pan,
              },
            ],
          });
        } else {
          toast.dismiss();
          // user document exists, update the brokers array using arrayUnion
          const userDoc = userDocs.docs[0];
          await updateDoc(userDoc.ref, {
            brokers: arrayUnion({
              brokerName: brkname,
              email,
              lastAccessTime: serverTimestamp(),
              userName: uname,
              userId: uid,
              branchId: brnchid,
              venderCode,
              apiKey,
              pan,
            }),
          });
        }
        push("/broker-list");
      })
      .catch((err: AxiosError) => {
        console.error(err);
        toast.error("Invalid OTP");
      });
  };
  return (
    <motion.form
      onSubmit={handleSubmitOTP(verifyOTP)}
      key="form-otp-add-broker"
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
      {/* <div className="buttons">
        <button type="submit">Verify OTP</button>
        <button type="button" onClick={() => setShowOTP(false)}>
          Cancel
        </button>
      </div> */}
      <ButtonGroup>
        <button type="submit">Verify OTP</button>
        <button type="button" onClick={() => setShowOTP(false)}>
          Cancel
        </button>
      </ButtonGroup>
    </motion.form>
  );
};

export default BrokerOTP;
