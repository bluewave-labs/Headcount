import ToDoTable from './ToDoTable';

//Storybook display settings
export default {
    title: 'OnboardingMenu/ToDoTable',
    component: ToDoTable,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each ToDoTable type
export const Primary = {
    args: {
        setAllTasksComplete: (value) => {}
    }
};