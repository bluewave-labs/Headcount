import { Box, Tabs, Tab} from '@mui/material'
import * as React from 'react'
import PropTypes from "prop-types";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden= {value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  }
}

export default function MyInfoTab(props) {
  const { items } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='tabs'
          
          sx={{
            ".MuiTab-root": {
              color: "#344054", 
              fontWeight: 400,
              fontFamily:'Inter',
              fontSize: '13px',
            },
            ".Mui-selected": {
              backgroundColor: "#F9F5FF", 
              color: "#6941C6", 
              fontWeight: 400,
              fontFamily:'Inter',
              fontSize: '13px',
            },
            ".MuiTabs-indicator": {
              backgroundColor: '#7F56D9', 
              fontWeight: 400,
              fontFamily:'Inter',
              fontSize: '13px',
            },
          }}
        >
        {items.map((item, index) => {
          return (
            <Tab 
            disableRipple
              label= {item.label}
              key={index}
              {...a11yProps(index)}
              sx={{
                textTransform: "none",
                '&.Mui-selected': {
                  backgroundColor: "#F9F5FF",
                  color: "#6941C6",
                  fontWeight: 400,
                  fontFamily:'Inter',
                  fontSize: '13px',
                },
              }}
              
          />
          )
        })}
        </Tabs>
      </Box>
      {items.map((item, index) => {
        return (
          <CustomTabPanel key={index} value={value} index={index}>
            {item.child}
          </CustomTabPanel>
        )
      })}
    </Box>
  )
}

