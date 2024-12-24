// import React, { useState } from 'react';
// import { IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
// import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';
// import { Loading } from '@/imports';

// export const HMTable = ({ column, data, loading, pagination }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(pagination === true ? 5 : data?.length);

//   const handleFirstPageButtonClick = (event) => {
//     setPage(0);
//   };

//   const handleBackButtonClick = (event) => {
//     setPage((prevPage) => Math.max(prevPage - 1, 0));
//   };

//   const handleNextButtonClick = (event) => {
//     setPage((prevPage) => Math.min(prevPage + 1, Math.ceil(data?.length / rowsPerPage) - 1));
//   };

//   const handleLastPageButtonClick = (event) => {
//     setPage(Math.max(0, Math.ceil(data?.length / rowsPerPage) - 1));
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event?.target?.value, 10));
//     setPage(0);
//   };

//   return (
//     <TableContainer>
//       {loading ? (
//         <Loading />
//       ) : (
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               {column?.map((column, index) => (
//                 <TableCell key={column.headerName + index}>
//                   <h3 className="p-2 text-[#718EBF] font-semibold new-xxl:w-[50%] new-xl:w-[60%] new-lg:w-[70%] new-xxl:text-lg new-lg:text-base new-xl:text-base">
//                     {column.headerName}
//                   </h3>
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//               <TableRow key={row._id}>
//                 {column?.map((column, columnIndex) => (
//                   <TableCell key={columnIndex}>
//                     <h3 className="p-2 text-[#4F4F4F] font-semibold new-xxl:w-[50%] new-xl:w-[60%] new-lg:w-[70%] new-xxl:text-lg new-lg:text-base new-xl:text-base">
//                       {column.Cell ? column.Cell({ value: row[column.accessor], row }) : row[column.accessor]}
//                     </h3>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//           {pagination &&
//             <TableFooter>
//               <TableRow>
//                 <TablePagination
//                   rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//                   colSpan={column?.length}
//                   count={data?.length}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                   ActionsComponent={() => (
//                     <div style={{ flexShrink: 0, marginLeft: '2.5rem' }}>
//                       <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
//                         <FirstPage />
//                       </IconButton>
//                       <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
//                         <KeyboardArrowLeft />
//                       </IconButton>
//                       <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}>
//                         <KeyboardArrowRight />
//                       </IconButton>
//                       <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}>
//                         <LastPage />
//                       </IconButton>
//                     </div>
//                   )}
//                 />
//               </TableRow>
//             </TableFooter>
//           }
//         </Table>
//       )}
//     </TableContainer>

//   );
// };