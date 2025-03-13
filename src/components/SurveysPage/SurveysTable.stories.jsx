import SurveysTable from './SurveysTable';

//Storybook display settings
export default {
    title: 'SurveysMenu/SurveysTable',
    component: SurveysTable,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each SurveysTable type
export const Primary = {
    args: {}
};