import BrokerTable from "@/components/broker/BrokerTable";
import { collection } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ReactElement } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrokerDetail } from "../../../BrokerDetail";

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
  const [user] = useAuthState(auth);
  const [users] = useCollection(collection(db, "users"));
  const brokers: BrokerDetail[] = users?.docs
    .map((doc) => doc.data())
    .find((userFirestore) => userFirestore.uid === user?.uid)?.brokers;
  return (
    <BrokerListStyled>
      <BrokerListTop brokersExist={!!brokers?.length} />
      <BrokerTable brokersDetails={brokers} />
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

const BrokerListTop = ({ brokersExist }: { brokersExist: boolean }) => {
  return (
    <BrokerListTopStyled className="container">
      <Link href="/broker-list/add">Add Broker</Link>
      {brokersExist && <Link href="/trade">Open 1 Cliq Trade Window</Link>}
    </BrokerListTopStyled>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return { props: {} };
};

BrokerList.getLayout = function pageLayout(page: ReactElement) {
  return <>{page}</>;
};
