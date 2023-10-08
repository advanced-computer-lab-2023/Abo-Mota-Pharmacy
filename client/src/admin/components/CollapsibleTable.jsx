import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell style={{
          fontSize: '16px',
          align: 'center'
        }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{
          fontSize: '12px',
          align: 'center'
        }} component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell style={{
          fontSize: '12px',
          align: 'center'
        }}>
          {row.name}
        </TableCell>
        <TableCell style={{
          fontSize: '12px',
          align: 'center'
        }}>
          {row.dateOfBirth}
        </TableCell>
        <TableCell style={{
          fontSize: '12px',
          align: 'center'
        }}>
          {row.affiliation}
        </TableCell>
        <TableCell style={{
          fontSize: '12px',
          align: 'center'
        }}>
          {row.hourlyRate}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ ...{
              fontSize: '16px',
              align: 'center'
            }, paddingBottom: 0, paddingTop: 0 }}
          colSpan={5}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div"
              style={{fontSize: '16px'}}>
                Background
              </Typography>
              <div>
                <Typography variant="subtitle1" style={{display: 'flex', alignItems: 'center', gap: '105px'}}>
                  <p style={{fontWeight: 'bold'}}>Education</p>
                  {row.education}
                </Typography>
                <Typography variant="subtitle1" style={{display: 'flex', alignItems: 'center', gap: '80px'}}>
                  <p style={{fontWeight: 'bold'}}>Pharmacy Degree</p>
                  <Link to={`${row.degree}`}>View Degree</Link>
                </Typography>
                <Typography variant="subtitle1" style={{display: 'flex', alignItems: 'center', gap: '77px'}}>
                  <p style={{fontWeight: 'bold'}}>Working License</p>
                  <Link to={`${row.license}`}>View License</Link>
                </Typography>
                <div style={{display: 'flex', gap: '20px', marginLeft: '250px'}}>
                    <Button variant="outlined" color="success">
                      Approve
                    </Button>
                    <Button variant="outlined" color="error">
                      Reject
                    </Button>
                </div>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


Row.propTypes = {
  row: PropTypes.shape({
  }).isRequired,
};


function CollapsibleTable({ rows, headers }) {
  return (
    <TableContainer component={Paper} style={{ width: '100%', marginLeft: '20px' }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
          <TableCell style={{
              fontSize: '16px',
              align: 'center'
            }} />
            {headers.map((header, index) => (
              <TableCell key={index} style={{ fontSize: '16px', align: 'center' }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CollapsibleTable;

