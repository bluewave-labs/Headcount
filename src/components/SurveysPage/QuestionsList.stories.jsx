import QuestionsList from './QuestionsList';

//Storybook display settings
export default {
    title: 'SurveysMenu/QuestionsList',
    component: QuestionsList,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each QuestionList type
export const Primary = {
    args: {
        questions: [
            {
                index: 0,
                question: "Do you have any feedback on your manager or team that you'd like to share?",
            },
            {
                index: 1,
                question: "What suggestions do you have for improving the company culture or work environment?",
            },
            {   
                index: 2,
                question: "How was your experience working here?",
            }
        ],
        setQuestions: (value) => {}
    }
};