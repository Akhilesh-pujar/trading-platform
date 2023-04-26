import Hero from "@/components/home/Hero";
import Signup from "@/components/home/Signup";
import styled from "styled-components";
import sha256 from "crypto-js/sha256";
import axios from "axios";

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const index = () => {
  // "emsg":"Invalid Input :  uid or pwd or factor2 or imei or apkversion or vc or appkey or source is Missing."
  // {"stat":"Not_Ok","emsg":"Invalid Input :  Invalid App Key"}
  // Status: 200
  // Body:  {
  //   request_time: '00:41:58 27-04-2023',
  //   stat: 'Not_Ok',
  //   emsg: 'Invalid Input : Invalid OTP'
  // }
  const password = sha256("Shan@1234").toString();
  const userid = "FA97180";
  const apiSecret = "0d14c648394ca23897d46627fe7e08a8";
  const imei = "abc1234";
  const appKey = sha256(`${userid}|${apiSecret}`).toString();
  const data = {
    uid: userid,
    pwd: password,
    factor2: "01011970",
    vc: "FA97180_U",
    appkey: appKey,
    apkversion: "1.0.0",
    source: "API",
    imei,
  };

  const jData = "jData=" + JSON.stringify(data);
  console.log(jData);
  axios
    .post("https://api.shoonya.com/NorenWClientTP/QuickAuth/", jData)
    .then((res) => {
      console.log(`Status: ${res.status}`);
      console.log("Body: ", res.data);
    })
    .catch((err) => {
      console.error(err);
    });
  return (
    <Main className="container">
      <Signup />
      <Hero />
    </Main>
  );
};

export default index;
