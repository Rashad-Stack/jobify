import { useState } from "react";
import styled from "styled-components";
import useStats from "../hooks/useStats";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";

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
  const { weeklyApplications, isSuccess } = useStats();
  const [barChart, setBarChart] = useState(true);

  return (
    <>
      {isSuccess && weeklyApplications.length > 0 && (
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
      )}
    </>
  );
}
