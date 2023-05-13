import styled from "styled-components";

const ButtonGroupStyled = styled.div<{
  repeat: number;
}>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.repeat}, 1fr);
  overflow: hidden;
  & :where(button, a) {
    text-align: center;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  & > *:first-child {
    border-radius: 5rem 0 0 5rem;
  }
  & > *:last-child {
    border-radius: 0 5rem 5rem 0;
  }
  & button {
    background-color: rgb(var(--primary-color));
    color: rgb(var(--light-color));
    transition: 0.15s;
    &:hover {
      background-color: rgb(var(--primary-color), 0.75);
    }
  }
  & a {
    border: 1px solid rgb(var(--danger-color));
    &:not(:first-child) {
      border-left: none;
    }
    color: rgb(var(--danger-color));
    transition: 0.15s;
    &:hover {
      color: rgb(var(--light-color));
      border-color: rgb(var(--danger-color), 0.75);
      background-color: rgb(var(--danger-color), 0.75);
    }
  }
`;

const ButtonGroup = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <ButtonGroupStyled repeat={children.length}>{children}</ButtonGroupStyled>
  );
};

export default ButtonGroup;
