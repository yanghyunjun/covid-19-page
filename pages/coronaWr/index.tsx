import React, { useState } from "react";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";
import { NextPage } from "next";
import MenuBar from "../../components/MenuBar";
import { CoronaWr } from "../../types/coronaWr";
import Clock from "react-live-clock";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
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
  .data-button-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5%;
    align-items: center;
    justify-content: center;
    padding: 0px 0px;
    .data-button {
      border-radius: 5px;
      background-color: #fffdfa;
      border: 1px solid #ff9c0d;
      cursor: pointer;
      margin-right: 18px;
      margin-bottom: 10px;
    }
    .data-button_onClick {
      border-radius: 5px;
      background-color: #ff9c0d;
      border: 1px solid #ff9c0d;
      cursor: pointer;
      color: #fff;
      margin-right: 18px;
      margin-bottom: 10px;
    }
  }
  .detail-data-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .data-total-wrapper {
      margin: 5% 0%;
      .data-total-count {
        color: #ff9c0d;
        font-weight: 700;
      }
      .data-total-font {
        color: #7a7a7a;
        font-size: 12px;
      }
    }
    .data-table-wrapper {
      display: flex;
      margin: 10px 0 10px 0;
      .data-nation-rank {
        width: 50px;
        text-align: center;
        @media (max-width: 590px) {
          width: 40px;
        }
        @media (max-width: 374px) {
          width: 35px;
        }
      }
      .data-nation-name {
        width: 160px;
        text-align: center;
        @media (max-width: 590px) {
          width: 80px;
        }
        @media (max-width: 374px) {
          width: 70px;
        }
      }
      .data-nation-def {
        width: 130px;
        text-align: center;
        @media (max-width: 590px) {
          width: 80px;
        }
        @media (max-width: 374px) {
          width: 70px;
        }
      }
      .data-nation-death-Cnt {
        width: 130px;
        text-align: center;
        @media (max-width: 590px) {
          width: 80px;
        }
        @media (max-width: 374px) {
          width: 70px;
        }
      }
      .data-nation-death-Rate {
        width: 120px;
        text-align: center;
        @media (max-width: 590px) {
          width: 80px;
        }
        @media (max-width: 374px) {
          width: 70px;
        }
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
  const [showEurope, setShowEurope] = useState(false);
  const [showOceania, setShowOceania] = useState(false);
  const [showAfrica, setShowAfrica] = useState(false);
  const [showOthors, setShowOthors] = useState(false);
  const ButtonClickHandler = (value: string) => {
    switch (value) {
      case "total":
        if (showTotal === true) {
          setShowTotal(true);
          break;
        }
        setShowTotal(!showTotal);
        setShowTop100(false);
        setShowAsia(false);
        setShowMidEast(false);
        setShowAmerica(false);
        setShowEurope(false);
        setShowOceania(false);
        setShowAfrica(false);
        setShowOthors(false);
        break;
      case "top100":
        if (showTop100 === true && showTotal === false) {
          setShowTop100(!showTop100);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowTop100(!showTop100);
        setShowAsia(false);
        setShowMidEast(false);
        setShowAmerica(false);
        setShowEurope(false);
        setShowOceania(false);
        setShowAfrica(false);
        setShowOthors(false);
        break;
      case "asia":
        if (showAsia === true && showTotal === false) {
          setShowAsia(!showAsia);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowTop100(false);
        setShowAsia(!showAsia);
        setShowMidEast(false);
        setShowAmerica(false);
        setShowEurope(false);
        setShowOceania(false);
        setShowAfrica(false);
        setShowOthors(false);
        break;
      case "middleEast":
        if (showMidEast === true && showTotal === false) {
          setShowMidEast(!showMidEast);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowTop100(false);
        setShowAsia(false);
        setShowMidEast(!showMidEast);
        setShowAmerica(false);
        setShowEurope(false);
        setShowOceania(false);
        setShowAfrica(false);
        setShowOthors(false);
        break;
      case "america":
        if (showAmerica === true && showTotal === false) {
          setShowAmerica(!showAmerica);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowTop100(false);
        setShowAsia(false);
        setShowMidEast(false);
        setShowAmerica(!showAmerica);
        setShowEurope(false);
        setShowOceania(false);
        setShowAfrica(false);
        setShowOthors(false);
        break;
      case "europe":
        if (showEurope === true && showTotal === false) {
          setShowEurope(!showEurope);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowTop100(false);
        setShowAsia(false);
        setShowMidEast(false);
        setShowAmerica(false);
        setShowEurope(!showEurope);
        setShowOceania(false);
        setShowAfrica(false);
        setShowOthors(false);
        break;
      case "oceania":
        if (showOceania === true && showTotal === false) {
          setShowOceania(!showOceania);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowTop100(false);
        setShowAsia(false);
        setShowMidEast(false);
        setShowAmerica(false);
        setShowEurope(false);
        setShowOceania(!showOceania);
        setShowAfrica(false);
        setShowOthors(false);
        break;
      case "africa":
        if (showAfrica === true && showTotal === false) {
          setShowAfrica(!showAfrica);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowTop100(false);
        setShowAsia(false);
        setShowMidEast(false);
        setShowAmerica(false);
        setShowEurope(false);
        setShowOceania(false);
        setShowAfrica(!showAfrica);
        setShowOthors(false);
        break;
      case "othors":
        if (showOthors === true && showTotal === false) {
          setShowOthors(!showOthors);
          setShowTotal(!showTotal);
          break;
        }
        setShowTotal(false);
        setShowTop100(false);
        setShowAsia(false);
        setShowMidEast(false);
        setShowAmerica(false);
        setShowEurope(false);
        setShowOceania(false);
        setShowAfrica(false);
        setShowOthors(!showOthors);
        break;
      default:
        break;
    }
  };
  const DetailDataFunc = (value: string) => {
    let newNationNameArray = [];
    data.items.item.sort(DefSortData).map((data) => {
      if (data.areaNm === value) {
        newNationNameArray.push(data.nationNm);
      }
    });
    return (
      <div className="detail-data-wrapper">
        <div className="data-total-wrapper">
          <span className="data-total-count">{newNationNameArray.length}</span>
          <span className="data-total-font">개의 국가가 검색되었습니다.</span>
        </div>
        <div className="data-table-wrapper">
          <div className="data-nation-rank">순위</div>
          <div className="data-nation-name">국가이름</div>
          <div className="data-nation-def">누적 확진자 수</div>
          <div className="data-nation-death-Cnt">사망자 수</div>
          <div className="data-nation-death-Rate">확진률/사망률</div>
        </div>
        {data.items.item.sort(DefSortData).map(
          (data, index) =>
            data.areaNm === value && (
              <div key={index} className="data-table-wrapper">
                <div className="data-nation-rank">{index + 1}</div>
                <div className="data-nation-name">{data.nationNm}</div>
                <div className="data-nation-def">
                  {data.natDefCnt
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <div className="data-nation-death-Cnt">
                  {data.natDeathCnt
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
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
      <div className="update-message">
        매일 정오에 데이터가 업데이트 됩니다.
      </div>
      <div className="update-clock">
        <Clock
          format={`YYYY년 MM월 DD일 HH:mm:ss`}
          ticking={true}
          timezone={`US/Pacific`}
        />
      </div>
      <div className="data-button-wrapper">
        <div
          className={`${showTotal ? "data-button_onClick" : "data-button"}`}
          role="button"
          onClick={() => ButtonClickHandler("total")}
        >
          전체
        </div>
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
        <div
          className={`${showEurope ? "data-button_onClick" : "data-button"}`}
          role="button"
          onClick={() => ButtonClickHandler("europe")}
        >
          유럽
        </div>
        <div
          className={`${showOceania ? "data-button_onClick" : "data-button"}`}
          role="button"
          onClick={() => ButtonClickHandler("oceania")}
        >
          오세아니아
        </div>
        <div
          className={`${showAfrica ? "data-button_onClick" : "data-button"}`}
          role="button"
          onClick={() => ButtonClickHandler("africa")}
        >
          아프리카
        </div>
        <div
          className={`${showOthors ? "data-button_onClick" : "data-button"}`}
          role="button"
          onClick={() => ButtonClickHandler("othors")}
        >
          기타
        </div>
      </div>
      {showTotal && (
        <div className="detail-data-wrapper">
          <div className="data-total-wrapper">
            <span className="data-total-count">{data.totalCount}</span>
            <span className="data-total-font">개의 국가가 검색되었습니다.</span>
          </div>
          <div className="data-table-wrapper">
            <div className="data-nation-rank">순위</div>
            <div className="data-nation-name">국가이름</div>
            <div className="data-nation-def">누적 확진자 수</div>
            <div className="data-nation-death-Cnt">사망자 수</div>
            <div className="data-nation-death-Rate">확진률/사망률</div>
          </div>
          {data.items.item.sort(DefSortData).map((data, index) => (
            <div key={index} className="data-table-wrapper">
              <div className="data-nation-rank">{index + 1}</div>
              <div className="data-nation-name">{data.nationNm}</div>
              <div className="data-nation-def">
                {data.natDefCnt
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <div className="data-nation-death-Cnt">
                {data.natDeathCnt
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <div className="data-nation-death-Rate">
                {Math.round(data.natDeathRate * 100) / 100}
              </div>
            </div>
          ))}
        </div>
      )}
      {showTop100 && (
        <div className="detail-data-wrapper">
          <div className="data-total-wrapper">
            <span className="data-total-count">100</span>
            <span className="data-total-font">개의 국가가 검색되었습니다.</span>
          </div>
          <div className="data-table-wrapper">
            <div className="data-nation-rank">순위</div>
            <div className="data-nation-name">국가이름</div>
            <div className="data-nation-def">누적 확진자 수</div>
            <div className="data-nation-death-Cnt">사망자 수</div>
            <div className="data-nation-death-Rate">확진률/사망률</div>
          </div>
          {data.items.item.sort(DefSortData).map(
            (data, index) =>
              index < 100 && (
                <div key={index} className="data-table-wrapper">
                  <div className="data-nation-rank">{index + 1}</div>
                  <div className="data-nation-name">{data.nationNm}</div>
                  <div className="data-nation-def">
                    {data.natDefCnt
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <div className="data-nation-death-Cnt">
                    {data.natDeathCnt
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
      {showEurope && DetailDataFunc("유럽")}
      {showOceania && DetailDataFunc("오세아니아")}
      {showAfrica && DetailDataFunc("아프리카")}
      {showOthors && DetailDataFunc("기타")}
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
      const serviceKey =
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
      const requestURL = `${corsProxy}/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${serviceKey}&startCreateDt=${yesterday}&endCreateDt=${yesterday}&_type=json`;
      const covid19WorldRes = await fetch(`${requestURL}`, {
        headers: { Origin: "openapi.data.go.kr" },
      });
      const covide19WrData_yesterday = await covid19WorldRes.json();
      return { title, covid19WrData: covide19WrData_yesterday };
    } else {
      const title2 = pathname.split("/")[1];
      const corsProxy2 = "https://cors-anywhere.herokuapp.com";
      const serviceKey2 =
        "BgwP4pyTado5recbSerXHA93SWAy%2B1AExNGuxbCIHpP4xIhxz%2BJTkNiXkY36oYhzG1L9C6G976iuiX6yPM1oZw%3D%3D";
      const requestURL2 = `${corsProxy2}/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${serviceKey2}&_type=json`;
      const covid19WorldRes2 = await fetch(`${requestURL2}`, {
        headers: { Origin: "openapi.data.go.kr" },
      });
      const covid19WrData = await covid19WorldRes2.json();
      return { title: title2, covid19WrData };
    }
  } catch (e) {
    console.log(e.message);
    return { title: "", covid19WrData: undefined };
  }
};

export default index;
