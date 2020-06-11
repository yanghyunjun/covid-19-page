import React, { useState } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";
import MenuBar from "../../components/MenuBar";

const Container = styled.div`
  @import url(//fonts.googleapis.com/earlyaccess/nanumpenscript.css);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  .title-wrapper {
    min-width: 80%;
    min-height: 83px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .title {
      color: #222;
      font-size: 2em;
      padding: 30px 50px;
      border-bottom: 2px solid #ff9c0d;
      @media (max-width: 1200px) {
        font-size: 1.5em;
        padding: 33px 58px;
      }
      @media (max-width: 768px) {
        font-size: 1.2em;
        font-weight: 600;
      }
      @media (max-width: 768px) {
        font-size: 1.2em;
        font-weight: 600;
      }
      @media (max-width: 415px) {
        font-size: 1em;
        font-weight: 600;
      }
    }
  }
  .subTitle {
    font-family: "Nanum Pen Script";
    color: #ff9c0d;
    font-size: 3em;
    padding: 70px 0px;
    @media (max-width: 1200px) {
      font-size: 2.5em;
    }
    @media (max-width: 768px) {
      font-size: 2.2em;
    }
    @media (max-width: 768px) {
      font-size: 2.2em;
    }
    @media (max-width: 415px) {
      font-size: 2em;
    }
  }
  .search-wrapper {
    padding: 25px 30px 25px 30px;
    max-width: 759px;
    width: 80vw;
    background-color: #fff;
    border-radius: 45px;
    border: 2px solid #ff9c0d;
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
      padding: 10px 15px 10px 15px;
    }
    .search {
      font-size: 2em;
      max-height: 40px;
      padding-left: 0;
      border: 0;
      outline: none;
      background: transparent;
      width: 100%;
      @media (max-width: 768px) {
        font-size: 1em;
      }
      @media (max-width: 376px) {
        font-size: 0.8em;
      }
    }
    .submit {
      width: 40px;
      height: 40px;
      @media (max-width: 768px) {
        width: 20px;
        height: 20px;
      }
      @media (max-width: 376px) {
        width: 16px;
        height: 16px;
      }
    }
  }
  p {
    margin-top: 20px;
    color: gray;
  }
  .warning-message {
    font-size: 1.2em;
    @media (max-width: 767px) {
      font-size: 0.7em;
    }
    @media (max-width: 414px) {
      font-size: 0.5em;
    }
    color: gray;
  }
`;

interface IProps {
  title: string | string[];
}
const index: NextPage<IProps> = ({ title }) => {
  const [address, setAddress] = useState("");
  const router = useRouter();
  const keyDown = (e) => {
    if (e.keyCode === 13) {
      if (address === "") {
        alert("주소를 입력해 주십시오.");
      } else {
        router.push("/mask/[addr]", `/mask/${address}`);
      }
    }
  };
  const clickHandler = () => {
    if (address === "") {
      alert("주소를 입력해 주십시오.");
    } else {
      router.push("/mask/[addr]", `/mask/${address}`);
    }
  };
  return (
    <Container>
      <MenuBar title={title} />
      <div className="title-wrapper">
        <div className="title">공적 마스크판매 정보</div>
      </div>
      <div className="subTitle">주소로 검색해 보세요!</div>
      <div className="search-wrapper">
        <input
          className="search"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={keyDown}
          placeholder="ex)명일동 or 서울특별시 강동구 명일동"
        />
        <div role="button" onClick={clickHandler}>
          <img
            className="submit"
            src="/static/svg/search-thin.svg"
            alt="검색"
          />
        </div>
      </div>
      <div className="warning-message">
        ※검색이 제대로 되지 않을시 주소를 상세하게 적어주세요※
      </div>
      <p>{address} 지역 마스크 판매 정보 검색</p>
    </Container>
  );
};

index.getInitialProps = ({ pathname }) => {
  try {
    const title = pathname.split("/")[1];
    return { title };
  } catch (e) {
    console.log(e.message);
    return { title: "" };
  }
};
export default index;
