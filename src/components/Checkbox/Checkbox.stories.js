import Checkbox from './Checkbox';

//Storybook display settings
export default {
    title: 'Interactables/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each checkbox type
export const Box = {
    args: {
        type: 'checkbox',
        id: 'test',
        name: 'name',
        value: 'value',
        size: 'small',
        enabled: true
    }
};

export const Radio = {
    args: {
        type: 'radio',
        id: 'test',
        name: 'name',
        value: 'value',
        size: 'small',
        enabled: true
    }
};