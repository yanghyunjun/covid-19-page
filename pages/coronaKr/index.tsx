import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import MenuBar from "../../components/MenuBar";
import { CoronaSideKR } from "../../types/coronaKr";

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
      @media (max-width: 415px) {
        font-size: 1em;
        font-weight: 600;
      }
    }
  }
  .korea-map-wrapper {
    position: relative;
    .korea-map {
      width: 800px;
      @media (max-width: 1200px) {
        width: 800px;
      }
      @media (max-width: 801px) {
        width: 650px;
      }
      @media (max-width: 651px) {
        width: 500px;
      }
      @media (max-width: 501px) {
        width: 414px;
      }
      @media (max-width: 415px) {
        width: 300px;
      }
    }
    .korea-button-card {
      position: absolute;
      z-index: 11;
      top: 17%;
      left: 27%;
      font-weight: 700;
      cursor: pointer;
      padding: 1% 3% 1% 1%;
    }
  }
`;

interface IProps {
  title: string | string[];
  covid19KrData?: CoronaSideKR;
}

const index: NextPage<IProps> = ({ title, covid19KrData }) => {
  const [showSeoul, setShowSeoul] = useState(false);
  if (covid19KrData === undefined) {
    location.reload();
  }
  // const items = () => {
  //   return covid19KrData.response.body.items;
  // };
  const items = covid19KrData.response.body.items;
  return (
    <Container>
      <MenuBar title={title} />
      <div className="title-wrapper">
        <div className="title">한국 현황</div>
      </div>
      <div className="korea-map-wrapper">
        <img className="korea-map" src="/static/image/korea_map.png" />
        <div
          role="button"
          className="korea-button-card"
          onClick={() => setShowSeoul(!showSeoul)}
        >
          {setTimeout(() => {
            {
              items.item.map((data, index) => {
                <div key={index}>data</div>;
              });
            }
          }, 500)}
        </div>
      </div>
    </Container>
  );
};

index.getInitialProps = async ({ pathname }) => {
  try {
    const title = pathname.split("/")[1];

    const servicekey =
      "BgwP4pyTado5recbSerXHA93SWAy%2B1AExNGuxbCIHpP4xIhxz%2BJTkNiXkY36oYhzG1L9C6G976iuiX6yPM1oZw%3D%3D";
    const requestURL = `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${servicekey}&_type=json`;
    const covid19SideStateRes = await fetch(`${requestURL}`);
    const covid19KrData = await covid19SideStateRes.json();
    return { title, covid19KrData };

    // let date = new Date();
    // let year = date.getFullYear();
    // let month = date.getMonth() + 1;
    // let day = date.getDate();
  } catch (e) {
    console.log(e.message);
    return { title: "", covid19KrData: undefined };
  }
};

export default index;
