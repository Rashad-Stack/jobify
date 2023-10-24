import { useState } from "react";
import styled from "styled-components";
import useStats from "../hooks/useStats";
import { CustomError } from "../types";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";
import ErrorMsg from "./ErrorMsg";
import LoadingBig from "./LoadingBig";

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;
export default function ChartContainer() {
  const { weeklyApplications, isLoading, isError, error, isSuccess } =
    useStats();
  const [barChart, setBarChart] = useState(true);

  return isLoading ? (
    <LoadingBig height={30} />
  ) : isError ? (
    <ErrorMsg height={30} error={error as CustomError} />
  ) : (
    <>
      {isSuccess && weeklyApplications.length > 0 ? (
        <Wrapper>
          <h4>Monthly Applications</h4>
          <button type="button" onClick={() => setBarChart(!barChart)}>
            {barChart ? "Area Chart" : "Bar Chart"}
          </button>
          {barChart ? (
            <BarChartComponent data={weeklyApplications} />
          ) : (
            <AreaChartComponent data={weeklyApplications} />
          )}
        </Wrapper>
      ) : (
        <ErrorMsg height={30} msg="No stats data found" />
      )}
    </>
  );
}
