import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Nav from "../public/static/svg/navigation.svg";
import OutsideClickHandler from "react-outside-click-handler";

const Container = styled.div`
  @import url(//fonts.googleapis.com/earlyaccess/nanumpenscript.css);
  @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
  .header-background {
    width: 100%;
    height: 768px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    position: absolute;
    margin-top: 20px;
    width: 100%;
    .header-title-wrapper {
      display: flex;
      justify-content: space-around;
      .header-title {
        font-size: 3em;
        color: white;
        font-weight: 600;
        font-family: "Nanum Pen Script";
        @media (max-width: 416px) {
          font-size: 2em;
        }
      }
      .header-navigation {
        width: 3em;
        height: 3em;
        cursor: pointer;
        @media (max-width: 416px) {
          font-size: 2em;
        }
      }
    }
  }
  .header-context-container {
    .header-context {
      color: white;
      font-size: 2em;
      font-family: "Noto Sans KR";
      font-weight: 500;
    }
  }
  .header-navigation-info-wrapper {
    position: absolute;
    z-index: 10;
    .header-navigation-info {
      width: 100%;
      height: 100%;
      background-color: #060718;
      position: fixed;
      opacity: 0.7;
      .header-navigation-font {
        color: white;
        font-size: 4em;
      }
    }
  }
`;

const Header: NextPage = () => {
  const [navShow, setNaviShow] = useState(false);
  const toggleNavi = () => {
    setNaviShow(!navShow);
  };
  return (
    <Container>
      <div className="header-title-container">
        <div className="header-title-wrapper">
          <div className="header-title">🦝코로나 관련 정보</div>
          <div role="button">
            <Nav className="header-navigation" onClick={toggleNavi} />
          </div>
        </div>
      </div>
      <OutsideClickHandler
        onOutsideClick={() => {
          if (navShow) {
            setNaviShow(false);
          }
        }}
      >
        {navShow && (
          <div className="header-navigation-info-wrapper">
            <div className="header-navigation-info">
              <div className="header-navigation-font">hi</div>
            </div>
          </div>
        )}
      </OutsideClickHandler>
      <div className="header-background">
        <div className="header-context-container">
          <div className="header-context">
            COVID-19 Related Information Platform
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Header;
