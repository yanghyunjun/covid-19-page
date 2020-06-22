import React from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Link from "next/link";
import { mainData } from "../data";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .main-contents-wrapper {
    padding-top: 40px;
    :last-child {
      padding-bottom: 40px;
    }
    h1 {
      text-align: left;
      font-size: 40px;
      font-weight: 700;
      @media (min-width: 714px) {
        min-width: 714px;
      }
    }
    h2 {
      text-align: left;
      font-size: 22px;
    }
    .contents-underbar {
      width: 50px;
      height: 27px;
      border-bottom: #333 2px solid;
    }
    .main-contents-photo-wrapper {
      margin-top: 27px;
      display: flex;
      .main-contents-photo {
        margin-right: 20px;
        border: 1px solid gray;
        width: 9em;
        height: 9em;
        border-radius: 50%;
      }
      p {
        max-width: 800px;
        display: flex;
        padding: 30px 0px;
        .main-contents-link {
          max-height: 1.2em;
        }
      }
    }
  }
`;

const Main: NextPage = () => {
  return (
    <Container>
      {mainData.map((data, index) => (
        <div key={index} className="main-contents-wrapper">
          <h1>{data.titleEng}</h1>
          <h2>{data.titleKr}</h2>
          <div className="contents-underbar" />
          <div className="main-contents-photo-wrapper">
            <img
              src={`/static/image/${data.img}`}
              className="main-contents-photo"
            />
            <p>
              <Link href={data.href}>
                <a className="main-contents-link">{data.a}</a>
              </Link>
            </p>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Main;
