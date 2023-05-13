import { ReactElement } from "react";

const Token = () => {
  return <h1>Token</h1>;
};

export default Token;

Token.getLayout = function pageLayout(page: ReactElement) {
  return <>{page}</>;
};
