import { ReactElement } from "react";

const TokenGenerate = () => {
  return <h1>TokenGenerate</h1>;
};

export default TokenGenerate;

TokenGenerate.getLayout = function pageLayout(page: ReactElement) {
  return <>{page}</>;
};
