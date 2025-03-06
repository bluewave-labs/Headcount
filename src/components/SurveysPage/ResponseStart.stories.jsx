import ResponseStart from './ResponseStart';

//Storybook display settings
export default {
    title: 'SurveysMenu/ResponseStart',
    component: ResponseStart,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each ResponseStart type
export const Primary = {
    args: {
        next: () => {}
    }
};