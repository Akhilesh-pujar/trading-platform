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
  & .MuiSkeleton-root {
    background-color: rgb(0 0 0 / 7%);
  }
`;

const TradeSkeleton = () => {
  return (
    <SkeletonStyled>
      <div className="container">
        <Skeleton
          variant="rounded"
          animation="wave"
          width={"100%"}
          height={"40vh"}
          sx={{ borderRadius: "0.5rem" }}
        />
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              animation="wave"
              width={"100%"}
              height={"5rem"}
              sx={{ borderRadius: "0.5rem" }}
            />
          ))}
      </div>
    </SkeletonStyled>
  );
};

export default TradeSkeleton;
