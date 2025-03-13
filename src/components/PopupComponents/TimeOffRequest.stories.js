import TimeOffRequest from './TimeOffRequest';

//Storybook display settings
export default {
    title: 'PopupMenus/TimeOffRequest',
    component: TimeOffRequest,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each TimeOffRequest type
export const Primary = {
    args: {
        close: () => {},
        sendRequest: () => {}
    }
};