import React from 'react';
import { Box, CircularProgress, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';

export const HMTable = ({ columns, data, loading }) => {
  return (
    <TableContainer>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100px">
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns?.map((column) => (
                  <TableCell key={column.field}>{row[column.field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

