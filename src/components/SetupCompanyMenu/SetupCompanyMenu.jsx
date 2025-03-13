import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useContext, useState } from "react";
import { colors, fonts } from "../../assets/Styles";
import UploadFile from "./UploadFile";
import HRMButton from "../Button/HRMButton";
import StateContext from "../../context/StateContext";
const api = require("../../assets/FetchServices");

/**
 * Setup menu component for onboarding purposes. Contains a text field for a company's name
 * and website and other components for uploading a company logo.
 *
 * Props:
 * - advancePage<Function>: Function from the parent component to advance to the next menu
 *      Syntax: advancePage()
 *
 * - style<Object>: Optional prop for adding further inline styling
 *      Default: {}
 */
export default function SetupCompanyMenu({ advancePage, style }) {
  //State variables for holding the new company's information
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);

  const stateContext = useContext(StateContext);

  const getBinary = (data) => {
    if (data) {
      let startIndex = data.indexOf(",") + 1;
      return data.substring(startIndex);
    }
    return null;
  };

  //Function for creating the POST request and setting the new menu component
  async function handleSubmit() {
    //Parse data into JSON format
    const data = {
      companyName: companyName,
      companyWebsite: "https://" + companyWebsite,
      companyLogo: getBinary(companyLogo),
      administratorEmail:
        stateContext.state.user && stateContext.state.user.email,
    };
    //Send the PUT request
    try {
      const response = await api.company.createOne(data);
      console.log(response);
      if (companyLogo) {
        stateContext.updateState("logo", companyLogo);
      }
    } catch (error) {
      console.log(error);
    } finally {
      advancePage();
    }
  }

  return (
    <Box
      sx={{
        ...{
          //boxSizing: "border-box",
          width: "1003px",
          border: "1px solid #EBEBEB",
          borderRadius: "10px",
          paddingY: "52px",
          paddingX: "120px",
          backgroundColor: "#FFFFFF",
          color: colors.darkGrey,
          fontFamily: fonts.fontFamily,
        },
        ...style,
      }}
    >
      <h3 style={{textAlign: "center", marginTop: 0, marginBottom: "10px"}}>
        Add fundamental company details
      </h3>
      <p style={{textAlign: "center", marginBottom: "50px"}}>
        You can modify these later in settings
      </p>
      {/*Textfield for company name*/}
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between"
        sx={{ marginBottom: "20px"}}
      >
        <h4>Company name</h4>
        <TextField
          id="company-name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          size="small"
          sx={{ width: "70%" }}
        />
      </Stack>
      {/*Textfield for company website*/}
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between"
        sx={{ marginBottom: "20px"}}
      >
        <h4>Company website</h4>
        <TextField
          id="company-website"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">https://</InputAdornment>
            ),
          }}
          size="small"
          sx={{ width: "70%" }}
        />
      </Stack>
      {/*Section for uploading company logo*/}
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between"
        sx={{ marginBottom: "40px"}}
      >
        <h4>Company logo</h4>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
        >
          {companyLogo ? (
            <img
              src={companyLogo}
              style={{
                width: "175px",
                height: "100px",
                marginRight: "20px",
              }}
            />
          ) : (
            <AddPhotoAlternateOutlinedIcon
              sx={{
                backgroundColor: "#F2F4F7",
                width: "32px",
                height: "32px",
                padding: "32px",
                marginRight: "20px",
                borderRadius: "50%",
              }}
            />
          )}
          <UploadFile setFile={setCompanyLogo} />
        </Stack>
      </Stack>
      {/*Add company button*/}
      <Stack direction="row" alignItems="center" justifyContent="flex-end">
        <HRMButton
          mode="primary"
          enabled={companyName}
          onClick={handleSubmit}
        >
          Add Company
        </HRMButton>
      </Stack>
    </Box>
  );
}

//Control panel settings for storybook
SetupCompanyMenu.propTypes = {};

//Default values for this component
SetupCompanyMenu.defaultProps = {
  style: {},
};
