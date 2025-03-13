import FilesTable from './FilesTable';

//Storybook display settings
export default {
    title: 'OnboardingMenu/FilesTable',
    component: FilesTable,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each FilesTable type
export const Primary = {
    args: {
        files: [{name: "Job Offer"}, {name: "NDA"}]
    }
};