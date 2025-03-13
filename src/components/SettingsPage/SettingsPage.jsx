import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import { colors, fonts } from "../../Styles";
import { useState } from "react";
import { styled } from "@mui/system";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CompanyProfileForm from "./CompanyProfileForm";
import ListTabContent from "./ListTabContent";
import ManagePermissions from "./ManagePermissions";
import { useSettingsContext } from "./context";
import {
  useDepartmentPeople,
  useJobTitlesPeople,
  useTimeOffPolicies,
  usePermissions,
} from "./hooks";
import { tabNames } from "./SettingsDialog";

const StyledTab = styled(Tab)({
  textTransform: "none",
});

const StyledTabPanel = styled(TabPanel)({
  padding: 0,
});

export default function SettingsPage({ style }) {
  const [tab, setTab] = useState("Company profile");
  const getPeopleInfo = useDepartmentPeople();
  const getJobTitlesInfo = useJobTitlesPeople();
  const getTimeOffPoliciesInfo = useTimeOffPolicies();
  const getPermissionsInfo = usePermissions();
  const departmentsPeopleData = getPeopleInfo.data;
  const departmentsPeopleColumns = getPeopleInfo.columns;

  const jobTitlesPeopleData = getJobTitlesInfo.data;
  const jobTitlesPeopleColumns = getJobTitlesInfo.columns;

  const timeoffPoliciesData = getTimeOffPoliciesInfo.data;
  const timeOffPoliciesColumns = getTimeOffPoliciesInfo.columns;

  const permissionsData = getPermissionsInfo.data;

  const context = useSettingsContext();
    if (!context) return;

  const setUpdatedPermissions = context.setUpdatedPermissions;

  function handleChange(e, newValue) {
    setTab(newValue);
    setUpdatedPermissions([]);
  }

  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          marginBottom: "16px",
        }}
      >
        <h2>Settings</h2>
      </Stack>
      <Box
        sx={{
          ...{
            boxSizing: "border-box",
            border: "1px solid #EBEBEB",
            borderRadius: "5px",
            backgroundColor: "#FFFFFF",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily,
            minWidth: "980px",
            paddingX: "45px",
            paddingY: "42px",
          },
          ...style,
        }}
      >
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "#EAECF0" }}>
            <TabList
              textColor="secondary"
              indicatorColor="secondary"
              onChange={handleChange}
            >
              <StyledTab label="Company profile" value="Company profile" />
              <StyledTab label="Departments" value="Departments" />
              <StyledTab label="Job titles" value="Job titles" />
              <StyledTab label="Time off" value="Time off" />
              <StyledTab label="Permissions" value="Permissions" />
              {/* <StyledTab label="Offboarding" value="Offboarding" /> */}
            </TabList>
          </Box>
          <StyledTabPanel value="Company profile">
            <CompanyProfileForm />
          </StyledTabPanel>
          <StyledTabPanel value="Departments">
            <ListTabContent
              contentList={departmentsPeopleData}
              titleTabPage="Departments"
              columns={departmentsPeopleColumns}
              tabName={tabNames?.departments}
            />
          </StyledTabPanel>
          <StyledTabPanel value="Job titles">
            <ListTabContent
              contentList={jobTitlesPeopleData}
              titleTabPage="Job Title"
              columns={jobTitlesPeopleColumns}
              tabName={tabNames.jobtitles}
            />
          </StyledTabPanel>
          <StyledTabPanel value="Time off">
            <ListTabContent
              contentList={timeoffPoliciesData}
              titleTabPage="Time off policies"
              columns={timeOffPoliciesColumns}
              tabName={tabNames.timeoffs}
            />
          </StyledTabPanel>
          <StyledTabPanel value="Permissions">
            <ManagePermissions
              contentList={permissionsData}
              titleTabPage="Permissions"
              tabName={tabNames.permissions}
            />
          </StyledTabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
