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
export default function ListTable({ openDialog, content, contentList, style }) {
  const isDepartmentContent = content === "departments";

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
              <TextHeader>Policy type</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell>
              <TextHeader>Default balance (h)</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell>
              <TextHeader>Times used</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contentList?.map((item) => (
            <TableRow key={item.id}>
              <TableBodyCell sx={{ width: "50%", paddingLeft: "25px" }}>
                <Text>
                  {item.roleTitle}
                </Text>
              </TableBodyCell>
              <TableBodyCell>
                <Text>{item.count}</Text>
              </TableBodyCell>
              <TableBodyCell>
                <Text>{item.count}</Text>
              </TableBodyCell>
              <TableBodyCell>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <DeleteButton onClick={() => openDialog(item, "delete")}>
                    <b>Delete</b>
                  </DeleteButton>
                  <EditButton onClick={() => openDialog(item, "edit")}>
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
