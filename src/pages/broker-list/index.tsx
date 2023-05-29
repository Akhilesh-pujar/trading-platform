import BrokerTable from "@/components/broker/BrokerTable";
import {
  DocumentData,
  Query,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import type { BrokerDetailType } from "../../../types/BrokerDetail";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import BrokerListSkeleton from "@/components/skeleton/BrokerListSkeleton";
import ModalOTP from "@/components/broker/ModalOTP";
import type { TokenGenType } from "../../../types/TokenGenType";

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
  const [user, userLoading, userError] = useAuthState(auth);
  const [showModal, setShowModal] = useState<TokenGenType | null>(null);
  const [play, setPlay] = useState<number | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!user && !userLoading) {
      router.push("/");
    }
  }, [user, userLoading, router]);

  const userQuery: Query<DocumentData> | null = !!user
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

  const brokers: BrokerDetailType[] =
    userDocs?.docs[0]
      ?.data()
      ?.brokers.sort((a: BrokerDetailType, b: BrokerDetailType) => {
        if (a.lastAccessTime < b.lastAccessTime) return 1;
        if (a.lastAccessTime > b.lastAccessTime) return -1;
        return 0;
      }) ?? [];

  const deleteBroker = async (userID: string) => {
    // Delete broker from firestore using react-firebase-hooks
    try {
      const userDocSnapshot = await getDocs(collection(db, "users"));
      if (userDocSnapshot.empty) {
        toast.error("User document not found");
        return;
      }
      const brokers = userDocSnapshot.docs[0].data().brokers;
      const updatedBrokers = brokers.filter(
        (brokerDetail: BrokerDetailType) => brokerDetail.userId !== userID
      );
      await updateDoc(userDocSnapshot.docs[0].ref, {
        brokers: updatedBrokers,
      });
      toast.success("Broker deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading || !userDocs) {
    return <BrokerListSkeleton />;
  }

  return (
    <BrokerListStyled>
      {showModal && (
        <ModalOTP showModal={showModal} setShowModal={setShowModal} />
      )}
      <BrokerListTop brokersExist={brokers.length > 0} play={play} />
      <BrokerTable
        brokersDetails={brokers}
        setShowModal={setShowModal}
        play={play}
        setPlay={setPlay}
        deleteBroker={deleteBroker}
      />
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

const BrokerListTop = ({
  brokersExist,
  play,
}: {
  brokersExist: boolean;
  play: number | undefined;
}) => {
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
        <button
          onClick={() => {
            if (!!play) {
              window.open("/trade", "", "popup");
              return;
            }
            toast.error("Please select a broker to open trade window");
          }}
        >
          Open 1 Cliq Trade Window
        </button>
      )}
    </BrokerListTopStyled>
  );
};

BrokerList.getLayout = function pageLayout(page: ReactElement) {
  return <>{page}</>;
};
