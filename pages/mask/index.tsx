import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import { useRouter } from "next/router";
import MenuBar from "../../components/MenuBar";

const Container = styled.div``;

interface IProps {
  title: string | string[];
}
const index: NextPage<IProps> = ({ title }) => {
  const [addr, setAddr] = useState("");
  const router = useRouter();
  return (
    <Container>
      <MenuBar title={title} />
      <div>공적 마스크판매 정보</div>
      <div>주소검색</div>
      <div>
        <input value={addr} onChange={(e) => setAddr(e.target.value)} />
        <button onClick={() => router.push("/mask/[addr]", `/mask/${addr}`)}>
          검색
        </button>
      </div>
      <p>{addr} 마스크 판매 정보 검색</p>
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
