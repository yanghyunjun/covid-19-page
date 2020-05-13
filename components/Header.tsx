import React from "react";
import styled from "styled-components";
import { NextPage } from "next";

const Container = styled.div`
  @import url(//fonts.googleapis.com/earlyaccess/nanumpenscript.css);
  @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
  .header-background {
    width: 100%;
    height: 768px;
    display: flex;
    /* padding-top: 20px; */
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
  }
  .header-title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .header-title {
      font-size: 4em;
      color: white;
      font-weight: 600;
      font-family: "Nanum Pen Script";
      @media (max-width: 416px) {
        font-size: 2em;
      }
    }
    .header-mark {
      font-size: 4em;
      color: white;
      font-weight: 600;
      font-family: "Nanum Pen Script";
      margin-right: 40px;
      @media (max-width: 416px) {
        font-size: 2em;
      }
    }
  }
  /* .header-context-container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .header-context {
      color: white;
      font-size: 2em;
      font-family: "Noto Sans KR";
      font-weight: 500;
    }
  } */
`;

const Header: NextPage = () => {
  return (
    <Container>
      <div className="header-background">
        <div className="header-title-container">
          <div className="header-mark">🦝</div>
          <div className="header-title">코로나 관련 정보</div>
        </div>
        {/* <div className="header-context-container">
          <div className="header-context">
            COVID-19 Related Information Platform
          </div>
        </div> */}
      </div>
    </Container>
  );
};

export default Header;
