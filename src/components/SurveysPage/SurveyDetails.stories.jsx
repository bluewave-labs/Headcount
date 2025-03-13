import SurveyDetails from './SurveyDetails';

//Storybook display settings
export default {
    title: 'SurveysMenu/SurveyDetails',
    component: SurveyDetails,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each SurveyDetails type
export const Primary = {
    args: {
        survey: {
            name: "Q2 2024 General"
        },
        back: () => {}
    }
};