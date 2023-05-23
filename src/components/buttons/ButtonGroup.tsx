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
    border-top-left-radius: 5rem;
    border-bottom-left-radius: 5rem;
  }
  & > *:last-child {
    border-top-right-radius: 5rem;
    border-bottom-right-radius: 5rem;
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

const ButtonGroup = ({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) => {
  return (
    <ButtonGroupStyled
      repeat={Array.isArray(children) ? children.length : 0}
      className="button-group"
    >
      {children}
    </ButtonGroupStyled>
  );
};

export default ButtonGroup;
