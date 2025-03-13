import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import SelectItem from './SelectItem';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../assets/Styles';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const axios = require('axios');

//Function for formatting the departments given in the props
function divideIntoThree(obj) {
    const entries = Object.entries(obj);
    let i = 0;
    const newList = [];
    while (i < entries.length) {
        newList.push(entries.slice(i, i + 3));
        i += 3;
    }
    return newList;
};

/**
 * Setup menu component for onboarding purposes. Contains toggle buttons for displaying items to
 * be added.
 * 
 * Props:
 * - advancePage<Function>: Function from the parent component to advance to the next menu
 *      Syntax: advancePage()
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SetupDepartmentsMenu({advancePage, style}) {
    //State variables for each department item
    //const [departmentItems, setDepartmentItems] = useState({});
    const [CSDepartment, setCSDepartment] = useState(false);
    const [designDepartment, setDesignDepartment] = useState(false);
    const [financeDepartment, setFinanceDepartment] = useState(false);
    const [HRDepartment, setHRDepartment] = useState(false);
    const [ITDepartment, setITDepartment] = useState(false);
    const [managementDepartment, setManagementDepartment] = useState(false);
    const [marketingDepartment, setMarketingDepartment] = useState(false);
    const [operationsDepartment, setOperationsDepartment] = useState(false);
    const [salesDepartment, setSalesDepartment] = useState(false);
    

    // useEffect(() => {
    //     getDepartments();
    // }, []);

    //URL to be used for API requests
    const url = `${process.env.URL}/departments/`;

    
    const departmentItems = {
        "Customer Success": [CSDepartment, setCSDepartment],
        "Design": [designDepartment, setDesignDepartment],
        "Finance": [financeDepartment, setFinanceDepartment],
        "Human Resources": [HRDepartment, setHRDepartment],
        "Information Technology": [ITDepartment, setITDepartment],
        "Management": [managementDepartment, setManagementDepartment],
        "Marketing": [marketingDepartment, setMarketingDepartment],
        "Operations": [operationsDepartment, setOperationsDepartment],
        "Sales": [salesDepartment, setSalesDepartment]
    };
    

    const formattedDepartments = divideIntoThree(departmentItems);
    
    //Track each selected item
    const activeStates = [];
    Object.entries(departmentItems).map(([k, v]) => {
        if (v[0]) {activeStates.push(k)}
    });

    /*
    function setSelected(state) {
        state[0] = !state[0]
    }
    
    function getDepartments() {
        axios.get(url)
        .then((response) => {
            const data = response.data;
            console.log(data);
            for (const dep of data) {
                console.log(dep)
                departmentItems[dep.departmentName] = [];
                departmentItems[dep.departmentName].push(false);
                departmentItems[dep.departmentName].push(
                    () => setSelected(departmentItems[dep.departmentName])
                );
                console.log(departmentItems[dep.departmentName]);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    */
    
    /*
    //Function for creating the POST requests and setting the new menu component
    async function handleSubmit() {
        for (const item of activeStates) {
            //Parse data of each department into JSON format
            const data = {
                departmentName: item,
                departmentManagerId: 1
            };

            //Send a POST request for each department
            try {
                const response = await axios.post(url, data);
                console.log(response);
            }
            catch (error) {
                console.log(error);
            }
        }
        advancePage();
    };
    */

    return (
        <Box sx={{...{
            width: "1003px",
            boxSizing: "border-box",
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            paddingTop: 6,
            paddingX: "150px",
            paddingBottom: 20,
            backgroundColor: "#FFFFFF",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Text*/}
            <h3 style={{margin: "1em auto", textAlign: "center"}}>
                Select the departments to add
            </h3>
            <p style={{margin: "1em auto 80px", textAlign: "center"}}>
                You can modify the name or add more departments later
            </p>
            {/*Buttons*/}
            {formattedDepartments.map((list) => (
                <Stack 
                    direction="row" 
                    alignItems="center" 
                    justifyContent="space-between" 
                    spacing={3}
                    sx={{marginY: "20px"}}
                >
                    {list.map((item) => (
                        <SelectItem 
                            state={item[1][0]} 
                            setState={item[1][1]}
                            style={{flex: 1}}
                        >
                            {item[0]}
                        </SelectItem>
                    ))}
                </Stack>
            ))}
            {/*Add departments button*/}
            <HRMButton 
                mode="primary" 
                enabled={activeStates.length >= 3} 
                onClick={advancePage}
                style={{
                    float: "right",
                    marginTop: "80px"
                }}
            >
                Add Departments
            </HRMButton>
        </Box>
    );
};

//Control panel settings for storybook 
SetupDepartmentsMenu.propTypes = {
    //States and setState functions stored in object
    departmentItems: PropTypes.object
};

//Default values for this component
SetupDepartmentsMenu.defaultProps = {
    style: {}
};