import { Skeleton } from "@mui/material";

const HeaderSkeleton = () => (
  <Skeleton
    variant="rounded"
    animation="wave"
    width={"7rem"}
    height={"2rem"}
    sx={{ borderRadius: "5rem" }}
  />
);

export default HeaderSkeleton;
