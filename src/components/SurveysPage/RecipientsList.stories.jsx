import RecipientsList from './RecipientsList';

export default {
    title: 'SurveysMenu/RecipientsList',
    component: RecipientsList,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

export const Primary = {
    args: {
        recipients: [
            {
                category: "Employee",
                team: "Research & Development",
                name: "Samuel Harris",
                id: 0
            },
            {
                category: "Employee",
                team: "Finance",
                name: "Marcus Drake",
                id: 1
            },
            {
                category: "Employee",
                team: "Research & Development",
                name: "Ashley Collins",
                id: 2
            }
        ],
        setRecipients: (value) => {}
    }
};