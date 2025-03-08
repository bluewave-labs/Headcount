import {
  Avatar,
  Box,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import MyInfoTab from "./MyInfoTab";
import MyInfoPersonal from "./MyInfoPersonal";
import MyInfoJob from "./MyInfoJob";
import { styled } from "@mui/material/styles";
import { colors } from "../../assets/Styles";
import { formatPhoneNumber } from "../../assets/utils";
import MyinfoDocument from "./MyinfoDocument";
import MyinfoJourney from "./MyinfoJourney";

const theme = createTheme({
  typography: {
    h2: {
      fontWeight: 600,
      fontFamily: "Inter",
      fontSize: "16px",
      color: "#344054",
      marginTop: "55px",
      marginBottom: "13px",
    },

    body1: {
      fontWeight: 600,
      fontFamily: "Inter",
      fontSize: "13px",
      color: "#344054",
    },

    body2: {
      fontWeight: 400,
      fontFamily: "Inter",
      fontSize: "13px",
      color: "#344054",
    },

    body3: {
      fontWeight: 400,
      fontFamily: "Inter",
      fontSize: "11px",
      color: "#909090",
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#F8F9F8",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  boxShadow: "none",
  minWidth: "120px",
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: "32px 48px 48px 48px",
}));

function MyInfoPersonalCard({ employee }) {
  const tabItems = [
    {
      label: "Personal",
      child: (
        <div>
          <MyInfoPersonal key={employee.empId} employee={employee} />
        </div>
      ),
    },
    {
      label: "Job",
      child: (
        <div>
          <MyInfoJob key={employee.empId} employee={employee} />
        </div>
      ),
    },
    {
      label: "Documents",
      child: (
        <div>
          <MyinfoDocument key={employee.empId} employee={employee} />
        </div>
      ),
    },
    //  { // It can be displayed in newer version of the application
    //   label: 'Journey',
    //  child: <div><MyinfoJourney key={employee.empId} employee={employee}/></div>,
    //   },
  ];

  return (
    <Card
      sx={{
        border: "1px solid #EBEBEB",
        borderRadius: "10px",
        boxShadow: "none",
        height: "959px",
        overflowX: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "952px",
          //overflowX: 'auto',
        }}
      >
        <ThemeProvider theme={theme}>
          <Stack
            sx={{
              height: "153px",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "48px",
              paddingRight: "48px",
              background: colors.darkGrey2,
              borderBottom: 1,
              borderColor: "#D0D5DD",
              flexWrap: "nowrap",
            }}
            direction="row"
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Avatar
              alt="de"
              src={`data:image/png;base64,${atob(employee.photo)}`}
              sx={{
                width: "100px",
                height: "100px",
              }}
            />
            <Item
              sx={{
                height: "44px",
              }}
            >
              <Typography variant="body3" className="header">
                Role
              </Typography>
              <Typography variant="body2" className="data">
                {employee.role.roleTitle}
              </Typography>
            </Item>
            <Item
              sx={{
                height: "44px",
              }}
            >
              <Typography variant="body3" className="header">
                E-mail
              </Typography>
              <Typography variant="body2" className="data">
                {employee.email}
              </Typography>
            </Item>
            <Item
              sx={{
                height: "44px",
              }}
            >
              <Typography variant="body3" className="header">
                Phone
              </Typography>
              <Typography variant="body2" className="data">
                {formatPhoneNumber(employee.phoneNumber)}
              </Typography>
            </Item>
            <Item
              sx={{
                height: "44px",
              }}
            >
              <Typography variant="body3" className="header">
                Reporting to
              </Typography>
              <Typography variant="body2" className="data">
                {employee.Manager &&
                  `${employee.Manager.firstName} ${employee.Manager.lastName}`}
              </Typography>
            </Item>
          </Stack>
        </ThemeProvider>
        <StyledCardContent>
          <MyInfoTab
            items={tabItems}
            key={employee.empId}
            employee={employee}
          />
        </StyledCardContent>
      </Box>
    </Card>
  );
}

MyInfoPersonalCard.propTypes = {};

export default MyInfoPersonalCard;
