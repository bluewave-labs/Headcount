import DeleteTimeOff from './DeleteTimeOff';

//Storybook display settings
export default {
    title: 'PopupMenus/DeleteTimeOff',
    component: DeleteTimeOff,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each DeleteTimeOff type
export const Primary = {
    args: {
        period: {},
        close: () => {},
        refresh: () => {}
    }
};