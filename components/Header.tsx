import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Nav from "../public/static/svg/navigation.svg";
import NaviClose from "../public/static/svg/navClose.svg";
import Link from "next/link";

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
        margin-top: 5px;
        font-size: 3em;
        color: white;
        font-weight: 600;
        font-family: "Nanum Pen Script";
        @media (max-width: 416px) {
          font-size: 2em;
        }
      }
      .header-navigation-wrapper {
        z-index: 20;
        .header-navigation {
          width: 3em;
          height: 3em;
          cursor: pointer;
          position: fixed;
          z-index: 21;
          padding: 10px;
          /* background-color: rgb(128, 128, 128); */
          @media (max-width: 416px) {
            font-size: 2em;
            width: 1em;
            height: 1em;
          }
        }
        .header-navigation-disappear {
          display: none;
        }
        .header-navigatin-info-close {
          width: 3em;
          height: 3em;
          cursor: pointer;
          z-index: 20;
          position: fixed;
          padding: 10px;
          @media (max-width: 416px) {
            font-size: 2em;
            width: 1em;
            height: 1em;
          }
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
      @media (max-width: 416px) {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
  .header-navigation-info-background {
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: rgba(6, 7, 24, 0.8);
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .header-navigation-info {
      z-index: 11;
      .header-navigation-font {
        color: white;
        font-size: 3em;
        text-decoration: none;
        @media (max-width: 416px) {
          font-size: 2em;
        }
      }
    }
  }
`;

const Header: NextPage = () => {
  const [navShow, setNaviShow] = useState(false);
  const toggleNavi = () => {
    setNaviShow(!navShow);
  };
  // document.getElementById("scroll");
  // element.scrollIntoView();
  return (
    <Container>
      <div className="header-title-container">
        <div className="header-title-wrapper">
          <div className="header-title">🦝코로나 관련 정보</div>
          <div className="header-navigation-wrapper">
            <Nav
              className={`${
                navShow ? "header-navigation-disappear" : "header-navigation"
              }`}
              onClick={toggleNavi}
            />
            <NaviClose
              className={`${
                navShow
                  ? "header-navigatin-info-close"
                  : "header-navigation-disappear"
              }`}
              onClick={toggleNavi}
            />
          </div>
        </div>
      </div>
      {navShow && (
        <div className="header-navigation-info-background">
          <div className="header-navigation-info">
            <Link href="/mask">
              <a className="header-navigation-font">공적마스크 정보</a>
            </Link>
          </div>
        </div>
      )}
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
