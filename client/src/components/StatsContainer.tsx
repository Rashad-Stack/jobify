import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import styled from "styled-components";
import useStats from "../hooks/useStats";
import { CustomError } from "../types";
import ErrorMsg from "./ErrorMsg";
import LoadingBig from "./LoadingBig";
import StatItem from "./StatItem";

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;
export default function StatsContainer() {
  const { stats, isLoading, isError, error, isSuccess } = useStats();

  const defaultStats = [
    {
      title: "pending applications",
      count: stats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats?.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return isLoading ? (
    <LoadingBig height={30} />
  ) : isError ? (
    <ErrorMsg height={30} error={error as CustomError} />
  ) : isSuccess ? (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  ) : (
    <ErrorMsg height={30} msg="No stats data found" />
  );
}
