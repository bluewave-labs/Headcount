import TimeOffRequestResolved from './TimeOffRequestResolved';

//Storybook display settings
export default {
    title: 'PopupMenus/TimeOffRequestResolved',
    component: TimeOffRequestResolved,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each TimeOffRequestResolved type
export const Approved = {
    args: {
        time_off_information: {
            startDate: 'Jan 6, 2024',
            endDate: 'Jan 8, 2024',
            status: 'Approved',
            notes: 'Have fun on your vacation!'
        }, 
        close: () => {}
    }
};

export const Rejected = {
    args: {
        time_off_information: {
            startDate: 'Apr 14, 2024',
            endDate: 'Apr 17, 2024',
            status: 'Declined',
            notes: "You've been slacking off every day for the past week! Get back to work!"
        },
        close: () => {}
    }
};