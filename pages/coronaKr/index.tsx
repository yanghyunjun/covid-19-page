import React from "react";
import styled from "styled-components";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { CoronaKR } from "../../types/coronaKr";

const Container = styled.div``;

interface IProp {
  coronaKrData?: CoronaKR;
}

const index: NextPage<IProp> = ({ coronaKrData }) => {
  return <Container>한국현황</Container>;
};

// index.getInitialProps = async () => {
//   try {
//     const coronaKrDataRes = await fetch(
//       `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=e%2Fu5HiiZcpglw2q8nndKG60KcqEAnOaOLYiLGQJZa4klvndij7SlvvQAxvRLifAESwNq5IKZH4lVjeSd5uS%2FWQ%3D%3D`
//     );
//     const coronaKrData = await coronaKrDataRes.json();
//     return { coronaKrData };
//   } catch (e) {
//     console.log(e.message);
//     return {};
//   }
// };

export default index;
