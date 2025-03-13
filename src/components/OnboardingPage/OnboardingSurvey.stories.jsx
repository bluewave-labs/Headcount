import OnboardingSurvey from './OnboardingSurvey';

//Storybook display settings
export default {
    title: 'OnboardingMenu/OnboardingSurvey',
    component: OnboardingSurvey,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each OnboardingSurvey type
export const Primary = {
    args: {
        prev: () => {},
        next: () => {}
    }
};