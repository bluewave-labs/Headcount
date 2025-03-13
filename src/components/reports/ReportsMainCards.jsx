import { Box, Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import EmployeesDepartmentGraphs from './EmployeesDepartmentGraphs';
import RecentPromotions from './RecentPromotions';
import WeeklyNewEmp from './WeeklyNewEmp';
import EmployeesRoleGraph from './EmployeesRoleGraph';
import HeadcountChanges from './HeadcountChanges';

// Customizing CardContent with additional padding
const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: '24px 24px 24px 24px',
   
}));

// Main Task component that contains the layout
function ReportsMainCards(props) {
    // Components arranged based on their size
    const tasks = [
        { id: 1, component: <EmployeesDepartmentGraphs />, type: 'small' },
        { id: 2, component: <EmployeesRoleGraph />, type: 'small' },
        { id: 3, component: <HeadcountChanges />, type: 'large' },
        { id: 4, component: <RecentPromotions />, type: 'large' },
        { id: 5, component: <WeeklyNewEmp />, type: 'large' },
    ];

    return (
        <Card
            sx={{
                border: '1px solid #EBEBEB',
                borderRadius: '5px',
                boxShadow: 'none',
                overflowX: 'auto',                    
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '1181px',
                    //maxWidth: '1181px', 
                    overflowX: 'auto',
                    
                }}
            >
                <StyledCardContent >
                    <Grid container 
                    //spacing={5} 
                    
                    justifyContent="center" >
                        {/* First Row: Small component on the left, Large on the right */}
                        <Grid item>
                            <Box sx={{ width: '533px', marginRight: '20px', marginTop:'20px',  marginBottom:'20px'  }}>
                                
                                {tasks[0].component} {/* Small component on the left */}
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ width: '533px', marginLeft: '20px' , marginTop:'20px' ,  marginBottom:'20px' }}>
                                {tasks[2].component} {/* Large component on the right */}
                            </Box>
                        </Grid>

                        {/* Second Row: Small component on the left, Large on the right */}
                        <Grid item>
                            <Box sx={{ width: '533px',marginRight: '20px', marginTop:'20px', marginBottom:'20px' }}>
                               
                                {tasks[1].component} {/* Small component on the left */}
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ width: '533px', marginLeft: '20px' , marginTop:'20px'  ,  marginBottom:'20px' }}>
                                {tasks[3].component} {/* Large component on the right */}
                            </Box>
                        </Grid>

                        {/* Third Row: Only Large component on the right */}
                        <Grid item>
                            <Box sx={{ width: '533px' , marginRight: '20px', marginTop:'20px',  marginBottom:'20px' }}>
                                {/* Empty to balance grid */}
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ width: '533px', marginLeft: '20px' , marginTop:'20px' ,  marginBottom:'20px'  }}>
                                {tasks[4].component} {/* Large component on the right */}
                            </Box>
                        </Grid>
                    </Grid>
                </StyledCardContent>
            </Box>
        </Card>
    );
}

ReportsMainCards.propTypes = {};

export default ReportsMainCards;
