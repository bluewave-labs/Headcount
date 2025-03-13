import { useEffect, useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Typography, Button, Menu, MenuItem, Stack } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import { colors, fonts } from "../../Styles";

const TextHeader = styled(Typography)({
  fontFamily: "Inter",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "18px",
  color: "#475467",
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

export default function ListTable({ openDialog, columns, contentList, style }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const openMenu = Boolean(anchorEl);

  const isTimeOffList = columns.some(column => column.header === "Policy type");

  if (isTimeOffList) {
    contentList.sort((a, b) => {
      return a.category.toLowerCase().localeCompare(b.category.toLowerCase());
    });
  }

  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
            {columns?.map(({ header }) => (
              <TableHeaderCell key={header}>
                <TextHeader>{header}</TextHeader>
              </TableHeaderCell>
            ))}
            <TableHeaderCell>
              <TextHeader>Actions</TextHeader>
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contentList?.map((item) => (
            <TableRow key={item.roleId ? item.roleId : item.id}>
              {columns?.map(({ header, contentKey }, index) => (
                <TableBodyCell key={contentKey}>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      lineHeight: "20px",
                      fontWeight: index === 0 ? "500" : "400",
                      color: index === 0 ? "#101828" : "#475467",
                      fontSize: index === 0 ? "14px" : "13px",
                    }}
                  >
                    {header === "Default balance (hours)"
                      ? `${item[contentKey] === null ? "Unlimited" : item[contentKey]}`
                      : item[contentKey]}
                  </Typography>
                </TableBodyCell>
              ))}
              <TableBodyCell>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <Stack direction="row" spacing={2}>
                    <Button
                      id="basic-button"
                      aria-controls={openMenu ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                      onClick={(event) => handleClick(event, item)}
                      sx={{ margin: "0px", padding: "0px", minWidth: "0px" }}
                    >
                      <MoreVertIcon sx={{ color: "#98A2B3" }} />
                    </Button>
                  </Stack>
                </Stack>
              </TableBodyCell>
            </TableRow>
          ))}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                openDialog("edit", selectedItem);
                handleCloseMenu();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                openDialog("delete", selectedItem);
                handleCloseMenu();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
