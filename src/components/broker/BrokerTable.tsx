import styled from "styled-components";
import { BrokerDetail } from "../../../BrokerDetail";
import { RxCrossCircled } from "react-icons/rx";
import { IoPlayOutline } from "react-icons/io5";
import Link from "next/link";

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
    &.action {
      font-size: 1.25rem;
    }
    &.token {
      & a {
        color: rgb(var(--danger-color));
        font-weight: 200;
        font-size: 0.9rem;
      }
    }
    & span {
      &.success {
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
  brokersDetails: BrokerDetail[];
}) => {
  if (!!brokersDetails?.length) {
    return (
      <TableStyled className="container">
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
            brokersDetails?.map(
              ({ apiKey, brokerName, lastAccessTime, userName, userId }) => (
                <tr key={userId} role="row">
                  <td role="cell" data-cell="Serial No.">
                    {index + 1}
                  </td>
                  <td role="cell" data-cell="Broker">
                    {brokerName}
                  </td>
                  <td role="cell" data-cell="Broker ID">
                    {userId.substring(0, 2)}***
                    {userId.substring(userId.length - 2)}
                  </td>
                  <td role="cell" data-cell="Name">
                    {userName}
                  </td>
                  <td role="cell" data-cell="API Key">
                    {apiKey.substring(0, 2)}***
                    {apiKey.substring(apiKey.length - 2)}
                  </td>
                  <td role="cell" data-cell="Status">
                    <span className="success">Active</span>
                  </td>
                  <td role="cell" data-cell="Last Access Time">
                    {new Date(lastAccessTime).toLocaleString().toUpperCase()}
                  </td>
                  <td role="cell" data-cell="Generate Token" className="token">
                    <Link href="/tokengenerate">Click to Generate Token</Link>
                  </td>
                  <td role="cell" data-cell="Action" className="action">
                    <IoPlayOutline color="rgb(var(--success-color))" />
                    <RxCrossCircled color="rgb(var(--danger-color))" />
                  </td>
                </tr>
              )
            )
          )}
      </TableStyled>
    );
  } else {
    return (
      <>
        <h2>No Broker Found!</h2>
        <p>Please Add New Broker</p>
      </>
    );
  }
};

export default BrokerTable;
