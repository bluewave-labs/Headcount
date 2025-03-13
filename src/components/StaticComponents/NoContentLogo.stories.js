import NoContentComponent from './NoContentComponent';
import { colors } from '../../Styles';

const content = <>
    <h3 style={{color:colors.darkGrey}}>You don't have any updates yet</h3>
    <p style={{color:colors.darkGrey}}>Any update about your company will be shown here.</p>
</>;

//Storybook display settings
export default {
    title: 'StaticMenus/NoContentComponent',
    component: NoContentComponent,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each NoUpdatesLogo type
export const Primary = {
    args: {
        children: content
    }
};