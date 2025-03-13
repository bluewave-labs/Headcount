import OnboardingTasks from './OnboardingTasks';

//Storybook display settings
export default {
    title: 'OnboardingMenu/OnboardingTasks',
    component: OnboardingTasks,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each OnboardingTasks type
export const Primary = {
    args: {
        prev: () => {},
        next: () => {}
    }
};