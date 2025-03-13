import OnboardingDocuments from './OnboardingDocuments';

//Storybook display settings
export default {
    title: 'OnboardingMenu/OnboardingDocuments',
    component: OnboardingDocuments,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each OnboardingDocuments type
export const Primary = {
    args: {
        prev: () => {},
        next: () => {}
    }
};