import { Skeleton } from "@mui/material";
import styled from "styled-components";

const SkeletonStyled = styled.div`
  position: fixed;
  inset: 0;
  & .container {
    padding-block: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
  }
  & .topper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  & .MuiSkeleton-root {
    background-color: rgb(0 0 0 / 7%);
  }
`;

const BrokerListSkeleton = () => {
  return (
    <SkeletonStyled>
      <div className="container">
        <div className="topper">
          <Skeleton
            variant="rounded"
            animation="wave"
            width={"8rem"}
            height={"2.75rem"}
            sx={{ borderRadius: "5rem" }}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            width={"8rem"}
            height={"2.75rem"}
            sx={{ borderRadius: "5rem" }}
          />
        </div>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              animation="wave"
              width={"100%"}
              height={"4rem"}
              sx={{ borderRadius: "0.5rem" }}
            />
          ))}
      </div>
    </SkeletonStyled>
  );
};

export default BrokerListSkeleton;
