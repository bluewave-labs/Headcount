import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const items = [
    "Departments",
    "Roles",
    "Marital",
    "Status",
    "Team",
    "Plan",
    "Billing",
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        border: "2px solid #EAECF0",
        borderRadius: 2,
      }}
    >
      <List component="nav" aria-label="tab-item">
        {items.map((item, index) => {
          return (
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
