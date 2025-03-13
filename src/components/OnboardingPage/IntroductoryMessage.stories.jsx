import IntroductoryMessage from './IntroductoryMessage';

//Storybook display settings
export default {
    title: 'OnboardingMenu/IntroductoryMessage',
    component: IntroductoryMessage,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each IntroductoryMessage type
export const Primary = {
    args: {
        next: () => {}
    }
};