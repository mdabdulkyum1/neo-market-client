import axios from 'axios';
import { useEffect, useState } from 'react';

interface UserCountResponse {
  count: number;
}

const useUserPagination = () => {
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  // const [itemsPerPage, setItemsPerPage] = useState<number>(6);

  const numberOfPages = Math.ceil(count / 10);

  useEffect(() => {
    const getCount = async () => {
      try {
        const { data } = await axios.get<UserCountResponse>(
          `${import.meta.env.VITE_server_url}/user-count`
        );
        setCount(data.count);
      } catch (err) {
        console.error(err);
      }
    };
    getCount();
  }, []); // fetch count once

  const generatePagination = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const startPage = Math.max(1, currentPage + 1 - 2);
    const endPage = Math.min(numberOfPages, currentPage + 1 + 2);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...'); // left ellipsis
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < numberOfPages) {
      if (endPage < numberOfPages - 1) pages.push('...'); // right ellipsis
      pages.push(numberOfPages);
    }

    return pages;
  };

  const handlePrevBtn = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextBtn = () => {
    if (currentPage < numberOfPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    count,
    currentPage,
    numberOfPages,
    pages: generatePagination(),
    setCurrentPage,
    handlePrevBtn,
    handleNextBtn,
  };
};

export default useUserPagination;
