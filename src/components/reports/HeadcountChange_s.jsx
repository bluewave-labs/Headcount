import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LineChart, areaElementClasses } from '@mui/x-charts/LineChart';
import { useYScale, useDrawingArea } from '@mui/x-charts/hooks';
import { green } from '@mui/material/colors';

const theme = createTheme({
    typography: {
      h2: {
        fontWeight: 600,
        fontFamily: 'Inter',
        fontSize: '16px',
        color: '#101828',
        marginTop: '24px',
        marginLeft: '24px',
      },
      body1: {
        fontWeight: 600,
        fontFamily: 'Inter',
        fontSize: '13px',
        color: '#344054',
      },
      body2: {
        fontWeight: 400,
        fontFamily: 'Inter',
        fontSize: '13px',
        color: '#475467',
      },
    },
  });

const data = [50, 40, 55, 60, 57, 63, 68, 77,80,75,73,81];
// const xData = [0, 40, 30, 10, 50, 30, 25, 40,30,50,11,20];
const xData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ColorPalette({ id }) {
    const { top, height, bottom } = useDrawingArea();
    const svgHeight = top + bottom + height;
    const scale = useYScale(); // You can provide the axis Id if you have multiple ones
  
    return (
      <defs>
        <linearGradient
          id={id}
          x1="0"
          x2="0"
          y1="0"
          y2={`${svgHeight}px`}
          gradientUnits="userSpaceOnUse" // Use the SVG coordinate instead of the component ones.
        >
          <stop offset={scale(100) / svgHeight} stopColor={green[400]} stopOpacity={1} />
          <stop offset={scale(0) / svgHeight} stopColor={green[50]} stopOpacity={1} />
        </linearGradient>
      </defs>
    );
  }

export default function HeadcountChanges() {
    
  
  return (
    <Card
      sx={{
        border: '1px solid #EAECF0',
        borderRadius: '12px',
        boxShadow: 'none',
        width: '532px',
        height: '296px',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        padding: '24px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography variant="h2" className="header">
            Headcount changes
          </Typography>
          <LineChart
            
            
            xAxis={[{ data: xData, label:"Month",scaleType: 'point',}]}
            yAxis={[{ min: 0, max: 100,label: 'Number of employees' }]}
            series={[{ curve: 'natural', data, showMark: false, area: false, color: '#7F56D9' }]}
            width={400}
            height={300}
            // margin={{ top: 5, bottom: 22, left: 0 }}
            sx={{
                [`& .${areaElementClasses.root}`]: {
                fill: 'url(#swich-color-id-2)',
                },
            }}
        >
            
        </LineChart>
        </ThemeProvider>

        
      </Box>

      <Box
        sx={{
          marginLeft: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >

        
       
      </Box>
    </Card>
  )
}

 