import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Main from "../components/Main";
import Header from "../components/Header";

const Container = styled.div``;

const index: NextPage = () => {
  return (
    <Container>
      <Header />
      <Main />
    </Container>
  );
};

export default index;
