import Lottie from "lottie-react";
import PageNotFoundData from "../json/404NotFound.json";
import TableNoDataFound from "../json/NoDataTable.json";

export const PageNotFound = () => {
  return (
    <Lottie
      loop
      autoPlay
      style={{ height: 600 }}
      animationData={PageNotFoundData}
    />
  );
};

export const TableNoData = () => {
  return (
    <Lottie
      loop
      autoPlay
      style={{ height: 200 }}
      animationData={TableNoDataFound}
    />
  );
};
