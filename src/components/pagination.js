import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

const PaginationBasic = (props) => {
  const {
    totalPages = [],
    currentPage = 1,
    handlePageChange = () => {},
    pages,
  } = props;

  console.log(props);

  return (
    <Pagination>
      <Pagination.First
        disabled={parseInt(currentPage) === 1}
        onClick={() => {
          handlePageChange(parseInt(1));
        }}
      />
      <Pagination.Prev
        disabled={parseInt(currentPage) === 1}
        onClick={() => {
          handlePageChange(parseInt(currentPage) - 1);
        }}
      />
      {totalPages.map((page) => (
        <Pagination.Item
          active={currentPage == page ? true : false}
          onClick={() => {
            handlePageChange(page);
          }}
        >
          {page}
        </Pagination.Item>
      ))}

      <Pagination.Next
        disabled={parseInt(currentPage) === pages}
        onClick={() => {
          handlePageChange(parseInt(currentPage) + 1);
        }}
      />
      <Pagination.Last
        disabled={parseInt(currentPage) === pages}
        onClick={() => {
          handlePageChange(parseInt(pages));
        }}
      />
    </Pagination>
  );
};
export default PaginationBasic;
