import React, { useState } from "react";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";
import { NextPage } from "next";
import MenuBar from "../../components/MenuBar";
import { CoronaSideKR } from "../../types/coronaKr";
import Clock from "react-live-clock";

const Container = styled.div`
  min-height: 100vh;
  justify-content: center;
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
  .update-message {
    font-size: 1.2em;
    margin-top: 40px;
    @media (max-width: 767px) {
      font-size: 1em;
    }
    @media (max-width: 414px) {
      font-size: 0.8em;
    }
    color: gray;
  }
  .update-clock {
    font-size: 1.2em;
    margin-bottom: 20px;
    @media (max-width: 767px) {
      font-size: 1em;
    }
    @media (max-width: 414px) {
      font-size: 0.8em;
    }
    color: gray;
  }
  .coronakr-contents-wrapper {
    max-width: 1400px;
    display: flex;
    @media (max-width: 824px) {
      flex-direction: column;
      align-items: center;
    }
    .korea-map-wrapper {
      position: relative;
      width: 50%;
      @media (max-width: 824px) {
        width: 100%;
      }
      .korea-map-buttonCrad {
        font-family: "lato";
        .korea-map-buttonCrad-gubun {
          font-size: 13px;
          font-weight: 700;
        }
        .korea-map-buttonCrad-defCnt {
          font-size: 17px;
          font-weight: bold;
        }
        .korea-map-buttonCrad-font {
          font-size: 13px;
        }
      }
      .korea-map {
        width: 100%;
      }
      .korea-map-button-card {
        z-index: 11;
        cursor: pointer;
        padding: 4px 8px;
        box-shadow: 2px 2px 4px rgba(100, 100, 100, 0.2);
        border-radius: 2px;
        text-align: center;
        background-color: #fff;
        color: #222;
      }
      .korea-map-button-card-onClick {
        z-index: 11;
        cursor: pointer;
        padding: 4px 8px;
        box-shadow: 2px 2px 4px rgba(100, 100, 100, 0.2);
        border-radius: 2px;
        text-align: center;
        background-color: #222;
        color: #fff;
      }
      .korea-map-seoul {
        position: absolute;
        top: 17%;
        left: 27%;
      }
      .korea-map-gyeonggi {
        position: absolute;
        top: 8%;
        left: 28%;
        @media (max-width: 420px) {
          top: 6%;
        }
      }
      .korea-map-incheon {
        position: absolute;
        top: 15%;
        left: 12%;
      }
      .korea-map-gangwon {
        position: absolute;
        top: 10%;
        left: 60%;
      }
      .korea-map-sejong {
        position: absolute;
        top: 30%;
        left: 27%;
      }
      .korea-map-chungbuk {
        position: absolute;
        top: 26%;
        left: 45%;
      }
      .korea-map-chungnam {
        position: absolute;
        top: 40%;
        left: 18%;
      }
      .korea-map-daejeon {
        position: absolute;
        top: 37%;
        left: 44%;
      }
      .korea-map-gyeongbuk {
        position: absolute;
        top: 35%;
        left: 75%;
      }
      .korea-map-jeonbuk {
        position: absolute;
        top: 52%;
        left: 30%;
      }
      .korea-map-daegu {
        position: absolute;
        top: 51%;
        left: 75%;
        @media (max-width: 420px) {
          left: 61%;
        }
      }
      .korea-map-jeonnam {
        position: absolute;
        top: 70%;
        left: 10%;
      }
      .korea-map-gwangju {
        position: absolute;
        top: 70%;
        left: 40%;
      }
      .korea-map-gyeongnam {
        position: absolute;
        top: 63%;
        left: 60%;
      }
      .korea-map-ulsan {
        position: absolute;
        top: 58%;
        left: 87%;
        @media (max-width: 420px) {
          top: 55%;
        }
        @media (max-width: 374px) {
          top: 50%;
        }
      }
      .korea-map-busan {
        position: absolute;
        top: 66%;
        left: 82%;
      }
      .korea-map-jeju {
        position: absolute;
        top: 90%;
        left: 17%;
      }
      .korea-map-lazaretto {
        position: absolute;
        top: 90%;
        left: 70%;
      }
    }
    .coronaKR-data-wrapper {
      width: 50%;
      display: flex;
      flex-direction: column;
      @media (max-width: 824px) {
        width: 100%;
      }
      .coronaKR-data-detail-container {
        margin: 20% 20% 10% 20%;
        @media (max-width: 824px) {
          margin: 10% 5% 10% 5%;
        }
      }
      .coronaKR-data-detail {
        padding: 10% 5%;
        border-radius: 5px;
        background-color: #fffdfa;
        border: 1px solid #ff9c0d;
        .coronaKR-data-detail-title {
          font-size: 26px;
          font-weight: 600;
          color: #000;
          margin-bottom: 60px;
        }
        .data-detail-wrapper {
          display: flex;
          justify-content: space-between;
          margin: 20px 0px 20px 0px;
          .data-detail-name {
            font-size: 14px;
            color: #444;
            font-weight: 500;
            font-family: Georgia, "맑은 고딕", serif;
          }
          .data-defail-subname {
            color: #0097c7;
            font-size: 12px;
          }
          .data-detail-number {
            font-family: "Lato";
            font-size: 18px;
            font-weight: 500;
            color: #000;
            margin-right: 2px;
          }

          .data-detail-count {
            font-size: 14px;
            color: #666;
            margin-left: 4px;
          }
        }
      }
    }
  }
`;

