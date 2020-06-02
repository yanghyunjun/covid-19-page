import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
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
    }
  }
  .subTitle {
    font-family: "Nanum Pen Script";
    color: #ff9c0d;
    font-size: 50px;
    padding: 70px 0px;
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
    .search {
      font-size: 32px;
      height: 40px;
      padding-left: 0;
      border: 0;
      outline: none;
      background: transparent;
      width: 100%;
    }
    .submit {
      width: 40px;
      height: 40px;
    }
  }
  p {
    margin-top: 20px;
    color: gray;
  }
`;

interface IProps {
  title: string | string[];
}
const index: NextPage<IProps> = ({ title }) => {
  const [addr, setAddr] = useState("");
  const router = useRouter();
  const keyDown = (e) => {
    if (e.keyCode === 13) {
      if (addr === "") {
        alert("주소를 입력해 주십시오.");
      } else {
        router.push("/mask/[addr]", `/mask/${addr}`);
      }
    }
  };
  const clickHandler = () => {
    if (addr === "") {
      alert("주소를 입력해 주십시오.");
    } else {
      router.push("/mask/[addr]", `/mask/${addr}`);
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
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
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
      <p>{addr} 지역 마스크 판매 정보 검색</p>
    </Container>
  );
};

index.getInitialProps = async ({ pathname }) => {
  try {
    const title = pathname.split("/")[1];
    return { title };
  } catch (e) {
    console.log(e.message);
    return { title: "" };
  }
};
export default index;
