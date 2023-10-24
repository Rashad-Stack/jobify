import styled from "styled-components";
import { CustomError } from "../types";

type IWrapper = {
  height: number;
};

const Wrapper = styled.div<IWrapper>`
  width: 100%;
  height: ${(props) => props.height}vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  div {
    &:first-of-type {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      width: 100px;
      padding: 1rem 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &:last-of-type {
      max-width: 300px;
      h1 {
        color: var(--red-dark);
        font-size: 18px;
      }
    }
  }
`;

interface ErrorMsgProps {
  height: number;
  msg?: string;
  error?: CustomError;
}

export default function ErrorMsg({ height, msg, error }: ErrorMsgProps) {
  return (
    <Wrapper height={20}>
      <div>
        <img
          src="/undraw_blank_canvas_re_2hwy.svg"
          alt="Something went wrong!"
        />
      </div>
      <div>
        {msg && <h1>{msg}</h1>}
        {error && (
          <h1>
            {error.data?.message?.toString() ||
              error?.error?.message?.toString() ||
              "Something went wrong!"}
          </h1>
        )}
      </div>
    </Wrapper>
  );
}
