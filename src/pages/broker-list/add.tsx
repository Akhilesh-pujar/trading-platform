import styled from "styled-components";

const AddBroker = styled.div`
  color: rgb(var(--dark-color), 0.5);
  min-height: 100vh;
  margin-block-start: 5rem;
  display: flex;
  justify-content: center;
`;

const add = () => {
  return <AddBroker>Add Broker</AddBroker>;
};

export default add;
