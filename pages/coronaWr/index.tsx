import React, { useState } from "react";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";
import { NextPage } from "next";
import MenuBar from "../../components/MenuBar";
import { request } from "http";
import { CoronaWr } from "../../types/coronaWr";

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
  .data-button-wrapper {
    display: flex;
    .data-button {
      border-radius: 5px;
      background-color: #fffdfa;
      border: 1px solid #ff9c0d;
      cursor: pointer;
    }
    .data-button_onClick {
      border-radius: 5px;
      background-color: #fffdfa;
      border: 1px solid #ff9c0d;
      cursor: pointer;
      color: #222;
      background-color: #fff;
    }
  }
  .detail-data-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .data-table-wrapper {
      display: flex;
      margin: 10px 0 10px 0;
      .data-nation-name {
        width: 170px;
        text-align: center;
      }
      .data-nation-def {
        width: 150px;
        text-align: center;
      }
      .data-nation-death-Cnt {
        width: 120px;
        text-align: center;
      }
      .data-nation-death-Rate {
        width: 120px;
        text-align: center;
      }
    }
  }
`;

interface IProps {
  title: string | string[];
  covid19WrData?: CoronaWr;
}

const index: NextPage<IProps> = ({ title, covid19WrData }) => {
  const data = covid19WrData.response.body;
  const DefSortData = (a, b) => {
    return b.natDefCnt - a.natDefCnt;
  };
  const [showTotal, setShowTotal] = useState(true);
  const [showTop100, setShowTop100] = useState(false);
  const [showAsia, setShowAsia] = useState(false);
  const [showMidEast, setShowMidEast] = useState(false);
  const [showAmerica, setShowAmerica] = useState(false);
  const ButtonClickHandler = (value: string) => {
    switch (value) {
      case "top100":
        if (showTop100 === true && showTotal === false) {
          setShowTop100(!showTop100);
          setShowTotal(!showTotal);
        }
        setShowTotal(false);
        setShowTop100(!showTop100);
        setShowAsia(false);
        setShowMidEast(false);
        setShowAmerica(false);
        break;
      case "asia":
        if (showAsia === true && showTotal === false) {
          setShowAsia(!showAsia);
          setShowTotal(!showTotal);
        }
        setShowTotal(false);
        setShowTop100(false);
        setShowAsia(!showAsia);
        setShowMidEast(false);
        setShowAmerica(false);
        break;
      case "middleEast":
        if (showMidEast === true && showTotal === false) {
          setShowMidEast(!showMidEast);
          setShowTotal(!showTotal);
        }
        setShowTotal(false);
        setShowTop100(false);
        setShowAsia(false);
        setShowMidEast(!showMidEast);
        setShowAmerica(false);
        break;
      case "america":
        if (showAmerica === true && showTotal === false) {
          setShowAmerica(!showAmerica);
          setShowTotal(!showTotal);
        }
        setShowTotal(false);
        setShowTop100(false);
        setShowAsia(false);
        setShowMidEast(false);
        setShowAmerica(!showAmerica);
        break;
      default:
        break;
    }
  };
  const DetailDataFunc = (value: string) => {
    return (
      <div className="detail-data-wrapper">
        <div className="data-table-wrapper">
          <div className="data-nation-name">국가이름</div>
          <div className="data-nation-def">누적 확진자 수</div>
          <div className="data-nation-death-Cnt">사망자 수</div>
          <div className="data-nation-death-Rate">확진률/사망률</div>
        </div>
        {data.items.item.sort(DefSortData).map(
          (data, index) =>
            data.areaNm === value && (
              <div key={index} className="data-table-wrapper">
                <div className="data-nation-name">{data.nationNm}</div>
                <div className="data-nation-def">{data.natDefCnt}</div>
                <div className="data-nation-death-Cnt">{data.natDeathCnt}</div>
                <div className="data-nation-death-Rate">
                  {Math.round(data.natDeathRate * 100) / 100}
                </div>
              </div>
            )
        )}
      </div>
    );
  };
  return (
    <Container>
      <MenuBar title={title} />
      <div className="title-wrapper">
        <div className="title">세계 현황</div>
      </div>
      <div className="data-button-wrapper">
        <div
          className={`${showTop100 ? "data-button_onClick" : "data-button"}`}
          role="button"
          onClick={() => ButtonClickHandler("top100")}
        >
          top100
        </div>
        <div
          className={`${showAsia ? "data-button_onClick" : "data-button"}`}
          role="button"
          onClick={() => ButtonClickHandler("asia")}
        >
          아시아
        </div>
        <div
          className={`${showMidEast ? "data-button_onClick" : "data-button"}`}
          role="button"
          onClick={() => ButtonClickHandler("middleEast")}
        >
          중동
        </div>
        <div
          className={`${showAmerica ? "data-button_onClick" : "data-button"}`}
          role="button"
          onClick={() => ButtonClickHandler("america")}
        >
          아메리카
        </div>
      </div>
      {showTotal && (
        <div className="detail-data-wrapper">
          <div>검색된 나라 갯수 : {data.totalCount}</div>
          <div className="data-table-wrapper">
            <div className="data-nation-name">국가이름</div>
            <div className="data-nation-def">누적 확진자 수</div>
            <div className="data-nation-death-Cnt">사망자 수</div>
            <div className="data-nation-death-Rate">확진률/사망률</div>
          </div>
          {data.items.item.sort(DefSortData).map((data, index) => (
            <div key={index} className="data-table-wrapper">
              <div className="data-nation-name">{data.nationNm}</div>
              <div className="data-nation-def">{data.natDefCnt}</div>
              <div className="data-nation-death-Cnt">{data.natDeathCnt}</div>
              <div className="data-nation-death-Rate">
                {Math.round(data.natDeathRate * 100) / 100}
              </div>
            </div>
          ))}
        </div>
      )}
      {showTop100 && (
        <div className="detail-data-wrapper">
          <div className="data-table-wrapper">
            <div className="data-nation-name">국가이름</div>
            <div className="data-nation-def">누적 확진자 수</div>
            <div className="data-nation-death-Cnt">사망자 수</div>
            <div className="data-nation-death-Rate">확진률/사망률</div>
          </div>
          {data.items.item.sort(DefSortData).map(
            (data, index) =>
              index < 100 && (
                <div key={index} className="data-table-wrapper">
                  <div className="data-nation-name">{data.nationNm}</div>
                  <div className="data-nation-def">{data.natDefCnt}</div>
                  <div className="data-nation-death-Cnt">
                    {data.natDeathCnt}
                  </div>
                  <div className="data-nation-death-Rate">
                    {Math.round(data.natDeathRate * 100) / 100}
                  </div>
                </div>
              )
          )}
        </div>
      )}
      {showAsia && DetailDataFunc("아시아")}
      {showMidEast && DetailDataFunc("중동")}
      {showAmerica && DetailDataFunc("아메리카")}
    </Container>
  );
};

index.getInitialProps = async ({ pathname }) => {
  try {
    const title = pathname.split("/")[1];
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    const serviceKey =
      "BgwP4pyTado5recbSerXHA93SWAy%2B1AExNGuxbCIHpP4xIhxz%2BJTkNiXkY36oYhzG1L9C6G976iuiX6yPM1oZw%3D%3D";
    const requestURL = `${corsProxy}http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${serviceKey}&_type=json`;
    const covid19WorldRes = await fetch(`${requestURL}`, {
      headers: { Origin: "openapi.data.go.kr" },
    });
    const covid19WrData = await covid19WorldRes.json();

    const data = covid19WrData.response.body.items;
    if (data === "") {
      let today = new Date();
      today.setDate(today.getDate() - 1);
      let year = today.getFullYear();
      let month =
        today.getMonth() + 1 < 10
          ? `0${today.getMonth() + 1}`
          : today.getMonth() + 1;
      let day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
      let yesterday = `${year}${month}${day}`;
      let requestURL2 = `${corsProxy}/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${serviceKey}&startCreateDt=${yesterday}&_type=json`;
      const covid19WorldRes2 = await fetch(`${requestURL2}`, {
        headers: { Origin: "openapi.data.go.kr" },
      });
      const covide19WrData_yesterday = await covid19WorldRes2.json();
      return { title, covid19WrData: covide19WrData_yesterday };
    }

    return { title, covid19WrData };
  } catch (e) {
    console.log(e.message);
    return { title: "", covid19WrData: undefined };
  }
};

export default index;
