import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

/**
 * Function create a React Menu component
 * @param {Array} param0 array of objects of the form {label: string, action: func}
 * @returns React component
 */
export default function ActionMenu({ actions, disableMenu }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disabled={disableMenu}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {actions.map((item) => {
          return (
            <MenuItem
              onClick={() => {
                handleClose();
                item.action();
              }}
              disableRipple
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
