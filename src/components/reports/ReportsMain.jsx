import Stack from '@mui/system/Stack';
import React, { useContext } from "react";
import { Box } from '@mui/material';
import StateContext from "../../context/StateContext";
import ReportsMainCards from './ReportsMainCards';


export default function ReportsMain(style) {
    
    const stateContext = useContext(StateContext);
    const user = stateContext.state.user;

    // Check if the user is an Admin or a Manager
    const isAdmin = user && user.permission.id === 1;
    const isManager = user && user.permission.id === 2;

    // Conditionally render content if the user is an Admin or Manager
    if (!isAdmin && !isManager) {
        // Return null or any other fallback content if the user is neither Admin nor Manager
        return null;
    }

    return (

        <Box >
            {/*Main page content*/}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                
            >
                <h2 style={{
                    fontSize:'24px', 
                    fontFamily:'Inter', 
                    fontWeight:'600',
                    color:'#101828',
                    marginTop:"0px",
                    marginBottom: "16px",
                    }}
                >
                    Reports
                </h2>
                
            </Stack>
            <ReportsMainCards/>
        </Box>
    );
};

ReportsMain.propTypes = {};

