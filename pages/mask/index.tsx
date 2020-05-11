import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Container = styled.div``;

const index: NextPage = () => {
  const [addr, setAddr] = useState("");
  const router = useRouter();
  return (
    <Container>
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
export default index;
