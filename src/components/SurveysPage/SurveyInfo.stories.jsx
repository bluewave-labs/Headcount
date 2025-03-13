import SurveyInfo from './SurveyInfo';

//Storybook display settings
export default {
    title: 'SurveysMenu/SurveyInfo',
    component: SurveyInfo,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each SurveyInfo type
export const Primary = {
    args: {
        surveyInfo: [
            {
                field: "Welcome screen title",
                answer: "Satisfaction Survey 2024"
            },
            {
                field: "Welcome screen message",
                answer: "Thank you for taking the time to provide feedback. Your input is invaluable in helping us improve your experience at [Company Name]. Please be honest in your responses, as your feedback will remain confidential."
            },
            {
                field: "Finish screen title",
                answer: "Satisfaction Survey 2024"
            },
            {
                field: "Finish screen message",
                answer: "Thank you for taking the time to provide feedback. Your input is invaluable in helping us improve your experience at [Company Name]. Please be honest in your responses, as your feedback will remain confidential."
            },
            {
                field: "Start date:",
                answer: "1 January 2024"
            },
            {
                field: "Finish date:",
                answer: "1 January 2024"
            }
        ]
    }
};