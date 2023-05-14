import styled from "styled-components";
import { BrokerDetailType } from "../../../types/BrokerDetail";
import { RxCrossCircled } from "react-icons/rx";
import { IoPlayOutline } from "react-icons/io5";
import { CiPause1 } from "react-icons/ci";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";

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
      &.success {
        width: fit-content;
        background-color: rgb(var(--success-color));
        color: rgb(var(--light-color));
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.8rem;
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

const BrokerTable = ({
  brokersDetails,
}: {
  brokersDetails: BrokerDetailType[];
}) => {
  const router = useRouter();
  const hideString = (str: string) =>
    `${str.substring(0, 2)}***${str.substring(str.length - 2)}`;
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
          {Array(20)
            .fill(0)
            .map((_, index) =>
              brokersDetails.map(
                ({
                  apiKey,
                  brokerName,
                  lastAccessTime,
                  userName,
                  userId,
                  pan,
                }) => (
                  <tr key={index} role="row">
                    <td role="cell" data-cell="Serial No.">
                      {index + 1}
                    </td>
                    <td role="cell" data-cell="Broker">
                      {brokerName}
                    </td>
                    <td role="cell" data-cell="Broker ID">
                      {hideString(userId)}
                    </td>
                    <td role="cell" data-cell="Name">
                      {userName}
                    </td>
                    <td role="cell" data-cell="API Key">
                      {hideString(apiKey)}
                    </td>
                    <td role="cell" data-cell="Status">
                      <span className="success">Active</span>
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
                    <td
                      role="cell"
                      data-cell="Generate Token"
                      className="token"
                    >
                      <span
                        onClick={async () => {
                          const requestOTP = axios.post(
                            "https://shoonya.finvasia.com/NorenWClientWeb/FgtPwdOTP/somethingWrong",
                            "jData=" +
                              JSON.stringify({
                                uid: userId,
                                pan: pan.toUpperCase(),
                              })
                          );
                          toast.promise(requestOTP, {
                            loading: "Loading...",
                            success: () => {
                              router.push("/broker-list/token");
                              return "Token Generated Successfully";
                            },
                            error: (error: AxiosError) => {
                              console.log(error);
                              router.push("/broker-list");
                              return "Something Went Wrong";
                            },
                          });
                        }}
                      >
                        Click to Generate Token
                      </span>
                    </td>
                    <td role="cell" data-cell="Action" className="action">
                      <Action />
                    </td>
                  </tr>
                )
              )
            )}
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

const Action = () => {
  const [play, setPlay] = useState(false);
  return (
    <span>
      {!play ? (
        <IoPlayOutline
          color="rgb(var(--success-color))"
          onClick={() => setPlay(true)}
        />
      ) : (
        <CiPause1
          color="rgb(var(--secondary-color))"
          onClick={() => setPlay(false)}
        />
      )}
      <RxCrossCircled color="rgb(var(--danger-color))" />
    </span>
  );
};
