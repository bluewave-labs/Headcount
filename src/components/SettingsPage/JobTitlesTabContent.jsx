import {Box, Stack} from "@mui/system";
import {
  styled,
  Typography
} from "@mui/material";
import PagesNavBar from "../UpdatesPage/PagesNavBar";
import { colors, fonts } from "../../Styles";
import { useState } from "react";
import JobTitlesTable from "./JobTitlesTable";
import HRMButton from "../Button/HRMButton";
import { useSettingsContext } from "./context";

const Text = styled(Typography)({
  fontSize: "18px",
  fontWeight: "500",
  lineHeight: "28px",
  color: " #344054",
});

export default function JobTitlesTabContent({ style }) {
  const context = useSettingsContext();
  const jobTitles = context?.jobTitles;
  const [currentPage, setCurrentPage] = useState(1); //The current page number
  //Function for changing the page number
  function handlePage(n) {
    if (n > 0 && n <= Math.ceil(jobTitles.length / 10)) {
      setCurrentPage(n);
    }
  }

  const addNewJobTitle = () => {
    console.log("Add new job title");
  };

  return (
    <Box
      sx={{
        ...{
          marginTop: "40px",
          color: colors.darkGrey,
          fontFamily: fonts.fontFamily,
        },
        ...style,
      }}
    >
      {/*header and table*/}
      <Stack direction="row" alignContent="center" justifyContent="space-between" style={{ marginBottom: "20px" }}>
      <Text>Job Titles</Text>
        <HRMButton
            mode="primary"
            type="button"
            onClick={addNewJobTitle}
          >
            Add new
          </HRMButton>
      </Stack>
      <JobTitlesTable
        jobTitles={jobTitles}
        sx={{ marginBottom: "40px" }}
      />
      {/*header*/}
      {jobTitles.length > 0 ? (
        <>
          {/*Upcoming time off navbar*/}
          {jobTitles.length > 10 && (
            <PagesNavBar
              numOfEntries={jobTitles.length}
              currentPage={currentPage}
              handlePage={handlePage}
            />
          )}
        </>
      ) : (
        <p>There is no job titles right now.</p>
      )}
    </Box>
  );
}

JobTitlesTabContent.defaultProps = {
  style: {},
};
