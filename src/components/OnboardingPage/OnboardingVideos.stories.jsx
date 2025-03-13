import OnboardingVideos from './OnboardingVideos';

//Storybook display settings
export default {
    title: 'OnboardingMenu/OnboardingVideos',
    component: OnboardingVideos,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs']
};

//Stories for each OnboardingVideos type
export const Primary = {
    args: {
        prev: () => {},
        next: () => {}
    }
};