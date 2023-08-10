import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Typography, Chip, Button } from '@material-ui/core';
import { grey, green, yellow, red, deepOrange } from '@material-ui/core/colors';


const useStyles = makeStyles({
});

const PredictionDisplay = ({details}) => {
    const [showPredict, setShowPredict] = useState(false);
  const classes = useStyles();
  const checkDefaultRate = () => {
    if(showPredict){
      setShowPredict(false)
    } else{
      setShowPredict(true)
    }
  };
  return (
    <Box sx={{ overflow: "auto", border:'none', boxShadow: 'none'}}>
        <Box style={{
        // padding:'1rem',
        backgroundColor: '#fff',
        borderRadius: '1rem',
        marginBottom: '1rem',
        paddingBottom:'1rem',
        boxShadow: 'none',
        borderBottom: "none",
        display: 'flex',
        flexDirection:'column',
    justifyContent:'space-between',
    width: '100%', display: 'table', tableLayout: 'fixed'
    }}
    >
    <Box style={{
        padding:'1rem 1rem 0rem 1rem',
        backgroundColor: '#fff',
        borderRadius: '1rem',
        boxShadow: 'none',
        borderBottom: "none",
        display: 'flex',
    justifyContent:'space-between',
    }}
    >
         <Box style={{
     width: "50%"}}>
        <Typography variant="h6" 
        fontWeight="bold"
        sx={{mb:'5px'}}>
            <u>{details.id}</u>
        </Typography>
        
        </Box>
        {details.show?"":<Box style={{
    width: "50%", display:'flex', justifyContent:'flex-end', paddingBottom:'0.2rem'}}>
        <Button color="primary" onClick={checkDefaultRate}><b><u>{showPredict?`Close the Assessment`:`Start an assessment`}</u></b></Button>
        
        </Box>}
        
</Box>
{showPredict || details.show?<>
{details.data[0].first == "0"?
    <TableContainer component={Paper} style={{borderBottom: "none",boxShadow: 'none', width:'100%'}}>
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
            <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left"><b>{details.head.eighth}</b></TableCell>
            <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left"><b>Prediction Result</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{borderBottom: "none"}}>
          {details.data.map((row) => (
            <TableRow key={row.first}>
              <TableCell component="th" scope="row"  style={{color:grey[800], fontSize:'0.8rem', borderBottom: "none"}}>  
            <b><Chip
            label="Pass"
            variant="outlined"
            style={{ border: 'none',backgroundColor: row.first == 0? green[200]: red[200],
            color: row.first == 0? green[900]: red[900]
        
        }}/></b>
              </TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem', borderBottom: "none"}} align="left">{row.second}</TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem', borderBottom: "none"}} align="left"><b><Chip
            label={row.third=="0"?"Not Default":"Default"}
            variant="outlined"
            style={{ border: 'none',backgroundColor: details.result == "0"? green[200]: red[200],
            color: details.result == "0"? green[900]: red[900]
        
        }}/></b></TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left">{row.fourth}</TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem', borderBottom: "none"}} align="left">{row.fifth}</TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem', borderBottom: "none"}} align="left">{row.sixth}</TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left">{row.seventh}</TableCell>
            <TableCell style={{color:grey[800], fontSize:'0.8rem', borderBottom: "none"}} align="left">{row.eighth}</TableCell>
            <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left"><b><Chip
            label={details.result == "0"?'Should Qualify':'Should Not Qualify'}
            variant="outlined"
            style={{ border: 'none',backgroundColor: row.third == 0? green[200]: red[200],
            color: row.third == 0? green[900]: red[900]
        
        }}/></b></TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
    :
    <Box style={{padding: '0rem'}}>
        <TableContainer component={Paper} style={{borderBottom: "none",boxShadow: 'none', width:'100%'}}>
      <Table aria-label="simple table" style={{borderBottom: "none",boxShadow: 'none'}}>
        <TableHead>
          <TableRow>
            <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}}><b>{details.head.first}</b></TableCell>
            <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left"><b>{details.head.second}</b></TableCell>
            <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left"><b>Prediction Result</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{borderBottom: "none"}}>
          {details.data.map((row) => (
            <TableRow key={row.first}>
              <TableCell component="th" scope="row"  style={{color:grey[800], fontSize:'0.8rem', borderBottom: "none"}}>  
            <b><Chip
            label="Failed"
            variant="outlined"
            style={{ border: 'none',backgroundColor: row.first == 0? green[200]: red[200],
            color: row.first == 0? green[900]: red[900]
        
        }}/></b>
              </TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem', borderBottom: "none"}} align="left">{row.second}</TableCell>
              <TableCell style={{color:grey[800], fontSize:'0.8rem',borderBottom: "none"}} align="left">
              <b><Chip
            label={details.result == "0"?'Should Qualify':'Should Not Qualify'}
            variant="outlined"
            style={{ border: 'none',backgroundColor: details.result == "0"? green[200]: red[200],
            color: details.result == "0"? green[900]: red[900]
        
        }}/></b></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    
    }</>:""}
    </Box>
    </Box>
  );
}

export default PredictionDisplay;