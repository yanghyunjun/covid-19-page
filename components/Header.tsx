import React from "react";
import styled from "styled-components";
import { NextPage } from "next";

const Container = styled.div`
  width: 100%;
  height: 768px;
  background: linear-gradient(
    270deg,
    #cc3e2f,
    #adcc2f,
    #2fcc8f,
    #2f71cc,
    #712fcc
  );
  background-size: 1000% 1000%;

  -webkit-animation: gradient 6s ease infinite;
  -moz-animation: gradient 6s ease infinite;
  animation: gradient 6s ease infinite;

  @-webkit-keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Header: NextPage = () => {
  return <Container>코로나 관련 정보</Container>;
};

export default Header;
