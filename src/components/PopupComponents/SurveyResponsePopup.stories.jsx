import SurveyResponsePopup from './SurveyResponsePopup';

//Storybook display settings
export default {
    title: 'SurveysMenu/SurveyResponsePopup',
    component: SurveyResponsePopup,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each SurveyResultPopup type
export const Primary = {
    args: {
        survey: {
            name: "Olivia Rhye",
            team: "Marketing",
            response: [
                {
                    question: "What suggestions do you have for improving the company culture or work environment?",
                    answer: "Answer1"
                },
                {
                    question: "Do you have any feedback on your manager or team that you'd like to share?",
                    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                },
                {
                    question: "How was your experience working here?",
                    answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                }
            ]
        },
        hasPrev: true,
        prev: () => {},
        hasNext: true,
        next: () => {}
    }
};

export const FirstSurvey = {
    args: {
        survey: {
            name: "Olivia Rhye",
            team: "Marketing",
            response: [
                {
                    question: "What suggestions do you have for improving the company culture or work environment?",
                    answer: "Answer1"
                },
                {
                    question: "Do you have any feedback on your manager or team that you'd like to share?",
                    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                },
                {
                    question: "How was your experience working here?",
                    answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                }
            ]
        },
        hasPrev: false,
        prev: () => {},
        hasNext: true,
        next: () => {}
    }
};

export const LastSurvey = {
    args: {
        survey: {
            name: "Olivia Rhye",
            team: "Marketing",
            response: [
                {
                    question: "What suggestions do you have for improving the company culture or work environment?",
                    answer: "Answer1"
                },
                {
                    question: "Do you have any feedback on your manager or team that you'd like to share?",
                    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                },
                {
                    question: "How was your experience working here?",
                    answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                }
            ]
        },
        hasPrev: true,
        prev: () => {},
        hasNext: false,
        next: () => {}
    }
};

export const OnlySurvey = {
    args: {
        survey: {
            name: "Olivia Rhye",
            team: "Marketing",
            response: [
                {
                    question: "What suggestions do you have for improving the company culture or work environment?",
                    answer: "Answer1"
                },
                {
                    question: "Do you have any feedback on your manager or team that you'd like to share?",
                    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                },
                {
                    question: "How was your experience working here?",
                    answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                }
            ]
        },
        hasPrev: false,
        prev: () => {},
        hasNext: false,
        next: () => {}
    }
};