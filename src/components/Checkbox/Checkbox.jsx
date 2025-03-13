import PropTypes from 'prop-types';
import './Checkbox.css';

/**
 * Checkbox and radio components for both HRM and Onboarding applications. Can be configured to be 
 * a small or large checkbox or radio button using prop values.
 * 
 * Props:
 * - type<String>: Determines the type of checkbox.
 *      Valid values: ['checkbox', 'radio']
 *      Default: 'checkbox'
 * 
 * - id<String>: Standard input id attribute.
 * 
 * - name<String>: Standard input name attribute.
 * 
 * - value<String>: Standard input value attribute.
 * 
 * - size<String>: Determines the size of the checkbox.
 *      Valid values: ['small', 'large']
 *      Default: 'small'
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 * 
 * - onChange<Function>: Function to be executed when the checkbox value is changed.
 * 
 * - enabled<Boolean>: Flag determining whether the checkbox is enabled or disabled.
 *      Default: true
 */
export default function Checkbox({type, id, name, value, size, checked, style, onChange, enabled}) {
    if (checked) {
        return (
            <input 
                className={[type, size].join(' ')}
                type={type}
                id={id}
                name={name}
                value={value}
                style={style}
                onChange={onChange}
                disabled={!enabled}
                checked="checked"
            />
        );
    }
    else {
        return (
            <input 
                className={[type, size].join(' ')}
                type={type}
                id={id}
                name={name}
                value={value}
                style={style}
                onChange={onChange}
                disabled={!enabled}
            />
        );
    }
};

//Control panel settings for storybook
Checkbox.propTypes = {
    //Checkbox type
    type: PropTypes.oneOf(['checkbox', 'radio']),

    //Checkbox size
    size: PropTypes.oneOf(['small', 'large']),

    //Checkbox enabled flag
    enabled: PropTypes.bool
};

//Default values for this component
Checkbox.defaultProps = {
    type: 'checkbox',
    size: 'small',
    onChange: () => {},
    checked: false,
    style: {},
    enabled: true
};