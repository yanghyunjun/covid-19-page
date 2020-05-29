import React from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Link from "next/link";
import { MaskType } from "../types/mask";

const Container = styled.div`
  .test {
    font-size: 5em;
  }
`;

const Main: NextPage = () => {
  return (
    <Container>
      <Link href="/mask">
        <a id="scoll">마스크판매 약국 알아보기</a>
      </Link>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
      <div className="test">ㅎㅇ</div>
    </Container>
  );
};

export default Main;
