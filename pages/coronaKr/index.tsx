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
  .coronakr-contents-wrapper {
    display: flex;
    .korea-map-wrapper {
      position: relative;
      width: 50%;
      .korea-map {
        width: 100%;
      }
      .korea-button-card {
        position: absolute;
        z-index: 11;
        top: 17%;
        left: 27%;
        cursor: pointer;
        padding: 4px 8px;
        box-shadow: 2px 2px 4px rgba(100, 100, 100, 0.2);
        border-radius: 2px;
        text-align: center;
        background-color: #fff;
      }
    }
    .coronaKR-data-wrapper {
      width: 50%;
      display: flex;
      flex-direction: column;
      .coronaKR-data-detail {
      }
    }
  }
`;

interface IProps {
  title: string | string[];
  covid19KrData?: CoronaSideKR;
}

const index: NextPage<IProps> = ({ title, covid19KrData }) => {
  const [showSeoul, setShowSeoul] = useState(false);
  const [showTotal, setShowTotal] = useState(true);
  const data = covid19KrData.response.body.items;
  console.log(data);
  return (
    <Container>
      <MenuBar title={title} />
      <div className="title-wrapper">
        <div className="title">한국 현황</div>
      </div>
      <div className="coronakr-contents-wrapper">
        <div className="korea-map-wrapper">
          <img className="korea-map" src="/static/image/korea_map.png" />
          <div
            role="button"
            className="korea-button-card"
            onClick={() => {
              setShowSeoul(!showSeoul), setShowTotal(!showTotal);
            }}
          >
            {/* {data.item.map(
              (data, index) =>
                index === 17 && (
                  <div key={index}>
                    <div>{data.gubun}</div>
                    <div>{data.defCnt}</div>
                    <div>
                      {data.incDec === 0
                        ? `(${data.incDec})`
                        : `(+${data.incDec})`}
                    </div>
                  </div>
                )
            )} */}
          </div>
        </div>
        <div className="coronaKR-data-wrapper">
          {/* {showTotal &&
            data.item.map(
              (data, index) =>
                index === 18 && (
                  <div key={index} className="coronaKR-data-detail">
                    <div>전국</div>
                    <div></div>
                  </div>
                )
            )} */}
        </div>
      </div>
    </Container>
  );
};

index.getInitialProps = async ({ pathname }) => {
  try {
    const title = pathname.split("/")[1];
    const proxy = "http://cors-anywhere.herokuapp.com/";
    const servicekey =
      "BgwP4pyTado5recbSerXHA93SWAy%2B1AExNGuxbCIHpP4xIhxz%2BJTkNiXkY36oYhzG1L9C6G976iuiX6yPM1oZw%3D%3D";
    const requestURL = `${proxy}http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${servicekey}&_type=json`;
    const covid19SideStateRes = await fetch(`${requestURL}`, {
      // headers: {
      //   "x-requested-with": "xhr",
      // },
      // redirect: "follow",
      headers: {
        // "Content-Type": "application/json",
        Accept: "*/*",
      },
    });
    const covid19KrData = await covid19SideStateRes.json();
    return { title, covid19KrData };
  } catch (e) {
    console.log(e.message);
    return { title: "", covid19KrData: undefined };
  }
};

export default index;
