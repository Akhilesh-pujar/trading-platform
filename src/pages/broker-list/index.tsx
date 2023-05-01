import Link from "next/link";
import styled from "styled-components";

const BrokerList = styled.div`
  color: rgb(var(--dark-color), 0.5);
  min-height: 100vh;
  margin-block-start: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  & a {
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    border: none;
    background-color: rgb(var(--primary-color));
    color: rgb(var(--light-color));
    font-size: 1.25rem;
    font-weight: 500;
  }
`;

const index = () => {
  return (
    <BrokerList>
      <Link href={"/broker-list/add"}>Add Broker</Link>
    </BrokerList>
  );
};

export default index;
