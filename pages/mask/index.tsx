import React from "react";
import { NextPage } from "next";
import MaskSearch from "../../components/MaskSearch";

interface IProps {
  title: string | string[];
}
const index: NextPage<IProps> = ({ title }) => {
  return <MaskSearch title={title} />;
};
export default index;
