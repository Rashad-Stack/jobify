import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import styled from "styled-components";
import { useGetStatsQuery } from "../features/job/jobApi";
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
  const { data: stats } = useGetStatsQuery(undefined, {});

  const defaultStats = [
    {
      title: "pending applications",
      count: stats?.defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats?.defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats?.defaultStats?.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
}
