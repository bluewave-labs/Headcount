import { Divider, Box,  } from '@mui/material'
import React from 'react'
import { List, ListItem, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {

    h2: {
      fontWeight: 600,
      fontFamily:'Inter',
      fontSize: '16px',
      color: '#344054',
      marginTop:'20px',
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

function MyInfoPersonal({employee}) {
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box>
          <List>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Preferred name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.preferredName}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Gender:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.gender}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Nationality:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.nationality}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Birth date:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{new Date(employee.dateOfBirth).toLocaleDateString('en-GB',{year: 'numeric', month: 'long', day: 'numeric'})}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Marital status:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.maritalStatus}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          </List>
        </Box>
        <Typography variant="h2">Address</Typography>
        <Divider></Divider>
        <Box>
          <List>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">Street:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{employee.streetAddress}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">Unit/suite:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{employee.unitSuite}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">City:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{employee.city}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">Province/state:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{employee.stateProvince}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">Country:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{employee.country}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">Postal/ZIP code:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{employee.postalZipCode}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Box>
        <Typography variant="h2">Emergency</Typography>
        <Divider component="div"></Divider>
        <Box>
          <List>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.emergencyContactName}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Relationship:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.emergencyContactRelationship}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Phone:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.emergencyContactPhoneNumber}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          
          </List>
        </Box>
      </ThemeProvider>
    </Box>
  )
}

MyInfoPersonal.propTypes = {}

export default MyInfoPersonal
