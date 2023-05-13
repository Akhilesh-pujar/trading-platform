import BrokerTable from "@/components/broker/BrokerTable";
import { collection } from "firebase/firestore";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrokerDetail } from "../../../BrokerDetail";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import BrokerListSkeleton from "@/components/skeleton/BrokerListSkeleton";

const BrokerListStyled = styled.div`
  color: rgb(var(--dark-color), 0.5);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

const BrokerList = () => {
  const [user, loading, error] = useAuthState(auth);
  const [users, , usersError] = useCollection(collection(db, "users"));
  const brokers: BrokerDetail[] = users?.docs
    .map((doc) => doc.data())
    .find((userFirestore) => userFirestore.uid === user?.uid)?.brokers;
  const router = useRouter();
  useEffect(() => {
    if (!loading && (!user?.uid || error)) {
      if (error) {
        toast.error("Something Went Wrong");
      }
      router.push("/");
      return;
    }
  }, [error, loading, router, user]);
  if (!!loading || (!brokers?.length && !usersError)) {
    return <BrokerListSkeleton />;
  } else if (!!user?.uid && !!brokers?.length) {
    return (
      <BrokerListStyled>
        <BrokerListTop brokersExist={!!brokers?.length} />
        <BrokerTable brokersDetails={brokers} />
      </BrokerListStyled>
    );
  }
};

export default BrokerList;

const BrokerListTopStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  & :where(a, button) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    padding: 0.75rem 1.25rem;
    border-radius: 5rem;
    background-color: rgb(var(--primary-color));
    color: rgb(var(--light-color));
    &[aria-disabled="true"] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const BrokerListTop = ({ brokersExist }: { brokersExist: boolean }) => {
  const [loading, setLoading] = useState(false);
  return (
    <BrokerListTopStyled className="container">
      <Link
        href="/broker-list/add"
        onClick={() => setLoading(true)}
        aria-disabled={loading}
      >
        {!!loading && <span className="loader" />} Add Broker
      </Link>
      {brokersExist && (
        <button onClick={() => window.open("/trade", "", "popup")}>
          Open 1 Cliq Trade Window
        </button>
      )}
    </BrokerListTopStyled>
  );
};

BrokerList.getLayout = function pageLayout(page: ReactElement) {
  return <>{page}</>;
};
