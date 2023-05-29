import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CiPause1 } from "react-icons/ci";
import { IoPlayOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { BrokerDetailType } from "../../../types/BrokerDetail";
import type { TokenGenType } from "../../../types/TokenGenType";
import { useCookies } from "react-cookie";

const TableStyled = styled.table`
  border-radius: 1rem;
  margin-bottom: 1rem;
  & th,
  td {
    overflow: hidden;
    padding: 1rem;
    text-align: center;
    border-radius: 0.25rem;
  }
  & th {
    color: rgb(var(--dark-color), 0.75);
    background-color: rgb(var(--dark-color), 0.25);
  }
  & td {
    &.action span {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.25rem;
      font-size: 1.25rem;
      user-select: none;
      & svg {
        cursor: pointer;
      }
    }
    &.token {
      & span {
        color: rgb(var(--danger-color));
        font-weight: 200;
        font-size: 0.9rem;
        cursor: pointer;
      }
    }
    & span {
      width: fit-content;
      color: rgb(var(--light-color));
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.8rem;
      &.active {
        background-color: rgb(var(--success-color));
      }
      &.inactive {
        background-color: rgb(var(--danger-color));
      }
    }
  }
  & tr {
    &:nth-child(even) {
      background-color: rgb(var(--dark-color), 0.05);
    }
    &:first-child th:first-child {
      border-radius: 1rem 0.25rem 0.25rem 0.25rem;
    }
    &:first-child th:last-child {
      border-radius: 0.25rem 1rem 0.25rem 0.25rem;
    }
    &:last-child td:first-child {
      border-radius: 0.25rem 0.25rem 0.25rem 1rem;
    }
    &:last-child td:last-child {
      border-radius: 0.25rem 0.25rem 1rem 0.25rem;
    }
  }
  @media screen and (width < 50rem) {
    & th {
      display: none;
    }
    & td {
      display: grid;
      grid-template-columns: 10ch 1fr;
      gap: 0.5rem;
      &::before {
        content: attr(data-cell) ": ";
      }
      &.action span {
        justify-content: unset;
      }
    }
    & th,
    td {
      text-align: left;
    }
  }
`;

const hideString = (str: string) =>
  `${str.substring(0, 2)}***${str.substring(str.length - 2)}`;

const BrokerTable = ({
  brokersDetails,
  setShowModal,
  play,
  setPlay,
  deleteBroker,
}: {
  brokersDetails: BrokerDetailType[];
  setShowModal: Dispatch<SetStateAction<TokenGenType | null>>;
  play: number | undefined;
  setPlay: Dispatch<SetStateAction<number | undefined>>;
  deleteBroker: (userID: string) => Promise<void>;
}) => {
  const GenerateToken = async ({
    index,
    userID,
    pan,
    venderCode,
    apiKey,
  }: TokenGenType & {
    pan: string;
  }) => {
    const requestOTP = axios.post(
      "https://shoonya.finvasia.com/NorenWClientWeb/FgtPwdOTP",
      "jData=" +
        JSON.stringify({
          uid: userID,
          pan: pan.toUpperCase(),
        })
    );
    toast.promise(requestOTP, {
      loading: "Loading...",
      success: () => {
        setShowModal({
          index,
          userID,
          venderCode,
          apiKey,
        });
        return "Token Generated Successfully";
      },
      error: () => {
        return "Something Went Wrong";
      },
    });
  };
  if (!!brokersDetails?.length) {
    return (
      <TableStyled className="container">
        <tbody>
          <tr role="rowheader">
            <th></th>
            <th>Broker</th>
            <th>Broker ID</th>
            <th>Name</th>
            <th>API Key</th>
            <th>Status</th>
            <th>Last Access Time</th>
            <th>Generate Token</th>
            <th>Action</th>
          </tr>
          {brokersDetails.map((brokerDetail, index) => (
            <Broker
              key={brokerDetail.userId}
              brokerDetails={brokerDetail}
              index={index}
              deleteBroker={deleteBroker}
              play={play}
              setPlay={setPlay}
              GenerateToken={GenerateToken}
            />
          ))}
        </tbody>
      </TableStyled>
    );
  } else {
    return (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "70vh",
          alignContent: "center",
        }}
      >
        <h2>No Broker Found!</h2>
        <p>Please Add New Broker</p>
      </div>
    );
  }
};

export default BrokerTable;

const Broker = ({
  brokerDetails,
  index,
  deleteBroker,
  play,
  setPlay,
  GenerateToken,
}: {
  brokerDetails: {
    apiKey: string;
    brokerName: string;
    lastAccessTime: string;
    userName: string;
    userId: string;
    pan: string;
    venderCode: string;
  };
  index: number;
  deleteBroker: (userID: string) => Promise<void>;
  play: number | undefined;
  setPlay: Dispatch<SetStateAction<number | undefined>>;
  GenerateToken: ({
    index,
    userID,
    pan,
    venderCode,
    apiKey,
  }: TokenGenType & {
    pan: string;
  }) => Promise<void>;
}) => {
  const {
    apiKey,
    brokerName,
    lastAccessTime,
    userName,
    userId: userID,
    pan,
    venderCode,
  }: {
    apiKey: string;
    brokerName: string;
    lastAccessTime: string;
    userName: string;
    userId: string;
    pan: string;
    venderCode: string;
  } = brokerDetails;
  const [isActive, setIsActive] = useState(false);
  const [cookies, , removeCookies] = useCookies();
  useEffect(() => {
    if (!!cookies?.[userID]) {
      setIsActive(true);
    }
  }, [cookies, userID]);
  return (
    <tr role="row">
      <td role="cell" data-cell="Serial No.">
        {index + 1}
      </td>
      <td role="cell" data-cell="Broker">
        {brokerName}
      </td>
      <td role="cell" data-cell="Broker ID">
        {hideString(userID)}
      </td>
      <td role="cell" data-cell="Name">
        {userName}
      </td>
      <td role="cell" data-cell="API Key">
        {hideString(apiKey)}
      </td>
      <td role="cell" data-cell="Status">
        <span className={`${isActive ? "active" : "inactive"}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td role="cell" data-cell="Last Access Time">
        {new Intl.DateTimeFormat("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
          .format(new Date(lastAccessTime))
          .replace(/\//g, ".")}
      </td>
      <td role="cell" data-cell="Generate Token" className="token">
        <span
          onClick={() =>
            GenerateToken({
              index,
              userID,
              pan,
              venderCode,
              apiKey,
            })
          }
        >
          Click to Generate Token
        </span>
      </td>
      <td role="cell" data-cell="Action" className="action">
        <span>
          {play !== index ? (
            <IoPlayOutline
              color="rgb(var(--success-color))"
              onClick={() => {
                if (isActive) {
                  setPlay(index);
                  sessionStorage.setItem("selectedBroker", userID);
                  return;
                }
                toast.error("Broker is Inactive");
              }}
            />
          ) : (
            <CiPause1
              color="rgb(var(--secondary-color))"
              onClick={() => {
                setPlay(undefined);
              }}
            />
          )}
          <RxCrossCircled
            color="rgb(var(--danger-color))"
            onClick={() => {
              deleteBroker(userID);
              removeCookies(userID);
            }}
          />
        </span>
      </td>
    </tr>
  );
};
