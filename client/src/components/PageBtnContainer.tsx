import { useEffect } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.section`
  height: 6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: var(--primary-100);
    border-radius: var(--borderRadius);
  }
  .pageBtn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    transition: var(--transition);
    border-radius: var(--borderRadius);
    cursor: pointer;
  }
  .active {
    background: var(--primary-500);
    color: var(--white);
  }
  .prev-btn,
  .next-btn {
    width: 100px;
    height: 40px;
    background: var(--white);
    border-color: transparent;
    border-radius: var(--borderRadius);
    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }
`;

interface PageBtnContainerProps {
  pages: number;
}

export default function PageBtnContainer({
  pages: totalPages,
}: PageBtnContainerProps) {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentPage = Number(searchParam.get("page"));

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const nextPage = () => {
    let newPage = currentPage + 1;
    if (newPage > totalPages) {
      newPage = 1;
    }

    searchParam.set("page", newPage.toString());
    setSearchParam(searchParam);
  };

  const prevPage = () => {
    let newPage = currentPage - 1;
    if (newPage < 1) {
      newPage = totalPages;
    }

    searchParam.set("page", newPage.toString());
    setSearchParam(searchParam);
  };

  const randomPage = (pageNumber: number) => {
    searchParam.set("page", pageNumber.toString());
    setSearchParam(searchParam);
  };

  useEffect(() => {
    if (!currentPage) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  }, [currentPage, searchParam, setSearchParam]);

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pageNumbers.map((pageNumber) => {
          return (
            <button
              type="button"
              className={
                pageNumber === currentPage ? "pageBtn active" : "pageBtn"
              }
              key={pageNumber}
              onClick={() => randomPage(pageNumber)}>
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
}
