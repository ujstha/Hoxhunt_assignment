import * as React from "react";
import styled from "styled-components";

interface LoaderProps {
  errorContent: string;
}

const StyledError = styled.div`
  display: flex;
  max-width: 100vw;
  min-height: 60vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 3em;
  font-family: "Montserrat", sans-serif;
  color: #001147;
  @media (max-width: 767px) {
    font-size: 1.8em;
  }
`;
const ErrorImage = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 50%;
`;

export const Error: React.FC<LoaderProps> = ({ errorContent }) => {
  return (
    <StyledError>
      {errorContent}
      <ErrorImage src="/public/error.png" />
    </StyledError>
  );
};
