import NoConnectionComponent from './NoConnectionComponent';

const content = <>
    <h3 style={{color: "#D92D20"}}>Servers are unavailable</h3>
    <p style={{color: "#D92D20"}}>Cannot retrieve time off policies or periods.</p>
</>;

//Storybook display settings
export default {
    title: 'StaticMenus/NoConnectionComponent',
    component: NoConnectionComponent,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each NoConnectionComponent
export const Primary = {
    args: {
        children: content
    }
};