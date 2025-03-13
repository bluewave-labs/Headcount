import { Box } from "@mui/material";
import React from "react";
import SingupPage from "../components/LoginComponents/SingupPage";
import SetupCompanyPage from "../components/SetupCompanyMenu/SetupCompanyPage";

function Onboarding() {
  const [page, setPage] = React.useState("signup");
  return (
    <Box>
      {page === "signup" &&  <SingupPage onSubmit={()=> setPage("company-setup")}/>}
      {page === "company-setup" && <SetupCompanyPage /> }
    </Box>
  );
}
export default Onboarding;
