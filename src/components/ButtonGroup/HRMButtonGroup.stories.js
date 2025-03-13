import HRMButtonGroup from './HRMButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

//Storybook display settings
export default {
    title: 'Interactables/ButtonGroup',
    component: HRMButtonGroup,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each ButtonGroup type
export const Text = {
    args: {
        buttonLabels: ['Text', 'Text', 'Text']
    }
};


export const Icons = {
    args: {
        buttonLabels: [<ArrowBackIcon />, <AddIcon />, <ArrowForwardIcon />]
    }
};
