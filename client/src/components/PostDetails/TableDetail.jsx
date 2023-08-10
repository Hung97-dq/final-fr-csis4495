import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Typography, Chip } from '@material-ui/core';
import { grey, green, yellow, red, deepOrange } from '@material-ui/core/colors';


const useStyles = makeStyles({
});

const TableDetail = ({details}) => {
  const classes = useStyles();

  return (
    <Box sx={{ overflow: "auto", border:'none', boxShadow: 'none'}}>
    <Box style={{
        paddingBottom:'1rem',
        backgroundColor: '#fff',
        borderRadius: '1rem',
        marginBottom: '1rem',
        boxShadow: 'none',
        borderBottom: "none",
    }}
    sx={{ width: "100%", display: "table", tableLayout: "fixed", borderBottom: "none", boxShadow: 'none' }}>
         <Box style={{ margin: '1rem 1rem 0rem 1rem'}}>
        <Typography variant="h6" 
        fontWeight="bold"
        sx={{mb:'5px'}}>
            <u>{details.id}</u>
        </Typography>
        </Box>
    <TableContainer component={Paper} style={{overflow: "auto", borderBottom: "none",boxShadow: 'none'}}>
      <Table aria-label="simple table" style={{borderBottom: "none",boxShadow: 'none'}}>
        <TableHead>
          <TableRow>
            <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}}><b>{details.head.first}</b></TableCell>
            <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left"><b>{details.head.second}</b></TableCell>
            <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left"><b>{details.head.third}</b></TableCell>
            <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left"><b>{details.head.fourth}</b></TableCell>
            <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left"><b>{details.head.fifth}</b></TableCell>
            <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left"><b>{details.head.sixth}</b></TableCell>
            <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left"><b>{details.head.seventh}</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{borderBottom: "none"}}>
          {details.data.map((row) => (
            <TableRow key={row.first}>
              <TableCell component="th" scope="row"  style={{color:grey[800], fontSize:'0.8rem', borderBottom: "none"}}>
                {row.first}
              </TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem', borderBottom: "none"}} align="left">{row.second}</TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem', borderBottom: "none"}} align="left">{row.third}</TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left">{row.fourth}</TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem', borderBottom: "none"}} align="left">{row.fifth}</TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem', borderBottom: "none"}} align="left">{details.head.sixth == 'Filter Status'?
            <b><Chip
            label={row.sixth}
            variant="outlined"
            style={{ border: 'none',backgroundColor: row.sixth === "Pass"? green[200]: red[200],
            color: row.sixth === "Pass"? green[900]: red[900]
        
        }}
          /></b> :<>{row.sixth}</>}</TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left"><b>
            {details.head.seventh == 'Status'?
            <Chip
            label={row.seventh}
            variant="outlined"
            style={{ border: 'none',backgroundColor: row.seventh === "Fully Paid"? green[200]: row.seventh === "Current" ? yellow[200]: red[200],
            color: row.seventh === "Fully Paid"? green[900]: row.seventh === "Current" ? yellow[900]: red[900]
        
        }}
          /> : details.head.seventh == 'Risk'? 
          <Chip
            label={row.seventh}
            variant="outlined"
            style={{ border: 'none',backgroundColor: row.seventh === "Low"? green[200]: row.seventh === "Medium" ? yellow[200]: row.seventh === "Moderate"?deepOrange[200]: row.seventh === "No data"?grey[200]:red[200],
            color: row.seventh === "Low"? green[900]: row.seventh === "Medium" ? yellow[900]: row.seventh === "Moderate"?deepOrange[900]:row.seventh === "No data"?grey[800]:red[900],
        
        }} /> 
          :<>{row.seventh}</>
             }
              </b>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box></Box>
  );
}

export default TableDetail;