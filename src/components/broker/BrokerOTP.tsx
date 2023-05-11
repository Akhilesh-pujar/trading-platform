import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, number, object } from "yup";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { SHA256 } from "crypto-js";
import axios from "axios";
// import { authenticator } from "otplib";
import { toast } from "react-hot-toast";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

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
  // get the user details from firebase
  const [user] = useAuthState(auth);
  const [users] = useCollection(collection(db, "users"));
  const {
    register: registerOTP,
    handleSubmit: handleSubmitOTP,
    formState: { errors: errorsOTP },
  } = useForm<FormDataOTP>({
    resolver: yupResolver(otpSchema),
  });
  const verifyOTP = async ({ otp }: FormDataOTP) => {
    // const password = sha256("Shan@1234").toString();
    // const userid = "FA97180";
    // const apiSecret = "0d14c648394ca23897d46627fe7e08a8";
    const {
      pan,
      userid,
      password,
      venderCode,
      apiKey,
    }: {
      pan: string;
      userid: string;
      password: string;
      venderCode: string;
      apiKey: string;
    } = JSON.parse(localStorage.getItem("broker") || "{}");
    // const secret = "2SKOG3TLZR4ZE7U4NKS2677X4KJ54W3D";
    // const totp = authenticator.generate(secret);
    const appKey = SHA256(`${userid}|${apiKey}`).toString();
    const imei = "abc1234";
    const data = {
      uid: userid,
      pwd: password,
      // factor2: totp,
      factor2: otp,
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
        await addDoc(collection(db, "users"), {
          uid: user?.uid,
          brokers: [
            {
              brokerName: brkname,
              email,
              lastAccessTime: new Date().getTime(),
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
        push("/broker-list");
      })
      .catch((err) => {
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
      <div className="buttons">
        <button type="submit">Verify OTP</button>
        <Link href="/broker-list">Cancel</Link>
      </div>
    </motion.form>
  );
};

export default BrokerOTP;
