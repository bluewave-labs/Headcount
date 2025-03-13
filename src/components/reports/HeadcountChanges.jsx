
import React, { useEffect,useState } from 'react';
import { Card, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
//import axios from 'axios';
import { Select, MenuItem, FormControl,InputBase, styled} from '@mui/material';

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
      fontWeight: 400,
      fontFamily: 'Inter',
      fontSize: '13px',
      color: '#475467',
    },

    body3: {
      fontWeight: 550,
      fontFamily: 'Inter',
      fontSize: '12px',
      color: '#475467',
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
    paddingLeft: '10px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: 'Inter',
    '&:focus': {
      borderRadius: 8,
      borderColor: '#D0D5DD',
    },
  },
}));


// const getAllEmployeesAPI = async ()=> {
//   const res = await fetch('http://localhost:5000/api/employees', {
//     method:'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   });
//   const result = await res.json();
//   return result
// }

const xLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const years = Array.from({ length: 6 }, (_, i) => 2016 + i);


export default function HeadcountChanges() {
  const [cumulativeHireStats, setCumulativeHireStats] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2016);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/api/employees'); // Adjust the endpoint as needed
    
        // const employeeData = await api.employee.fetchAll()
        const cumulativeData = await api.employee.fetchHeadCounts(selectedYear)
        console.log("cumulativeData")
        console.log(cumulativeData.pData)
        setCumulativeHireStats(cumulativeData.pData);
      

      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };


  
const pData = cumulativeHireStats
// const pData = [headcount,headcount,headcount,headcount,headcount,headcount,headcount,headcount,headcount,headcount,headcount,headcount];
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
        padding: '24px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0px' }}>
          <Typography variant="h2" className="header" gutterBottom>
          Cumulative headcount
          </Typography>
          <FormControl sx={{ width: '70px' }}>
                <Select 
                  value={selectedYear} 
                  onChange={handleYearChange} 
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
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
        </Box> 
        
    
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <LineChart
              series={[
                {
                  data: pData,
                  showMark: false,
                  color: '#7F56D9',
                },
              ]}
              xAxis={[{ scaleType: 'point', data: xLabels }]}
              yAxis={[{ label: ''}]} 
              width={500}
              height={230}
              grid={{ horizontal: true }}
              leftAxis={{
                disableLine: true,
                disableTicks: true,
                labelStyle: {
                  fontSize: 12,
                  color: '#475467',
                },
                tickValues: Array.from({length: 11}, (_, i) => i * 10), 
                tickLabelStyle: {
                  textAnchor: 'end',
                  fontSize: 12,
                  color: '#475467',
                },
              }}
              bottomAxis={{
                disableLine: true,
                disableTicks: true,
                labelStyle: {
                  fontSize: 25,
                  color: '#7F56D9',
                },
                tickLabelStyle: {
                  textAnchor: 'start',
                  fontSize: 12,
                  color: '#475467',
                },
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
              Number of employees
            </Typography>

            <Typography
              variant="body3"
              sx={{
                position: 'absolute',
                bottom: '0%',
                left: '244px', 
                transform: 'translateY(-70%)',
               
              }}
            >
              Months
            </Typography>
          </Box>
        </ThemeProvider>
      </Box>
    </Card>
  );
}
