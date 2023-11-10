import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

export default function DataTable({ rows, headers }) {
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell align="center" key={header}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {Object.keys(row).map((key) => (
                  <TableCell key={key} align="center">
                    {key === 'emergencyContact' ||
                    key === 'healthPackage' ||
                    key === 'appointments' ? (
                      <Button onClick={() => handleRowClick(row[key])}>
                        View
                      </Button>
                    ) : (
                      row[key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRow && (
        <Dialog open={true} onClose={handleCloseModal}>
          <DialogTitle>Details</DialogTitle>
          <DialogContent>
            {Object.keys(selectedRow).map((key) => (
              <div key={key}>
                <DialogContentText>
                  <strong>{key}:</strong> {selectedRow[key]}
                </DialogContentText>
              </div>
            ))}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
