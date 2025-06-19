import ResponseComplete from './ResponseComplete';

//Storybook display settings
export default {
    title: 'SurveysMenu/ResponseComplete',
    component: ResponseComplete,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each ResponseComplete type
export const Primary = {
    args: {
        submitResponse: () => {}
    }
};