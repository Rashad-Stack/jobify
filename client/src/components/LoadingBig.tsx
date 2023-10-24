import styled from "styled-components";

type IWrapper = {
  height: number;
};

const Wrapper = styled.section<IWrapper>`
  width: 100%;
  height: ${(props) => props.height}vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;

  .loader {
    width: 45px;
    aspect-ratio: 0.75;
    --c: no-repeat linear-gradient(#000 0 0);
    background: var(--c) 0% 50%, var(--c) 50% 50%, var(--c) 100% 50%;
    background-size: 20% 50%;
    animation: l6 1s infinite linear;
  }
  @keyframes l6 {
    20% {
      background-position: 0% 0%, 50% 50%, 100% 50%;
    }
    40% {
      background-position: 0% 100%, 50% 0%, 100% 50%;
    }
    60% {
      background-position: 0% 50%, 50% 100%, 100% 0%;
    }
    80% {
      background-position: 0% 50%, 50% 50%, 100% 100%;
    }
  }
`;

interface LoadingBigProps {
  height: number;
}

export default function LoadingBig({ height }: LoadingBigProps) {
  return (
    <Wrapper height={height}>
      <div className="loader" />
    </Wrapper>
  );
}
