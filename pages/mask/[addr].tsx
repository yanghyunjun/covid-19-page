import React, { useState } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { MaskType } from "../../types/mask";
import fetch from "isomorphic-unfetch";

const Container = styled.div``;

interface IProps {
  maskData?: MaskType;
  addr: string | string[] | undefined;
}

const addr: NextPage<IProps> = ({ addr, maskData }) => {
  const searchCheack = () => {
    if (maskData.count === 0) {
      return false;
    } else {
      return true;
    }
  };
  if (maskData === undefined) {
    return <div>주소가 잘못되었습니다.</div>;
  }
  return (
    <Container>
      <div>{addr} 에 대한 검색 정보</div>
      <div>검색된 주소 : {maskData?.address}</div>
      {searchCheack() && <div>검색된 약국 갯수 : {maskData.count}</div>}
      {searchCheack() && (
        <div>
          {maskData.stores.map((store, index) => (
            <div key={index}>
              <div>약국이름 {store.name}</div>
              <div>약국주소 {store.addr}</div>
              <div>재고상태 {store.remain_stat}</div>
              <div>입고시간 {store.stock_at}</div>
              <div>데이터생성일자{store.created_at}</div>
            </div>
          ))}
        </div>
      )}
      {!searchCheack() && <div>검색 결과가 없습니다. ㅜㅡㅜ</div>}
    </Container>
  );
};

addr.getInitialProps = async ({ query }) => {
  try {
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
      return { addr, maskData };
    } else {
      const maskDataRes = await fetch(
        `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${addr}`
      );
      const maskData = await maskDataRes.json();
      return { addr, maskData };
    }
  } catch (e) {
    console.log(e.message);
    return { addr: "" };
  }
};

export default addr;
