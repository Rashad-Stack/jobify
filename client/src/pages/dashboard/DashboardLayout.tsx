import styled from "styled-components";
import BigSideBar from "../../components/BigSideBar";
import Navbar from "../../components/Navbar";
import SmallSidebar from "../../components/SmallSidebar";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;

interface DashboardLayoutProps {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSideBar />
        <div>
          <Navbar />
          <div className="dashboard-page">{children}</div>
        </div>
      </main>
    </Wrapper>
  );
}
