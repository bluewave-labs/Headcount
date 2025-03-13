import React from 'react'
import { Divider, Box,  } from '@mui/material'
import { List, ListItem, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  typography: {

    h2: {
      fontWeight: 600,
      fontFamily:'Inter',
      fontSize: '16px',
      color: '#344054',
      marginTop:'55px',
      marginBottom:'13px',
    },
   
    body1: {
      fontWeight: 600,
      fontFamily:'Inter',
      fontSize: '13px',
      color: '#344054',
    },

    body2: {
      fontWeight: 400,
      fontFamily:'Inter',
      fontSize: '13px',
      color: '#344054',
    },
   
  },
});


function MyInfoJob({employee}) {
  return (
    <Box>
       <ThemeProvider theme={theme}>
        <Box>
          <List>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6} >
                <Typography variant="body1">Hire date:</Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant="body2">{new Date(employee.hireDate).toLocaleDateString('en-GB',{year: 'numeric', month: 'long', day: 'numeric'})}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Reports to:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.Manager && `${employee.Manager.firstName} ${employee.Manager.lastName}`}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Position:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.role.roleTitle}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Office:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.officeLocation}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Employment type:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.employmentType}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          </List>
        </Box>
        <Typography variant="h2">Compensation</Typography>
        <Divider></Divider>
        <Box>
          <List>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">Compensation</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{employee.compensation}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">Compensation type</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{employee.compensationType}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">Salary</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{Number(employee.salary).toLocaleString()}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">Effective date</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{new Date(employee.hireDate).toLocaleDateString('en-GB',{year: 'numeric', month: 'long', day: 'numeric'})}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">Hours per week</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{employee.weeklyHours}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Box>
       </ThemeProvider>
    </Box>
  )
}

MyInfoJob.propTypes = {}

export default MyInfoJob
