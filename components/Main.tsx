import React from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Link from "next/link";
import { MaskType } from "../types/mask";

const Container = styled.div``;

interface IProps {
  maskData: MaskType;
  addr: string;
}

const Main: NextPage<IProps> = ({ maskData, addr }) => {
  return (
    <Container>
      <Link href="/mask">
        <a>마스크판매 약국 알아보기</a>
      </Link>
    </Container>
  );
};

export default Main;
