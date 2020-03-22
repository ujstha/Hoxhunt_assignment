import * as React from "react";
import styled from "styled-components";

interface LoaderProps {
  loaderContent: string;
}

const StyledLoader = styled.div`
  display: flex;
  max-width: 100vw;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  color: #001147;
`;

const LoaderContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  margin-right: 0.4em;
  :after {
    content: " ";
    display: block;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 6px solid #e91e63;
    border-color: #e91e63 transparent #e91e63 transparent;
    animation: animate-loader 1.2s linear infinite;
  }
  @keyframes animate-loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader: React.FC<LoaderProps> = ({ loaderContent }) => {
  return (
    <StyledLoader>
      <LoaderContainer />
      {loaderContent}
    </StyledLoader>
  );
};
