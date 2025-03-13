import NewTeamMember from './NewTeamMember';
import AvatarImage from '../../Images/a99b7c47182d3a04f5f3ed31db0dd8a6.jpg';

//Storybook display settings
export default {
    title: 'PopupMenus/NewTeamMember',
    component: NewTeamMember,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each NewTeamMember type
export const Primary = {
    args: {
        employee_details: {
            avatar: AvatarImage,
            name: 'Gabriel Chan',
            role: 'Full Stack Developer',
            email: 'gabriel.chan@bluewavelabs.ca',
            office: 'Toronto',
            effectiveDate: '1 January 2024'
        },
        close: () => {}
    }
};