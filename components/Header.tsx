import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Nav from "../public/static/svg/navigation.svg";
import NaviClose from "../public/static/svg/navClose.svg";
import Link from "next/link";
import Arrow from "../public/static/svg/arrow-down-circle.svg";
import { useRouter } from "next/router";

const Container = styled.div`
  @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
  @import url(//fonts.googleapis.com/earlyaccess/nanumpenscript.css);
  .header-background {
    width: 100%;
    height: 768px;
    @media (max-width: 768px) {
      height: 480px;
    }
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
    .header-context-wrapper {
      display: flex;
      @media (max-width: 597px) {
        flex-direction: column;
      }
      @media (max-width: 321px) {
        margin-left: 20px;
      }
      .header-context {
        color: white;
        font-family: "Noto Sans KR";
        font-weight: 500;
        font-size: 2em;
        @media (min-width: 1024px) {
          font-size: 2.5em;
        }
        @media (min-width: 1280px) {
          font-size: 3em;
        }
      }
    }
    .header-context2-wrapper {
      display: flex;
      margin-top: 30px;
      @media (max-width: 656px) {
        flex-direction: column;
        margin-top: 10px;
      }
      .header-context2 {
        color: white;
        font-family: "Noto Sans KR";
        font-size: 1em;
      }
    }
    .header-context-arrow-wrapper {
      position: relative;
      .header-context-arrow {
        position: absolute;
        margin-left: -25px;
        margin-top: 60px;
        width: 4em;
        height: 4em;
        cursor: pointer;
        @media (max-width: 768px) {
          width: 3em;
          height: 3em;
        }
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
        margin-left: -40px;
        margin-top: 5px;
        font-size: 3em;
        color: white;
        font-weight: 600;
        font-family: "Nanum Pen Script";
        cursor: pointer;
        @media (max-width: 505px) {
          font-size: 2em;
        }
        @media (max-width: 321px) {
          font-size: 1.5em;
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
          transition: background-color 0.3s ease-out;
          @media (max-width: 505px) {
            font-size: 2em;
            width: 1em;
            height: 1em;
          }
          @media (max-width: 321px) {
            font-size: 1.5em;
          }
        }
        .header-navigation-scroll {
          width: 3em;
          height: 3em;
          cursor: pointer;
          position: fixed;
          z-index: 21;
          padding: 10px;
          background-color: rgba(6, 7, 24, 0.5);
          transition: background-color 0.3s ease-in;
          @media (max-width: 505px) {
            font-size: 2em;
            width: 1em;
            height: 1em;
          }
          @media (max-width: 321px) {
            font-size: 1.5em;
          }
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
        @media (max-width: 505px) {
          font-size: 2em;
          width: 1em;
          height: 1em;
        }
        @media (max-width: 321px) {
          font-size: 1.5em;
        }
      }
    }
  }
  .header-navigation-info-background-fadein {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.5s, opacity 0.5s linear;
  }
  .header-navigation-info-background {
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: rgba(6, 7, 24, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: visible;
    opacity: 1;
    transition: opacity 0.5s linear;
    .header-navigation-info {
      z-index: 11;
      .header-navigation-font-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .header-navigation-font {
        color: white;
        font-size: 3em;
        text-decoration: none;
        margin-bottom: 30px;
        @media (max-width: 505px) {
          font-size: 2em;
        }
      }
    }
  }
`;

const Header: NextPage = () => {
  const [navShow, setNaviShow] = useState(false);
  const [navPosition, setNavPosition] = useState(false);
  const router = useRouter();
  const toggleArrow = () => {
    if (window.innerWidth < 768) {
      window.scroll({ top: 480, left: 0, behavior: "smooth" });
    } else if (window.innerWidth >= 768) {
      window.scroll({ top: 768, left: 0, behavior: "smooth" });
    }
  };
  const toggleNavi = () => {
    setNaviShow(!navShow);
  };
  const Scrollhandler = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 380) {
      setNavPosition(true);
    } else {
      setNavPosition(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", Scrollhandler);
    return () => window.removeEventListener("scroll", Scrollhandler);
  });
  return (
    <Container>
      <div className="header-title-container">
        <div className="header-title-wrapper">
          <div
            role="button"
            className="header-title"
            onClick={() => router.push("/")}
          >
            🦝코로나 관련 정보
          </div>
          <div className="header-navigation-wrapper">
            <Nav
              className={`${
                navShow
                  ? "header-navigation-disappear"
                  : navPosition
                  ? "header-navigation-scroll"
                  : "header-navigation"
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

      <div
        className={`${
          navShow
            ? "header-navigation-info-background"
            : "header-navigation-info-background-fadein"
        }`}
      >
        <div className="header-navigation-info">
          {navShow && (
            <div className="header-navigation-font-wrapper">
              <Link href="/">
                <a className="header-navigation-font" onClick={toggleNavi}>
                  홈
                </a>
              </Link>
              <Link href="/coronaKr">
                <a className="header-navigation-font" onClick={toggleNavi}>
                  한국 현황
                </a>
              </Link>
              <Link href="/coronaWr">
                <a className="header-navigation-font" onClick={toggleNavi}>
                  세계 현황
                </a>
              </Link>
              <Link href="/mask">
                <a className="header-navigation-font" onClick={toggleNavi}>
                  공적마스크 정보
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="header-background">
        <div className="header-context-wrapper">
          <div className="header-context">COVID-19 Related</div>
          <div className="header-context"> Information Platform</div>
        </div>
        <div className="header-context2-wrapper">
          <div className="header-context2">Corona Status in Korea +&nbsp;</div>
          <div className="header-context2">Corona Status in World +&nbsp;</div>
          <div className="header-context2">
            Public Mask Sales Pharmacy in Korea
          </div>
        </div>
        <div className="header-context-arrow-wrapper">
          <Arrow className="header-context-arrow" onClick={toggleArrow} />
        </div>
      </div>
    </Container>
  );
};

export default Header;
