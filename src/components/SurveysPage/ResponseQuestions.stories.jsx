import ResponseQuestions from './ResponseQuestions';

//Storybook display settings
export default {
    title: 'SurveysMenu/ResponseQuestions',
    component: ResponseQuestions,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each ResponseQuestions type
export const Primary = {
    args: {
        prev: () => {},
        next: () => {},
        save: () => {},
        surveyQuestions: [
            {
                "respondentId": 1,
                "orderNumber": 1,
                "question": "How would you rate your satisfaction with the communication you received from BlueWave Labs?",
                "answer": ""
              },
              {
                "respondentId": 1,
                "orderNumber": 2,
                "question": "How satisfied were you with the response time of our customer support team?",
                "answer": ""
              },
              {
                "respondentId": 1,
                "orderNumber": 3,
                "question": "How would you rate the helpfulness of our customer service representatives?",
                "answer": ""
              },
              {
                "respondentId": 1,
                "orderNumber": 4,
                "question": "Rate your level of satisfaction with your recent customer service experience.",
                "answer": ""
              },
              {
                "respondentId": 1,
                "orderNumber": 5,
                "question": "Was your issue resolved to your satisfaction?",
                "answer": ""
              },
        ],
        setSurveyQuestions: (value) => {}
    }
};