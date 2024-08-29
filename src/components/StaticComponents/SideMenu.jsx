import Stack from '@mui/system/Stack';
import Box from '@mui/system/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SupportIcon from '@mui/icons-material/Support';
import { styled } from '@mui/system';

/**
 * Side menu component for most pages. Contains buttons and links to multiple pages.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function SideMenu({style}) {
    const StyledListItemIcon = styled(ListItemIcon)({
        justifyContent: "center"
    });

    const StyledListItem = styled(ListItem)({
        minWidth: "280px"
    });

    const StyledListItemButton = styled(ListItemButton)({
        paddingLeft: 0
    });

    return (
        <Stack sx={{...{
            width: "15%",
            minWidth: "280px",
            height: "100%",
            paddingRight: "15px",
            direction: "column",
            justifyContent: "space-between",
            borderRight: "1px solid #EBEBEB",
            backgroundColor: "#FFFFFF"
        }, ...style}}>
            <List>
                <StyledListItem disablePadding>
                    <StyledListItemButton>
                        <StyledListItemIcon>
                            <HomeOutlinedIcon />
                        </StyledListItemIcon>
                        <ListItemText primary="Home" />
                    </StyledListItemButton>
                </StyledListItem>
                <StyledListItem disablePadding>
                    <StyledListItemButton>
                        <StyledListItemIcon>
                            <PersonOutlineIcon />
                        </StyledListItemIcon>
                        <ListItemText primary="My info" />
                    </StyledListItemButton>
                </StyledListItem>
                <StyledListItem disablePadding>
                    <StyledListItemButton>
                        <StyledListItemIcon>
                            <PeopleOutlineIcon />
                        </StyledListItemIcon>
                        <ListItemText primary="People" />
                    </StyledListItemButton>
                </StyledListItem>
                <StyledListItem disablePadding>
                    <StyledListItemButton>
                        <StyledListItemIcon>
                            <AccessTimeIcon />
                        </StyledListItemIcon>
                        <ListItemText primary="Time off" />
                    </StyledListItemButton>
                </StyledListItem>
                <StyledListItem disablePadding>
                    <StyledListItemButton>
                        <StyledListItemIcon>
                            <PieChartOutlineOutlinedIcon />
                        </StyledListItemIcon>
                        <ListItemText primary="Reporting" />
                    </StyledListItemButton>
                </StyledListItem>
                <StyledListItem disablePadding>
                    <StyledListItemButton>
                        <StyledListItemIcon>
                            <SettingsOutlinedIcon />
                        </StyledListItemIcon>
                        <ListItemText primary="Settings" />
                    </StyledListItemButton>
                </StyledListItem>
            </List>
            <Box>
                <Divider />
                <StyledListItem sx={{marginY: "10px"}} disablePadding>
                    <StyledListItemButton>
                        <StyledListItemIcon>
                            <SupportIcon />
                        </StyledListItemIcon>
                        <ListItemText primary="Support" />
                    </StyledListItemButton>
                </StyledListItem>
            </Box>
        </Stack>
    );
}

//Control panel settings for storybook
SideMenu.propTypes = {};

//Default values for this component
SideMenu.defaultProps = {
    style: {}
};