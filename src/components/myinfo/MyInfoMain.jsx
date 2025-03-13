import Stack from "@mui/system/Stack";
import HRMButton from "../Button/HRMButton";
import MyInfoPersonCard from "./MyInfoPersonalCard";
//import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { Box } from "@mui/material";
import StateContext from "../../context/StateContext";
import NoContentComponent from "../PeopleComponents/NoContentComponent";

export default function MyInfoMain({style, onClickEdit}) {
  const {state} = useContext(StateContext);
  const employee = state.employee;

  if (!employee) {
    return <NoContentComponent>
      <div>You have no employee record to display.</div>
    </NoContentComponent>
  }
  return (
    <Box>
      {/*Main page content*/}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
       
      >
        <h2
          style={{
            fontSize: "24px",
            fontFamily: "Inter",
            fontWeight: "600",
            color: "#101828",
            marginTop:"0px",
            marginBottom: "16px",
          }}
        >
          {employee.firstName} {employee.lastName}
        </h2>
        <HRMButton
          onClick={()=>{
            console.log("called");
            if(onClickEdit){
              onClickEdit(true);
            }
          }}
          mode={"primary"}
          style={{ borderRadius: "8px", width: "60.0px", height: "34.0px",}}
        >
          Edit
        </HRMButton>
      </Stack>
      <MyInfoPersonCard key={employee.empId} employee={employee} />
    </Box>
  );
}

MyInfoMain.propTypes = {};
