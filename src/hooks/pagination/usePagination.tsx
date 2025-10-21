// import axios from "axios";
// import { useEffect, useState } from "react";

// type PageItem = number | "...";

// interface UsePaginationReturn {
//   count: number;
//   currentPage: number;
//   numberOfPages: number;
//   pages: PageItem[];
//   setCurrentPage: (page: number) => void;
//   handelPrevBtn: () => void;
//   handelNextBtn: () => void;
// }

// const usePagination = (): UsePaginationReturn => {
//   const [count, setCount] = useState<number>(0);
//   const [currentPage, setCurrentPage] = useState<number>(0);
//   // const [itemPerPage, setItemPerPage] = useState<number>(6);

//   const numberOfPages = Math.ceil(count / 10);

//   useEffect(() => {
//     const getCount = async () => {
//       try {
//         const { data } = await axios.get<{ count: number }>(
//           `${import.meta.env.VITE_server_url}/count`
//         );
//         setCount(data.count);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getCount();
//   }, []);

//   const generatePagination = (): PageItem[] => {
//     const pages: PageItem[] = [];
//     const startPage = Math.max(0, currentPage + 1 - 2);
//     const endPage = Math.min(numberOfPages, currentPage + 1 + 2);

//     if (startPage > 1) {
//       pages.push(1);
//       if (startPage > 2) pages.push("..."); // left ellipsis
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }

//     if (endPage < numberOfPages) {
//       if (endPage < numberOfPages + 1) pages.push("..."); // right ellipsis
//       pages.push(numberOfPages);
//     }

//     return pages;
//   };

//   const handelPrevBtn = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handelNextBtn = () => {
//     if (currentPage < numberOfPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return {
//     count,
//     currentPage,
//     numberOfPages,
//     pages: generatePagination(),
//     setCurrentPage,
//     handelPrevBtn,
//     handelNextBtn,
//   };
// };

// export default usePagination;
