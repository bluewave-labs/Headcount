import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Typography, Button } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import { colors, fonts } from "../../Styles";
import Stack from "@mui/system/Stack";
import { useSettingsContext } from "./context";

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

const EditButton = styled(Button)({
  textTransform: "none",
  color: "#7F56D9",
  textDecoration: "none",
  fontWeight: "600",
});

const DeleteButton = styled(Button)({
  textTransform: "none",
  color: "#475467",
  textDecoration: "none",
  fontWeight: "600",
});
export default function DepartmentsTable({ openDialog, departments, style }) {

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
        <TableBody>
          {departments.map((department) => (
            <TableRow key={department.id}>
              <TableBodyCell sx={{ width: "50%", paddingLeft: "25px" }}>
                <Text>{department.departmentName}</Text>
              </TableBodyCell>
              <TableBodyCell>
                <Text>{department.count}</Text>
              </TableBodyCell>
              <TableBodyCell>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <DeleteButton
                    onClick={() => openDialog(department, "delete")}
                  >
                    <b>Delete</b>
                  </DeleteButton>
                  <EditButton onClick={() => openDialog(department, "edit")}>
                    Edit
                  </EditButton>
                </Stack>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