interface IProps {
  title: string | string[];
  covid19KrData?: CoronaSideKR;
}

const index: NextPage<IProps> = ({ title, covid19KrData }) => {
  const data = covid19KrData.response.body.items;
  const DataDetailHandler = (count) => {
    return data.item.map(
      (data, index) =>
        index === count && (
          <div key={index} className="coronaKR-data-detail">
            <div className="coronaKR-data-detail-title">
              {index === 18 ? `전국` : data.gubun}
            </div>
            <div className="data-detail-wrapper">
              <div className="data-detail-name">누적확진자</div>
              <div>
                <span className="data-detail-number">{data.defCnt}</span>
                <span className="data-detail-count">명</span>
              </div>
            </div>
            <div className="data-detail-wrapper">
              <div className="data-defail-subname">전일 대비 증가</div>
              <div>
                <span className="data-defail-subname">
                  {data.incDec === 0 ? `(${data.incDec})` : `(+${data.incDec})`}
                </span>
              </div>
            </div>
            <div className="data-detail-wrapper">
              <div className="data-detail-name">격리중</div>
              <div>
                <span className="data-detail-number">{data.isolIngCnt}</span>
                <span className="data-detail-count">명</span>
              </div>
            </div>
            <div className="data-detail-wrapper">
              <div className="data-detail-name">누적 격리해제</div>
              <div>
                <span>{data.isolClearCnt}</span>
                <span className="data-detail-count">명</span>
              </div>
            </div>
            <div className="data-detail-wrapper">
              <div className="data-detail-name">사망자</div>
              <div>
                <span className="data-detail-number">{data.deathCnt}</span>
                <span className="data-detail-count">명</span>
              </div>
            </div>
            <div className="data-detail-wrapper">
              <div className="data-detail-name">10만명당 발생률</div>
              <div>
                <span className="data-detail-number">{data.qurRate}</span>
                <span className="data-detail-count">명</span>
              </div>
            </div>
          </div>
        )
    );
  };

  const ButtonCardHandler = (count) => {
    return data.item.map(
      (data, index) =>
        index === count && (
          <div key={index} className="korea-map-buttonCrad">
            <div className="korea-map-buttonCrad-gubun">{data.gubun}</div>
            <div className="korea-map-buttonCrad-defCnt">{data.defCnt}</div>
            <div className="korea-map-buttonCrad-font">
              {data.incDec === 0 ? `(${data.incDec})` : `(+${data.incDec})`}
            </div>
          </div>
        )
    );
  };

  const [showTotal, setShowTotal] = useState(true);
  const [showSeoul, setShowSeoul] = useState(false);
  const [showGyeonggi, setShowGyeonggi] = useState(false);
  const [showIncheon, setShowIncheon] = useState(false);
  const [showGangwon, setShowGangwon] = useState(false);
  const [showSejong, setShowSejong] = useState(false);
  const [showChungbuk, setShowChungbuk] = useState(false);
  const [showChungnam, setShowChungnam] = useState(false);
  const [showDaejeon, setShowDaejeon] = useState(false);
  const [showGyeongbuk, setShowGyeongbuk] = useState(false);
  const [showJeonbuk, setShowJeonbuk] = useState(false);
  const [showDaegu, setShowDaegu] = useState(false);
  const [showJeonnam, setShowJeonnam] = useState(false);
  const [showGwangju, setShowGwangju] = useState(false);
  const [showGyeongnam, setShowGyeongnam] = useState(false);
  const [showUlsan, setShowUlsan] = useState(false);
  const [showBusan, setShowBusan] = useState(false);
  const [showJeju, setShowJeju] = useState(false);
  const [showLazaretto, setShowLazaretto] = useState(false);

  const ShowArea = [
    { name: "seoul", showname: showSeoul, num: 17 },
    { name: "gyeonggi", showname: showGyeonggi, num: 9 },
    { name: "incheon", showname: showIncheon, num: 14 },
    { name: "gangwon", showname: showGangwon, num: 8 },
    { name: "sejong", showname: showSejong, num: 10 },
    { name: "chungbuk", showname: showChungbuk, num: 7 },
    { name: "chungnam", showname: showChungnam, num: 6 },
    { name: "daejeon", showname: showDaejeon, num: 12 },
    { name: "gyeongbuk", showname: showGyeongbuk, num: 3 },
    { name: "jeonbuk", showname: showJeonbuk, num: 5 },
    { name: "daegu", showname: showDaegu, num: 15 },
    { name: "jeonnam", showname: showJeonnam, num: 4 },
    { name: "gwangju", showname: showGwangju, num: 13 },
    { name: "gyeongnam", showname: showGyeongnam, num: 2 },
    { name: "ulsan", showname: showUlsan, num: 11 },
    { name: "busan", showname: showBusan, num: 16 },
    { name: "jeju", showname: showJeju, num: 1 },
    { name: "lazaretto", showname: showLazaretto, num: 0 },
  ];

  const ButtonClickHandler = (count: number) => {
    switch (count) {
      case 17:
        if (showSeoul === true && showTotal === false) {
          setShowSeoul(!showSeoul);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(!showSeoul);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 9:
        if (showGyeonggi === true && showTotal === false) {
          setShowGyeonggi(!showGyeonggi);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(!showGyeonggi);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 14:
        if (showIncheon === true && showTotal === false) {
          setShowIncheon(!showIncheon);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(!showIncheon);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 8:
        if (showGangwon === true && showTotal === false) {
          setShowGangwon(!showGangwon);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(!showGangwon);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 10:
        if (showSejong === true && showTotal === false) {
          setShowSejong(!showSejong);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(!showSejong);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 7:
        if (showChungbuk === true && showTotal === false) {
          setShowChungbuk(!showChungbuk);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(!showChungbuk);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 6:
        if (showChungnam === true && showTotal === false) {
          setShowChungnam(!showChungnam);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(!showChungnam);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 12:
        if (showDaejeon === true && showTotal === false) {
          setShowDaejeon(!showDaejeon);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(!showDaejeon);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 3:
        if (showGyeongbuk === true && showTotal === false) {
          setShowGyeongbuk(!showGyeongbuk);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(!showGyeongbuk);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 5:
        if (showJeonbuk === true && showTotal === false) {
          setShowJeonbuk(!showJeonbuk);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(!showJeonbuk);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 15:
        if (showDaegu === true && showTotal === false) {
          setShowDaegu(!showDaegu);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(!showDaegu);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 4:
        if (showJeonnam === true && showTotal === false) {
          setShowJeonnam(!showJeonnam);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(!showJeonnam);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 13:
        if (showGwangju === true && showTotal === false) {
          setShowGwangju(!showGwangju);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(!showGwangju);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 2:
        if (showGyeongnam === true && showTotal === false) {
          setShowGyeongnam(!showGyeongnam);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(!showGyeongnam);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 11:
        if (showUlsan === true && showTotal === false) {
          setShowUlsan(!showUlsan);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(!showUlsan);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 16:
        if (showBusan === true && showTotal === false) {
          setShowBusan(!showBusan);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(!showBusan);
        setShowJeju(false);
        setShowLazaretto(false);
        break;
      case 1:
        if (showJeju === true && showTotal === false) {
          setShowJeju(!showJeju);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(!showJeju);
        setShowLazaretto(false);
        break;
      case 0:
        if (showLazaretto === true && showTotal === false) {
          setShowLazaretto(!showLazaretto);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowSeoul(false);
        setShowGyeonggi(false);
        setShowIncheon(false);
        setShowGangwon(false);
        setShowSejong(false);
        setShowChungbuk(false);
        setShowChungnam(false);
        setShowDaejeon(false);
        setShowGyeongbuk(false);
        setShowJeonbuk(false);
        setShowDaegu(false);
        setShowJeonnam(false);
        setShowGwangju(false);
        setShowGyeongnam(false);
        setShowUlsan(false);
        setShowBusan(false);
        setShowJeju(false);
        setShowLazaretto(!showLazaretto);
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <MenuBar title={title} />
      <div className="title-wrapper">
        <div className="title">한국 현황</div>
      </div>
      <div className="update-message">
        매일 정오에 데이터가 업데이트 됩니다.
      </div>
      <div className="update-clock">
        <Clock
          format={`YYYY년 MM월 DD일 HH:mm:ss`}
          ticking={true}
          timezone={`Asia/Seoul`}
        />
      </div>
      <div className="coronakr-contents-wrapper">
        <div className="korea-map-wrapper">
          <img className="korea-map" src="/static/image/korea_map.png" />

          {ShowArea.map((data, index) => (
            <div className={`korea-map-${data.name}`} key={index}>
              <div
                role="button"
                className={
                  data.showname
                    ? `korea-map-button-card-onClick`
                    : `korea-map-button-card`
                }
                onClick={() => ButtonClickHandler(data.num)}
              >
                {ButtonCardHandler(data.num)}
              </div>
            </div>
          ))}
        </div>
        <div className="coronaKR-data-wrapper">
          <div className="coronaKR-data-detail-container">
            {showTotal && DataDetailHandler(18)}
            {ShowArea.map(
              (data) => data.showname && DataDetailHandler(data.num)
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

index.getInitialProps = async ({ pathname }) => {
  try {
    let date = new Date();
    let hour = date.getHours();
    if (hour < 12) {
      const title = pathname.split("/")[1];
      const corsProxy = "https://cors-anywhere.herokuapp.com";
      const servicekey =
        "BgwP4pyTado5recbSerXHA93SWAy%2B1AExNGuxbCIHpP4xIhxz%2BJTkNiXkY36oYhzG1L9C6G976iuiX6yPM1oZw%3D%3D";
      let today = new Date();
      today.setDate(today.getDate() - 1);
      let year = today.getFullYear();
      let month =
        today.getMonth() + 1 < 10
          ? `0${today.getMonth() + 1}`
          : today.getMonth() + 1;
      let day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
      let yesterday = `${year}${month}${day}`;
      let requestURL = `${corsProxy}/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${servicekey}&startCreateDt=${yesterday}&endCreateDt=${yesterday}&_type=json`;
      const covid19SideStateRes = await fetch(`${requestURL}`, {
        headers: { Origin: "openapi.data.go.kr" },
      });
      const covid19KrData_yesterday = await covid19SideStateRes.json();
      return { title, covid19KrData: covid19KrData_yesterday };
    } else {
      const title2 = pathname.split("/")[1];
      const corsProxy2 = "https://cors-anywhere.herokuapp.com";
      const servicekey2 =
        "BgwP4pyTado5recbSerXHA93SWAy%2B1AExNGuxbCIHpP4xIhxz%2BJTkNiXkY36oYhzG1L9C6G976iuiX6yPM1oZw%3D%3D";
      const requestURL = `${corsProxy2}/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${servicekey2}&_type=json`;
      const covid19SideStateRes2 = await fetch(`${requestURL}`, {
        headers: { Origin: "openapi.data.go.kr" },
      });
      const covid19KrData = await covid19SideStateRes2.json();
      return { title: title2, covid19KrData };
    }
  } catch (e) {
    console.log(e.message);
    return { title: "", covid19KrData: undefined };
  }
};

export default index;
