import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Header from "../components/Header";
import Main from "../components/Main";
import fetch from "isomorphic-unfetch";
import { MaskType } from "../types/mask";

const Container = styled.div``;

interface IProps {
  maskData: MaskType;
  addr: string;
}
const index: NextPage<IProps> = ({ maskData, addr }) => {
  // console.log(maskData);
  // console.log(addr);
  return (
    <Container>
      <Header />
      <Main maskData={maskData} addr={addr} />
    </Container>
  );
};

index.getInitialProps = async () => {
  try {
    const addr = "";
    const maskDataRes = await fetch(
      `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?addr=${addr}`
    );
    const maskData = await maskDataRes.json();
    return { maskData, addr };
  } catch (e) {
    console.log(e);
    return { maskData: [], addr: "" };
  }
};
export default index;
