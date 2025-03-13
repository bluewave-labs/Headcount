import DateSelect from './DateSelect';
import dayjs from 'dayjs';

//Storybook display settings
export default {
    title: 'PopupMenus/DateSelect',
    component: DateSelect,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each DateSelect type
export const Primary = {
    args: {
        close: () => {},
        setDate: (value) => {},
        initialValue: dayjs()
    }
};