import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import { mainData } from "../data";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 85%;
  min-height: 48px;
  padding-left: 15%;
  display: flex;
  border-bottom: 1px solid #ccc;
  border-collapse: collapse;
  .button-wrapper {
    /* max-width: 250px; */
    border-left: 1px solid #ccc;
    display: flex;
    padding: 0px 20px 0px 20px;
    align-items: center;
    cursor: pointer;
    :last-child {
      border-right: 1px solid #ccc;
    }
  }
  .button-wrapper-background {
    /* max-width: 250px; */
    border-left: 1px solid #ccc;
    display: flex;
    padding: 0px 20px 0px 20px;
    align-items: center;
    background-color: #f1f1f1;
    border-bottom: 2px solid #ff9c0d;
    cursor: pointer;
    :last-child {
      border-right: 1px solid #ccc;
    }
  }
  .button-context {
    font-size: 16px;
    @media (max-width: 415px) {
      font-size: 0.8em;
    }
    color: #132334;
    text-decoration: none;
    text-align: left;
  }
`;

interface IProp {
  title: string | string[];
}

const MenuBar: NextPage<IProp> = ({ title }) => {
  const router = useRouter();
  return (
    <Container>
      {mainData.map((data, index) => (
        <div
          className={`${
            title === data.href.split("/")[1]
              ? "button-wrapper-background"
              : "button-wrapper"
          }`}
          key={index}
          role="button"
          onClick={() => router.push(data.href)}
        >
          <div className="button-context">{data.a}</div>
        </div>
      ))}
    </Container>
  );
};

export default MenuBar;
