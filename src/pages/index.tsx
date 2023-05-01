import Hero from "@/components/home/Hero";
import Signup from "@/components/home/Signup";
import styled from "styled-components";
// import sha256 from "crypto-js/sha256";
// import axios from "axios";
// import { authenticator } from "otplib";

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  // const secret = "2SKOG3TLZR4ZE7U4NKS2677X4KJ54W3D";
  // const password = sha256("Shan@1234").toString();
  // const userid = "FA97180";
  // const apiSecret = "0d14c648394ca23897d46627fe7e08a8";
  // const imei = "abc1234";
  // const appKey = sha256(`${userid}|${apiSecret}`).toString();
  // const totp = authenticator.generate(secret);
  // const jData = "jData=" + JSON.stringify(data);
  // console.log({ ...data });
  // const data = {
  //   uid: userid,
  //   pwd: password,
  //   factor2: "16253",
  //   vc: "FA97180_U",
  //   appkey: appKey,
  //   apkversion: "1.0.0",
  //   source: "API",
  //   imei,
  // };
  // const jData = "jData=" + JSON.stringify(data);
  // axios
  //   .post("https://api.shoonya.com/NorenWClientTP/QuickAuth/", jData)
  //   .then(({ data }) => {
  //     console.log(data);
  //     let payload =
  //       "jData=" + JSON.stringify({ uid: data.uid, actid: data.actid });
  //     payload = payload + "&jKey=" + data.susertoken;
  //     axios
  //       .post("https://api.shoonya.com/NorenWClientTP/Limits/", payload)
  //       .then(({ data }) => {
  //         console.log(data);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  return (
    <Main className="container">
      <Signup />
      <Hero />
    </Main>
  );
};

export default Home;
