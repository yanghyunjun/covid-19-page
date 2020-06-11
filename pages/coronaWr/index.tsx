import React from "react";
import styled from "styled-components";
import { NextPage } from "next";
import MenuBar from "../../components/MenuBar";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

interface IProps {
  title: string | string[];
}

const index: NextPage<IProps> = ({ title }) => {
  return (
    <Container>
      <MenuBar title={title} />
      <div className="title-wrapper">
        <div className="title">세계 현황</div>
      </div>
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
