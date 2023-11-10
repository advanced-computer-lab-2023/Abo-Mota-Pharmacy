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
import BasicModal from './EmergencyModal';

const customFontStyle = {
  fontFamily: 'Your Custom Font, Arial, sans-serif', // Replace 'Your Custom Font' with your desired font
};

export default function DataTable({ rows, headers }) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [emergencyContactState, setEmergencyContact] = React.useState({
    name: '',
    relation: '',
    mobile: '',
  });
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  const handleViewEmergencyContact = (contact) => {
    handleOpen();
    setEmergencyContact(contact);
  };

  const headerValues = Object.values(headers);
  const headerKeys = Object.keys(headers);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, ...customFontStyle }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headerValues.map((header) => (
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
                {headerKeys.map((headerKey) => {
                  if (headerKey === 'emergencyContact') {
                    return (
                      <TableCell key={row._id} align="center">
                        <Button onClick={() => handleViewEmergencyContact(row[headerKey])}>
                          View
                        </Button>
                      </TableCell>
                    );
                  } else if (headerKey === 'workingLicense' || headerKey === 'pharmacyDegree') {
                    return (
                      <TableCell key={row._id} align="center">
                        <Button>View</Button>
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={row._id} align="center">
                      {row[headerKey]}
                    </TableCell>
                  );
                })}
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
      <BasicModal open={open} handleOpen={handleOpen} handleClose={handleClose} contact={emergencyContactState} />
    </div>
  );
}
