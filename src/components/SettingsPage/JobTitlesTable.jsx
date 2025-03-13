import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import { colors, fonts } from "../../Styles";
import PropTypes from "prop-types";
import Stack from "@mui/system/Stack";
import HRMButton from "../Button/HRMButton";

const TextHeader = styled(Typography)({
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "18px",
  color: "#475467",
});

const Text = styled(Typography)({
  fontSize: "16px",
  fontWeight: "500",
  lineHeight: "20px",
  color: "#101828",
});
export default function JobTitlesTable({ jobTitles, style }) {
  //Custom style elements
  const TableHeaderCell = styled(TableCell)({
    color: colors.darkGrey,
    paddingTop: "10px",
    paddingBottom: "10px",
  });

  const TableBodyCell = styled(TableCell)({
    color: colors.darkGrey,
    paddingTop: "25px",
    paddingBottom: "25px",
  });

  return (
    <TableContainer
      sx={{
        ...{
          minWidth: "885px",
          fontFamily: fonts.fontFamily,
        },
        ...style,
      }}
    >
      <Table>
        {/*Table header*/}
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
            <TableHeaderCell sx={{ width: "50%", paddingLeft: "25px" }}>
              <TextHeader>Name</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell>
              <TextHeader>People</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        {/*Policy information*/}
        <TableBody>
          {jobTitles.map((jobTitle) => (
            <TableRow>
              <TableBodyCell sx={{ width: "50%", paddingLeft: "25px" }}>
                <Text>{jobTitle.roleTitle}</Text>
              </TableBodyCell>
              <TableBodyCell>
                <Text>{jobTitle.count}</Text>
              </TableBodyCell>
              <TableBodyCell>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <HRMButton mode="tertiary">
                    <b>Delete</b>
                  </HRMButton>
                  <HRMButton mode="tertiary">
                    <a
                      href="#"
                      style={{
                        color: "#7F56D9",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Edit
                    </a>
                  </HRMButton>
                </Stack>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

//Control panel settings for storybook
JobTitlesTable.propTypes = {
  //Time off policies to be displayed
  jobtitles: PropTypes.objectOf(PropTypes.array),
};

//Default values for this component
JobTitlesTable.defaultProps = {
  style: {},
};
