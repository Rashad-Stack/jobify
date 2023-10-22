import styled from "styled-components";

const Loader = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  span {
    display: block;
    width: 20px;
    padding: 4px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #fff;
    --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;

    @keyframes l3 {
      to {
        transform: rotate(1turn);
      }
    }
  }
`;

interface LoaderProps {
  title: string;
}

export default function LoaderSmall({ title }: LoaderProps) {
  return (
    <Loader>
      <span /> {title}
    </Loader>
  );
}
