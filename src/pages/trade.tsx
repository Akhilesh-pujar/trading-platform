import { ReactElement } from "react";

const Trade = () => {
  return <h1>Trade</h1>;
};

export default Trade;

Trade.getLayout = function pageLayout(page: ReactElement) {
  return <>{page}</>;
};
