import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Typography,
  Stack,
  Avatar,
  CircularProgress,
  Radio,
} from "@mui/material";
import { styled } from "@mui/system";
import { colors, fonts } from "../../Styles";
import { useSettingsContext } from "./context";

const TextHeader = styled(Typography)({
  fontFamily: "Inter",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "18px",
  color: "#475467",
});

const Text = styled(Typography)({
  fontFamily: "Inter",
  lineHeight: "20px",
  fontWeight: "400",
  color: "#475467",
  fontSize: "13px",
});

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

const CustomRadio = styled(Radio)({
  "&.Mui-checked": {
    color: "#7F56D9",
  },
});

export default function PermissionsTable({ contentList, style, open }) {
  const { updatedPermissions, setUpdatedPermissions, isLoading } =
    useSettingsContext();

  useEffect(() => {
    if (updatedPermissions?.length > 0) {
      open(true);
    }
  }, [updatedPermissions]);

  const updatePermission = (newPermission, employee) => {
    const updatedPermissionEmployee = {
      employee,
      newPermission,
    };

    if (newPermission !== employee.permission.type) {
      setUpdatedPermissions([updatedPermissionEmployee]);
      return;
    }
    setUpdatedPermissions([]);
  };

  if (isLoading?.employees || isLoading?.users)
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", padding: "10px" }}
      >
        <CircularProgress />
      </Stack>
    );
  if (contentList?.length === 0) return <p>There are no records right now.</p>;

  return (
    <TableContainer
      sx={{
        minWidth: "885px",
        fontFamily: fonts.fontFamily,
        ...style,
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
            <TableHeaderCell key="Name">
              <TextHeader>Name</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell key="Role">
              <TextHeader>Role</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell key="Team">
              <TextHeader>Team</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell key="Admin">
              <TextHeader>Admin</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell key="Manager">
              <TextHeader>Manager</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell key="Employee">
              <TextHeader>Employee</TextHeader>
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contentList?.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableBodyCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      alt="Employee Photo"
                      src={"data:image/png;base64," + atob(item.photo)}
                    />
                    <Text>{`${item?.firstName} ${item?.lastName}`}</Text>
                  </Stack>
                </TableBodyCell>
                <TableBodyCell>
                  <Text>{item?.role.roleTitle}</Text>
                </TableBodyCell>
                <TableBodyCell>
                  <Text>{item?.team.teamName}</Text>
                </TableBodyCell>
                <TableBodyCell>
                  <CustomRadio
                    id={`permission-admin-${item?.id}`}
                    name={`permission-${item?.id}`}
                    value="Administrator"
                    checked={item?.permission.type === "Administrator"}
                    onChange={(e) => updatePermission(e.target.value, item)}
                    size="small"
                  />
                </TableBodyCell>
                <TableBodyCell>
                  <CustomRadio
                    id={`permission-manager-${item?.id}`}
                    name={`permission-${item?.id}`}
                    value="Manager"
                    checked={item?.permission.type === "Manager"}
                    onChange={(e) => updatePermission(e.target.value, item)}
                    size="small"
                    sx={{
                      "&.Mui-checked": {
                        color: "#7F56D9",
                      },
                    }}
                  />
                </TableBodyCell>
                <TableBodyCell>
                  <CustomRadio
                    id={`permission-employee-${item?.id}`}
                    name={`permission-${item?.id}`}
                    value="Employee"
                    checked={item?.permission.type === "Employee"}
                    onChange={(e) => updatePermission(e.target.value, item)}
                    size="small"
                    sx={{
                      "&.Mui-checked": {
                        color: "#7F56D9",
                      },
                    }}
                  />
                </TableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
