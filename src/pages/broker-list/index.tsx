import BrokerTable from "@/components/broker/BrokerTable";
import { collection, doc, query, where } from "firebase/firestore";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrokerDetailType } from "../../../types/BrokerDetail";
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

// const BrokerList = () => {
//   const [user, loading, error] = useAuthState(auth);
//   const userRef = user ? doc(db, "users", user.uid) : null;
//   const [userDoc, userDocLoading, userDocError] = useDocument(userRef);

//   const brokers: BrokerDetailType[] = userDoc?.data()?.brokers;

//   const router = useRouter();

//   useEffect(() => {
//     if (userDocError) {
//       toast.error("Something went wrong");
//       router.push("/");
//       return;
//     }
//   }, [user, userDoc, userDocLoading, userDocError, router]);

//   // Render your component based on the loading and error states

//   if (!!loading || !!usersError || !!usersLoading) {
//     return <BrokerListSkeleton />;
//   }
//   return (
//     <BrokerListStyled>
//       <BrokerListTop brokersExist={!!brokers} />
//       <BrokerTable brokersDetails={brokers} />
//     </BrokerListStyled>
//   );
// };

const BrokerList = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !userLoading) {
      router.push("/");
    }
  }, [user, userLoading, router]);

  const userQuery = user
    ? query(collection(db, "users"), where("uid", "==", user.uid))
    : null;
  const [userDocs, loading, error] = useCollection(userQuery);

  useEffect(() => {
    if (!!error || !!userError) {
      toast.error("Something went wrong");
      router.push("/");
      return;
    }
  }, [error, userError, router]);

  const brokers = userDocs?.docs[0]?.data()?.brokers ?? [];

  if (loading || !userDocs) {
    return <BrokerListSkeleton />;
  }

  return (
    <BrokerListStyled>
      <BrokerListTop brokersExist={brokers.length > 0} />
      <BrokerTable brokersDetails={brokers} />
    </BrokerListStyled>
  );
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
