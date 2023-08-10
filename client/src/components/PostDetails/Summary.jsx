import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Box, useMediaQuery, Card, CardContent, Chip, AccordionDetails } from '@material-ui/core/';
import { green, grey, red, yellow } from '@material-ui/core/colors';
import useStyles from './styles';

const SummaryElement = ({
    title,
    content}) => {
    const classes = useStyles();
    
    return (
        <Card
        style={{
            backgroundColor: '#fff',
            boxShadow: 'none',
            borderLeft: '1px',
            borderRadius: 0,
            borderLeft: `solid 1px ${grey[400]}`, paddingLeft: '0.5rem'
          }}
      >
        <CardContent
        style={{
            padding: '1rem 0.25rem 1rem 0'
          }}>
          <Typography variant="p" component="div" style={{color:grey[800], fontSize:'0.8rem'}}>
          {title}
          </Typography>
          <Typography variant="p" style={{color:grey[800], fontSize:'1rem'}}>
          <b>{content}</b>
          </Typography>
          </CardContent>
      </Card>
    );
  };

const Summary = ({detail}) => {
    const classes = useStyles();
    console.log(detail);
    const isNonMobile = useMediaQuery("(min-width: 767px)");
    const isNonTablet = useMediaQuery("(min-width: 1023px)");
    return (
      <Box  component="div"    
      style={{
        padding:'1rem',
        backgroundColor: '#fff',
        borderRadius: '1rem',
        marginBottom: '1rem',
        
    }}>
        <Box
          display="grid"
          justifyContent="space-between"
          style = {{
            alignItems:'center'
          }}
          border='none'
          columnGap="1.33%"
          sx={{
            gridTemplateColumns:`repeat(${isNonMobile ? isNonTablet?detail.grid+3:detail.grid+4:detail.grid+3}, minmax(0, 1fr))`,
            "& > div": { gridColumn: isNonMobile ? isNonTablet?undefined : "span 2" : "span 7" },
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: 'none'
          }}
        >
            <Box>
        <Typography variant="h6" 
        fontWeight="bold"
        style={{color:grey[800], fontSize:'0.8rem'}}
        sx={{mb:'5px', }}>
            {detail.id}
        </Typography>
        <Typography variant="p" 
        fontWeight="bold"
        style={{color:grey[800], fontSize:'1rem'}}
        sx={{mb:'5px'}}>
            <b>{detail.subid}</b>
        </Typography>
        </Box>
        {detail.data.map(
            ({
                title,
                content
            }) => (
              <SummaryElement
                title={title}
                content={content}
              />
            )
          )}
          {detail.result!= ""?<Box style={{display:'flex',justifyContent: isNonMobile ?'center': 'flex-start', paddingTop:isNonMobile ?'0':'1rem' }}><b>
        <Chip
            label={detail.result == "0"?'Should Qualify':'Should Not Qualify'}
            variant="outlined"
            style={{ border: 'none',backgroundColor: detail.result == "0"? green[200]: red[200],
            color: detail.result == "0"? green[900]: red[900],
        alignItems:"center"
        }} /></b>
        </Box>:<Box></Box>}
          
          <Box style={{display:'flex',justifyContent: isNonMobile ? 'center': 'flex-start',paddingTop:isNonMobile ?'0':'1rem' }}><b>
        <Chip
            label={detail.status}
            variant="outlined"
            style={{ border: 'none',backgroundColor: detail.status === "Assessed"? green[200]: detail.status === "Pending" ? yellow[200]:red[200],
            color: detail.status === "Assessed"? green[900]: detail.status === "Pending" ? yellow[900]:red[900],
        
        }} /></b>
        </Box>
        </Box>
      </Box>
    );
  };
  
  export default Summary;
  