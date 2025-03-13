import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

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
      fontWeight: 400,
      fontFamily: 'Inter',
      fontSize: '13px',
      color: '#475467',
    },
  },
});

// Predefined color palette for pie chart segments
const predefinedColors = [
  '#7F56D9', // 1st place
  '#9E77ED', // 2nd place
  '#B692F6', // 3rd place
  '#D6BBFB', // 4th place
  '#E9D7FE', // 5th place
  '#EAECF0'  // Other
];

// Function to render the label list for the pie chart
const renderLabelList = (data) => {
  return data.map((entry, index) => (
    <Box
      key={index}
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          backgroundColor: entry.color,
          borderRadius: '50%',
          marginRight: '8px',
        }}
      />
      <Typography variant="body2">{entry.label}</Typography>
    </Box>
  ));
};

// Main component to display the employee distribution by nationality in a pie chart
export default function EmployeesNationalityGraph() {
  
  const [data, setData] = useState([]);

  // Function to fetch employee data from the API and process it for the pie chart
  const fetchEmployee = async () => {
    try {
      let response = await api.employee.fetchSummaryByNationalities();
      const nationalities = response;

      // Calculate total count of all employees
      const totalEmployees = nationalities.reduce((acc, nationality) => 
        acc + parseInt(nationality.value, 10), 0);
    
      // Prepare data for the pie chart
      let pieData = nationalities.map((nationality, index) =>({
        id: index,
        label: nationality.label,
        value: (parseInt(nationality.value, 10) / totalEmployees) * 100,
      }));

      // Sort the data by value (descending) and by label (alphabetically)
      if( !pieData.label=== 'Other' ) {
      pieData.sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
      }
      
      // Select the top 5 roles and group the rest under "Other"
      const top5Data = pieData.slice(0, 5);
      const otherValue = pieData.slice(5).reduce((acc, item) => acc + item.value, 0);

      if (otherValue > 0) {
        top5Data.push({ id: 8, label: 'Other', value: otherValue });
      }

      // Assign colors to the pie chart slices
      top5Data.forEach((item, index) => {
        item.color = predefinedColors[index] || '#EAECF0';
      });

      
      // Set the data for the pie chart
      setData(top5Data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <Card
      sx={{
        border: '1px solid #EAECF0',
        borderRadius: '12px',
        boxShadow: 'none',
        width: '360px',
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
            Employees by nationality
          </Typography>
        </ThemeProvider>

        <PieChart
          series={[
            {
              data: data,
              innerRadius: 44,
              outerRadius: 88,
              cornerRadius: 0,
              startAngle: 0,
              endAngle: 360,
              cx: 120,
              cy: 120,
            },
          ]}
          width={240}
          height={240}
          slotProps={{
            legend: { hidden: true },
          }}
        />
      </Box>

      <Box
        sx={{
          marginLeft: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {renderLabelList(data)}
      </Box>
    </Card>
  );
}
