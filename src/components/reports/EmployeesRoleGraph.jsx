import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
        marginBottom: '8px' 
      }}
    >
      {/* Colored circle representing the pie chart segment */}
      <Box 
        sx={{ 
            width: 10, 
            height: 10, 
            backgroundColor: entry.color, 
            borderRadius: '50%', 
            marginRight: '8px',
            flexShrink: 0,
          }} 
      />
      {/* Label text for the pie chart segment */}
      <Typography variant="body2">{entry.label}</Typography>
    </Box>
  ));
};

// Main component to display the employee distribution by role in a pie chart
function EmployeesRoleGraph() {

  const [data, setData] = useState([]);

  // Function to fetch employee data from the API and process it for the pie chart
  const fetchEmployeesRole = async () => {
    try {
      const response = await api.employee.fetchSummaryByJobTitles();
      const employeesRole = response;
  
      // Calculate total count of all employees
      const totalEmployees = employeesRole.reduce((acc, role)  => 
        acc + parseInt(role.count, 10), 0);
    
      // Prepare data for the pie chart
      let pieData = employeesRole.map((role, index) =>({
        id: index,
        label: role.roleTitle,
        value: Math.round((parseInt(role.count, 10) / totalEmployees) * 100),
      }));

      // Sort the data by value (descending) and by label (alphabetically)
      pieData.sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));

      // Select the top 5 roles and group the rest under "Other"
      const top5Data = pieData.slice(0, 5);
      const otherValue = pieData.slice(5).reduce((acc, item) => acc + item.value, 0);

      if (otherValue > 0) {
        top5Data.push({ id: 7, label: 'Other', value: otherValue });
      }

      // Assign colors to the pie chart slices
      top5Data.forEach((item, index) => {
        item.color = predefinedColors[index] || '#EAECF0';
      });

      // Set the data for the pie chart
      setData(top5Data);

    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployeesRole();
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
      
        <Typography variant="h2" className="header">
          Employees by role
        </Typography>
     
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row', 
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            //alignItems: 'center',
          }}
        >

          <PieChart
            series={[
              {
                data: data,
                innerRadius: 35,
                outerRadius: 80,
                cornerRadius: 0,
                startAngle: 0,
                endAngle: 360,
                cx: 75,
                cy: 120,
              },
            ]}
            width={250}
            height={250}
            slotProps={{
              legend: { hidden: true },
            }}
          />
      
        </Box>

        <Box
          sx={{
            marginLeft: '0px',
            width:'207px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {renderLabelList(data)}
        </Box>
      </Box>

    </Card>
    </ThemeProvider>
  )
}

EmployeesRoleGraph.propTypes = {}

export default EmployeesRoleGraph
