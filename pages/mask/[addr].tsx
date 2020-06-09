import React, { useState } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { MaskType } from "../../types/mask";
import fetch from "isomorphic-unfetch";
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
    font-size: 50px;
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
  p {
    color: gray;
  }
  .remain-state-green {
    color: #2cbf4e;
    font-weight: 700;
  }
  .remain-state-blue {
    color: #2c67bf;
    font-weight: 700;
  }
  .remain-state-purple {
    color: #b32cbf;
    font-weight: 700;
  }
  .remain-state-brown {
    color: #bf892c;
    font-weight: 700;
  }
  .remain-state-red {
    color: #bf2c40;
    font-weight: 700;
  }
  .search-wrapper {
    width: 1000px;
    /* overflow-x: auto;
    overflow-y: hidden;
    position: relative; */
    .search-row1 {
      width: 50%;
      float: left;
    }
    .search-row2 {
      width: 50%;
      float: right;
    }
  }
`;

interface IProps {
  maskData?: MaskType;
  addr: string | string[] | undefined;
  title: string | string[];
}

const addr: NextPage<IProps> = ({ addr, maskData, title }) => {
  if (maskData === undefined) {
    return (
      <Container>
        <MenuBar title={title} />
        <div className="title-wrapper">
          <div className="title">공적 마스크판매 정보</div>
        </div>
        <div className="subTitle">주소가 잘못되었습니다.</div>
      </Container>
    );
  }
  const searchCheack = () => {
    if (maskData.count === 0) {
      return false;
    } else {
      return true;
    }
  };
  const remainState = (data) => {
    switch (data) {
      case "plenty":
        return <span className="remain-state-green">100개이상</span>;
      case "some":
        return <span className="remain-state-blue">100개미만-30개이상</span>;
      case "few":
        return <span className="remain-state-purple">30개미만-2개이상</span>;
      case "empty":
        return <span className="remain-state-brown">1개이하</span>;
      default:
        return <span className="remain-state-red">재고없음</span>;
    }
  };
  return (
    <Container>
      <MenuBar title={title} />
      <div className="title-wrapper">
        <div className="title">공적 마스크판매 정보</div>
      </div>
      {searchCheack() && <div className="subTitle">검색 결과 입니다.</div>}
      {!searchCheack() && (
        <div className="subTitle">검색 결과가 없습니다. ㅜㅡㅜ</div>
      )}
      <p>{addr} 에 대한 검색 정보</p>
      <p>검색된 주소 : {maskData?.address}</p>
      {searchCheack() && <p>검색된 약국 갯수 : {maskData.count}</p>}
      {searchCheack() && (
        <div className="search-wrapper">
          <div className="search-row1">
            {maskData.stores.map(
              (store, index) =>
                index % 2 === 0 && (
                  <div key={index}>
                    <div>약국이름 {store.name}</div>
                    <div>약국주소 {store.addr}</div>
                    <div>재고상태 {remainState(store.remain_stat)}</div>
                    <div>입고시간 {store.stock_at}</div>
                    <div>데이터생성일자{store.created_at}</div>
                  </div>
                )
            )}
          </div>
          <div className="search-row2">
            {maskData.stores.map(
              (store, index) =>
                index % 2 === 1 && (
                  <div key={index}>
                    <div>약국이름 {store.name}</div>
                    <div>약국주소 {store.addr}</div>
                    <div>재고상태 {remainState(store.remain_stat)}</div>
                    <div>입고시간 {store.stock_at}</div>
                    <div>데이터생성일자{store.created_at}</div>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

addr.getInitialProps = async ({ query, pathname }) => {
  try {
    const title = pathname.split("/")[1];
    const { addr } = query;
    if (addr.toString().split(" ").length === 1) {
      const encoding = encodeURI(addr.toString());
      const addressDataRes = await fetch(
        `http://www.juso.go.kr/addrlink/addrLinkApi.do?&resultType=json&confmKey=U01TX0FVVEgyMDIwMDUxMTE4NDA0NDEwOTc0NjU=&keyword=${encoding}`
      );
      const addressData = await addressDataRes.json();
      const address = await addressData.results.juso[0].jibunAddr.split(" ");
      const addressEncoding = encodeURI(
        `${address[0]} ${address[1]} ${address[2]}`
      );
      const maskDataRes = await fetch(
        `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${addressEncoding}`
      );
      const maskData = await maskDataRes.json();
      return { addr, maskData, title };
    } else {
      const maskDataRes = await fetch(
        `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${addr}`
      );
      const maskData = await maskDataRes.json();
      return { addr, maskData, title };
    }
  } catch (e) {
    console.log(e.message);
    return { addr: "", title: "" };
  }
};

export default addr;
