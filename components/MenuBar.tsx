import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import { mainData } from "../data";
import Link from "next/link";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 100%;
  height: 48px;
  padding-left: 200px;
  display: flex;
  border-bottom: 1px solid #ccc;
  border-collapse: collapse;
  .button-wrapper {
    width: 250px;
    border-left: 1px solid #ccc;
    display: flex;
    padding-left: 30px;
    align-items: center;
    cursor: pointer;
    :last-child {
      border-right: 1px solid #ccc;
    }
  }
  .button-wrapper-background {
    width: 250px;
    border-left: 1px solid #ccc;
    display: flex;
    padding-left: 30px;
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
        >
          <div
            className="button-context"
            role="button"
            onClick={() => router.push(data.href)}
          >
            {data.a}
          </div>
        </div>
      ))}
    </Container>
  );
};

export default MenuBar;
