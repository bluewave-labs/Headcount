import {useState} from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import IconButton from "@mui/joy/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Stack, styled } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import Popover from "@mui/material/Popover";

const FormattedButton = styled(Button)(() => ({
  backgroundColor: "#FFFFFF",
  color: "#000",
  border: "1px solid #D0D5DD",
  textTransform: "none",
  fontStyle: "normal",
  fontWeight: "inherit",
  maxHeight:"40px",
  "&:hover": {
    backgroundColor: "#F5F5F5",
    border: "1px solid #D0D5DD",
  },
}));


function customisedListItem(columns, index, handleListItemClick) {
  if (columns[index].visible) {
    return (
      <ListItem
        key={index}
        tabIndex={-1}
        sx={{
          ".Mui-selected": {
            mb: 0.2,
            backgroundColor: "#F9FAFB",
            fontWeight: "normal",
          },
        }}
        endAction={
          <IconButton
            aria-label="Add"
            size="sm"
            variant="plain"
            color="neutral"
          >
            <CheckIcon sx={{ color: "purple" }} />
          </IconButton>
        }
      >
        <ListItemButton
          selected={true}
          onClick={(event) => handleListItemClick(event, index)}
        >
          {columns[index].label}
        </ListItemButton>
      </ListItem>
    );
  } else {
    return (
      <ListItem key={index}>
        <ListItemButton onClick={(event) => handleListItemClick(event, index)}>
          {columns[index].label}
        </ListItemButton>
      </ListItem>
    );
  }
}

export default function FilterButton(props) {
  const {columnData, setColumnData} = props;
  const [columns, setColumns] = useState(columnData);

  const handleListItemClick = (event, index) => {
    columns[index].visible = !columns[index].visible; //Negate the current value
    const newCols = [...columns]
    if(setColumnData){
    setColumnData(newCols);
    }
    setColumns(newCols);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover" : undefined;

  return (
    <Stack spacing={0.5}>

    <Box
    sx={{ flex: "1 1 40%"}}
    display={"flex"}
    justifyContent={"right"}
    alignContent={"right"}
    width={208}
    maxHeight={40}
  >
    <FormattedButton
      variant="outlined"
      startIcon={<TuneIcon />}
      onClick={handleClick}
    >
      Customize
    </FormattedButton>
  </Box>
  {columns.length > 0 && (
  <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{ marginLeft: "-80px" }}
        >
    <List
      sx={{
        width: 208,
        height: 277,
        border: "2px solid #EAECF0",
        borderRadius: 2,
        maxHeight: 277,
        overflow: "auto",
      }}
    >
      {columns.map((item, index) => {
        return customisedListItem(columns, index, handleListItemClick);
      })}
    </List> 
    </Popover>)}
    </Stack>
  );
}
