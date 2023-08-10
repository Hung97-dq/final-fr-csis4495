import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Box, useMediaQuery, Card, CardContent } from '@material-ui/core/';
import { grey } from '@material-ui/core/colors';
import useStyles from './styles';

const Detail = ({
    title,
    content}) => {
    const classes = useStyles();
    
    return (
        <Card
        style={{
            backgroundColor: '#fff',
            boxShadow: 'none',
            border: 'none',
            borderRadius: 0,
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

const DetailBox = ({detail}) => {
    const classes = useStyles();
    console.log(detail);
    const isNonMobile = useMediaQuery("(min-width: 768px)");
    return (
      <Box  component="div"    
      style={{
        padding:'1rem',
        backgroundColor: '#fff',
        borderRadius: '1rem',
        marginBottom: '1rem',
        
    }}>
        <Box sx={{mb:'5px'}}>
        <Typography variant="h6" 
        fontWeight="bold"
        sx={{mb:'5px'}}>
            <u>{detail.id}</u>
        </Typography>
        
        </Box>
        <Box
          display="grid"
          justifyContent="space-between"
          border='none'
          columnGap="1.33%"
          sx={{
            gridTemplateColumns:`repeat(${detail.grid}, minmax(0, 1fr))`,
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: 'none'
          }}
        >
        {detail.data.map(
            ({
                title,
                content
            }) => (
              <Detail
                title={title}
                content={content}
              />
            )
          )}
        </Box>
      </Box>
    );
  };
  
  export default DetailBox;
  