import TradeSkeleton from "@/components/skeleton/TradeSkeleton";
import axios from "axios";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

const Trade = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies();
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      let userID = sessionStorage?.getItem("selectedBroker");
      if (!userID) {
        toast.error("Please select a broker first");
        router.push("/broker-list");
        return;
      }
      const token = cookies?.[userID];
      const connectRequest = {
        t: "c",
        uid: userID,
        actid: userID,
        source: "API",
        susertoken: token,
      };
      const socket = new WebSocket(
        "wss://api.shoonya.com/NorenWSTP/PositionBook/"
      );
      socket.onopen = () => {
        socket.send(JSON.stringify(connectRequest));
      };
      socket.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        // const payload =
        //   "jData=" +
        //   JSON.stringify({
        //     uid: userID,
        //     actid: userID,
        //   }) +
        //   "&jKey=" +
        //   token;
        socket.send(
          JSON.stringify({
            t: "s",
          })
        );
        socket.send(
          JSON.stringify({
            t: "p",
          })
        );
        socket.send(
          JSON.stringify({
            t: "h",
          })
        );
        socket.send(
          JSON.stringify({
            t: "o",
          })
        );
        // await axios
        //   .post("https://api.shoonya.com/NorenWClientTP/PositionBook", payload)
        //   .then((res) => {
        //     console.log(res.data);
        //   });
      };
      socket.onclose = () => {
        console.log("Socket closed");
      };
      socket.onerror = (error) => {
        console.log("Socket error", error);
      };
      setToken(token);
      setLoading(false);
    }
  }, [cookies, cookies.userID, router, token]);
  if (loading) {
    return <TradeSkeleton />;
  }
  return (
    <h1>
      {sessionStorage?.getItem("selectedBroker")
        ? `User: ${sessionStorage?.getItem("selectedBroker")}`
        : "No user found"}
    </h1>
  );
};

export default Trade;

Trade.getLayout = function pageLayout(page: ReactElement) {
  return <>{page}</>;
};
