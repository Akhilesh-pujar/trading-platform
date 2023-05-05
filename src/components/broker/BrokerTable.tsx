import { BrokerDetail } from "../../../BrokerDetail";

const BrokerTable = ({ brokerDetails }: { brokerDetails: BrokerDetail[] }) => {
  console.log(brokerDetails);
  return (
    <table>
      <tbody>
        <tr>
          <th>Broker Name</th>
          <th>User Name</th>
          <th>User Id</th>
          <th>Branch Id</th>
          <th>Email</th>
          <th>Last Access Time</th>
          <th>Request Time</th>
          <th>Vendor Code</th>
          <th>API Key</th>
          <th>PAN</th>
        </tr>
        {brokerDetails?.map(
          ({
            apiKey,
            branchId,
            brokerName,
            email,
            lastAccessTime,
            pan,
            requestTime,
            userName,
            venderCode,
            userId,
          }) => (
            <tr key={userId}>
              <td>{brokerName}</td>
              <td>{userName}</td>
              <td>{userId}</td>
              <td>{branchId}</td>
              <td>{email}</td>
              <td>{lastAccessTime}</td>
              <td>{requestTime}</td>
              <td>{apiKey}</td>
              <td>{venderCode}</td>
              <td>{pan}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default BrokerTable;
