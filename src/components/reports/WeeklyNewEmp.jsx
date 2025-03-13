import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Card, FormControl, ThemeProvider, createTheme } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Select, MenuItem, InputBase, styled } from '@mui/material';
import { Typography, Box } from '@mui/material';

const api = require("../../assets/FetchServices");

const theme = createTheme({
  typography: {
    h2: {
      fontWeight: 600,
      fontFamily: 'Inter',
      fontSize: '16px',
      color: '#101828',
    },
    body1: {
      fontWeight: 600,
      fontFamily: 'Inter',
      fontSize: '13px',
      color: '#344054',
    },
    body2: {
      fontWeight: 550,
      fontFamily: 'Inter',
      fontSize: '14px',
      color: '#101828',
    },
    body3: {
      fontWeight: 550,
      fontFamily: 'Inter',
      fontSize: '12px',
      color: '#475467',
    },
    body4: {
      fontWeight: 550,
      fontFamily: 'Inter',
      fontSize: '12px',
      color: '#344054',
    },
    body5: {
      fontWeight: 400,
      fontFamily: 'Inter',
      fontSize: '13px',
      color: '#344054',
      marginLeft: '10px',
    },
    body6: {
      fontWeight: 400,
      fontFamily: 'Inter',
      fontSize: '13px',
      color: '#667085',
      marginLeft: '2px',
      padding: '9px, 10px, 9px, 10px',
    },
  },
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  height: '34px',
  marginBottom: '0px',
  marginTop: '0px',
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #D0D5DD',
    fontSize: 13,
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    //padding: '8px 12px',
    paddingLeft: '10px',
    fontFamily: 'Inter',
    '&:focus': {
      borderRadius: 8,
      borderColor: '#D0D5DD',
    },
  },
}));

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const years = Array.from({ length: 6 }, (_, i) => 2016 + i);

function WeeklyNewEmp(props) {
  const [hireStats, setHireStats] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2016);

  const getWeeklyNewEmployees = (employees, year, month) => {
    const startOfMonth = new Date(Date.UTC(year, month - 1, 1));  // Adjusted month
    const endOfMonth = new Date(Date.UTC(year, month, 0));

    const weeks = [];
    let currentDate = new Date(startOfMonth);

    while (currentDate <= endOfMonth) {
      const startOfWeek = new Date(currentDate);
      const endOfWeek = new Date(currentDate);
      endOfWeek.setUTCDate(endOfWeek.getUTCDate() + 6);

      const weeklyCount = employees.filter((employee) => {
        const hireDate = new Date(employee.hireDate);
        return hireDate >= startOfWeek && hireDate <= endOfWeek;
      }).length;

      weeks.push({
        counts: weeklyCount,
        week: startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      });

      currentDate.setUTCDate(currentDate.getUTCDate() + 7);
    }

    return weeks.slice(0, 5);
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const employeeData = await api.employee.fetchAll();
        const weeklyData = getWeeklyNewEmployees(employeeData, selectedYear, selectedMonth);
        setHireStats(weeklyData);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [selectedMonth, selectedYear]);



  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

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
        flexDirection: 'column', 
        padding: '24px' 
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center' 
        }}
      >
        <ThemeProvider theme={theme}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '0px' 
            }}
          >
            <Typography variant="h2" className="header">
              Weekly new headcount hange
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ width: '70px' }}>
                <Select 
                  value={selectedMonth} 
                  onChange={handleMonthChange} 
                  input={<BootstrapInput />} 
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        "& .MuiMenuItem-root": {
                          "&:hover": {
                            backgroundColor: "transparent", 
                          },
                        
                          '&.Mui-focused': {
                                  backgroundColor: "transparent !important",
                              },
                          "&.Mui-selected": {
                            backgroundColor: "transparent !important", 
                            "&:hover": {
                              backgroundColor: "transparent !important", 
                            },
                            "&:active": {
                            backgroundColor: "transparent !important", 
                            },
                          },
                        },
                     },
                    }
                  }}
                >
                  {months.map((month, index) => (
                    <MenuItem key={month} value={index + 1}>{month}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: '70px' }}>
                <Select 
                  value={selectedYear}
                  onChange={handleYearChange} 
                  input={<BootstrapInput />} 
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        "& .MuiMenuItem-root": {
                          "&:hover": {
                            backgroundColor: "transparent", 
                          },
                        
                          '&.Mui-focused': {
                                  backgroundColor: "transparent !important",
                              },
                          "&.Mui-selected": {
                            backgroundColor: "transparent !important", 
                            "&:hover": {
                              backgroundColor: "transparent !important", 
                            },
                            "&:active": {
                            backgroundColor: "transparent !important", 
                            },
                          },
                        },
                     },
                    }
                  }}
                  displayEmpty
                  >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ position: 'relative', width: '100%', height: '250px', display: 'flex', alignItems: 'center' }}>
            <BarChart
              dataset={hireStats}
              xAxis={[{ scaleType: 'band', dataKey: 'week' }]}
              {...{
                yAxis: [
                  { label: '', min: 0, max: 5, ticks: [0, 1, 2], tickCount: 3, tickFormat: (value) => value },
                ],
                series: [{ dataKey: 'counts', color: '#7F56D9' }],
                width: 500,
                height: 240,
                sx: { [`& .${axisClasses.directionY} .${axisClasses.label}`]: { transform: 'translateX(-10px)' } },
              }}
              leftAxis={{
                disableLine: true,
                disableTicks: true,
                labelStyle: { fontSize: 12, color: '#475467' },
                tickValues: Array.from({ length: 11 }, (_, i) => i * 10),
                tickLabelStyle: { textAnchor: 'end', fontSize: 12, color: '#475467' },
              }}
            />
            <Typography
              variant="body3"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '-60px', 
                transform: 'translateY(-50%) rotate(-90deg)',
               
              }}
            >
              Weekly head counts
            </Typography>
          </Box>
        </ThemeProvider>
      </Box>
    </Card>
  );
}

export default WeeklyNewEmp;
