import SurveyDetailsMenu from './SurveyDetailsMenu';

//Storybook display settings
export default {
    title: 'SurveysMenu/SurveyDetailsMenu',
    component: SurveyDetailsMenu,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each SurveyDetailsMenu type
export const Primary = {
    args: {
        infoSelected: true,
        setInfoSelected: (value) => {},
        answersSelected: false,
        setAnswersSelected: (value) => {}
    }
};