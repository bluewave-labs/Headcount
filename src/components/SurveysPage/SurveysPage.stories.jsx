import SurveysPage from "./SurveysPage";

//Storybook display settings
export default {
    title: 'SurveysMenu/SurveysPage',
    component: SurveysPage,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs']
};

//Stories for each SurveysPage type
export const Primary = {
    args: {}
};