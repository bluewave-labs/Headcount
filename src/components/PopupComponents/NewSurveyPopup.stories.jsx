import NewSurveyPopup from './NewSurveyPopup';

//Storybook display settings
export default {
    title: 'SurveysMenu/NewSurveyPopup',
    component: NewSurveyPopup,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each NewSurveyPopup type
export const Primary = {
    args: {
        close: () => {}
    }
};