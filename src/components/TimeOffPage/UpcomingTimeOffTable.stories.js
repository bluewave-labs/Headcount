import UpcomingTimeOffTable from './UpcomingTimeOffTable';
import AvatarImage from '../../Images/a99b7c47182d3a04f5f3ed31db0dd8a6.jpg';

const timeOffPeriods = [
    {
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.'
    },
    {
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.'
    },
    {
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.'
    },
    {
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.'
    },
];

const teamTimeOffPeriods = [
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Approved'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Rejected'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
];

//Storybook display settings
export default {
    title: 'TimeOffMenu/UpcomingTimeOffTable',
    component: UpcomingTimeOffTable,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each UpcomingTimeOffTable type
export const Board = {
    args: {
        timeOffPeriods: timeOffPeriods,
        tableColumns: ['Type', 'Amount', 'Note'],
        editFlag: true,
        refresh: () => {}
    }
};

export const History = {
    args: {
        timeOffPeriods: timeOffPeriods,
        tableColumns: ['Type', 'Amount', 'Note'],
        editFlag: false,
        refresh: () => {}
    }
};

export const Team = {
    args: {
        timeOffPeriods: teamTimeOffPeriods,
        tableColumns: ['Person', 'Type', 'Amount', 'Note', 'Status'],
        editFlag: false,
        refresh: () => {}
    }
}