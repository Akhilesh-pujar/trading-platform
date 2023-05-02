import { GetServerSideProps } from "next";
import Link from "next/link";
import { ReactElement } from "react";
import styled from "styled-components";

const BrokerListStyled = styled.div`
  color: rgb(var(--dark-color), 0.5);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`;

const BrokerList = () => {
  return (
    <BrokerListStyled>
      <BrokerListTop />
    </BrokerListStyled>
  );
};

export default BrokerList;

const BrokerListTopStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1rem;
  & a {
    display: inline-block;
    padding: 0.75rem 1.25rem;
    border-radius: 5rem;
    background-color: rgb(var(--primary-color));
    color: rgb(var(--light-color));
  }
`;

const BrokerListTop = () => {
  return (
    <BrokerListTopStyled className="container">
      <Link href="/broker-list/add">Add Broker</Link>
      <Link href="/trade">Open 1 Cliq Trade Window</Link>
    </BrokerListTopStyled>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log(req.cookies);
  return !Object.keys(req.cookies).length
    ? { redirect: { destination: "/", permanent: false } }
    : { props: {} };
};

BrokerList.getLayout = function pageLayout(page: ReactElement) {
  return <>{page}</>;
};
