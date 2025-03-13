import * as React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import HRMButtonGroup from '../ButtonGroup/HRMButtonGroup';
import { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
//mport { GridOverlay } from '@mui/x-data-grid';

const api = require("../../assets/FetchServices");

// Custom theme for typography styles
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
    },
  },
});

// Function to render the list
const columns = (employeeMap) => [
  {
    field: 'empId',
    headerName: 'Employee',
    width: 130,
    editable: false,
    renderCell: (params) => {
      const employee = employeeMap[params.value];
      return (
        <Typography variant="body2">
          {employee ? `${employee.firstName} ${employee.lastName}` : params.value}
        </Typography>
      );
    },
  },
  {
    field: 'change',
    headerName: 'Change',
    width: 215,
    editable: false,
    renderCell: (params) => {
        const [changeFrom, changeTo] = params.value.split('\n').map(line => line.split(': ')[1]);
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }} key="change-from">
                <Typography variant="body5">
                From:&nbsp;
                </Typography>
                <Typography variant="body1">
                {changeFrom}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }} key="change-to">
                <Typography variant="body5">
                To:&nbsp;
                </Typography>
                <Typography variant="body1">
                {changeTo}
                </Typography>
            </Box>
          </Box>
        );
      },
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 111,
    editable: false,
    renderCell: (params) => (
        <Box sx={{ border: '1px solid #EAECF0', backgroundColor:'#F9FAFB', borderRadius:'9999px', width:'87px', height:'22px', display: 'flex', alignItems: 'center',justifyContent: 'center' }}>
        <Typography variant="body4">
          {params.value}
        </Typography>
        </Box>
      ),
  },
];


function RecentPromotions(props) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('Last 6 months');
    const [employeeMap, setEmployeeMap] = useState({});
  
    const filterData = useCallback((data, period) => {
      const now = dayjs();
      let filtered = [];
  
      // Filters data based on the selected period, either 'Last 6 months' or 'Last year'.
      if (period === 'Last 6 months') {
        const sixMonthsAgo = now.subtract(6, 'month');
        filtered = data.filter(item => dayjs(item.date).isAfter(sixMonthsAgo));
      } else if (period === 'Last year') {
        const lastYear = now.subtract(1, 'year');
        filtered = data.filter(item => dayjs(item.date).isAfter(lastYear));

      }
  
      setFilteredData(
        filtered.map(item => ({
          id: item.id,
          empId: item.empId,
          change: `From: ${item.changeFrom} \n To: ${item.changeTo}`,
          date: dayjs(item.date).format('YYYY-MM-DD'),
        }))
     
      );
      
    }, []);
  
  
    // Function to fetch employee data and changeHistory data from different APIs.
    const fetchHistory = useCallback(async () => {
      try {
        const [historyResponse, employeeResponse] = await Promise.all([
          api.changeHistory.fetchAll(),
          api.employee.fetchAll()
        ]);

        // Prepare and map employee data for the table, then filter history data for the 'Last 6 months' period.
        const employeeMap = employeeResponse.reduce((map, employee) => {
          map[employee.empId] = employee;
          return map;
        }, {});
        console.log({employeeMap});
      

        setEmployeeMap(employeeMap);
        setData(historyResponse);
        filterData(historyResponse, 'Last 6 months');

      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    }, [filterData]);
  
    useEffect(() => {
      fetchHistory();
    }, [fetchHistory]);
  
    useEffect(() => {
      console.log('Selected period changed:', selectedPeriod);
      filterData(data, selectedPeriod);
    }, [selectedPeriod, data, filterData]);
    const handlePeriodChange = (period) => {
        console.log('Button clicked', period);
        setSelectedPeriod(period);
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <Typography variant="h2" className="header">
            Recent promotions
          </Typography>
          <HRMButtonGroup
            buttonLabels={['Last 6 months', 'Last year']}
            onClick={(label) => handlePeriodChange(label)}
            key={"filter-button"}
          />
          
        </Box>
        <Box sx={{ position: 'relative', width: '100%', height: '230px'  }}>
          <DataGrid
            
            componentsProps={{
              columnHeaders: {
                style: {
                  height: '44px',
                },
              },
              row: {
                style: {
                  height: '44px',
                },
              },
            }}
            sx={{
              
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                typography: 'body3',
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#F9FAFB',
                typography: 'body3',
              },
              '& .MuiDataGrid-filler': {
                backgroundColor: '#F9FAFB',
              },
              '& .MuiDataGrid-scrollbarFiller': {
                backgroundColor: '#F9FAFB',
              },
              // '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
              //   width: '10px',  // Kaydırma çubuğunun genişliği
              //   height: '8px',  // Kaydırma çubuğunun yüksekliği
              // },
              '& .MuiDataGrid-row': {
                backgroundColor: '#FFFFFF',
                typography: 'body2',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#F1F1F1',
              },
              '& .MuiDataGrid-cell': {
                typography: 'body2',
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'pre-line',
              },
              '& .MuiDataGrid-overlay': {
                backgroundColor: '#F9FAFB',  
                color: '#475467', 
                fontWeight: 550,          
                fontSize: '13px',            
                fontFamily: 'Inter',       
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}
            columnHeaderHeight={44}
            rowHeight={72}
            rows={filteredData}
            columns={columns(employeeMap)}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 50,
                },
              },
            }}
            pageSizeOptions={[50]}
            disableRowSelectionOnClick
            localeText={{
              noRowsLabel: "No data to display",
            }}
          />
        </Box>
      </ThemeProvider>
    </Box>
  </Card>
  )
}

RecentPromotions.propTypes = {}

export default RecentPromotions
