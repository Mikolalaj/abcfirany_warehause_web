import Select from 'react-select'
import Creatable from 'react-select/creatable';
import { Controller } from 'react-hook-form';

function Dropdown({ ifError, ...props }) {
    const customTheme = theme => ({
        ...theme,
        borderRadius: 5,
        colors: {
            ...theme.colors,
            primary50: '#efb1f2',
            primary25: '#f8cdfa',
            primary: '#ba54bf'  
        }
    })

    const customStyles = {
        valueContainer: provided => ({
            ...provided,
            paddingLeft: 5,
        })
    }

    const customStylesError = {
        ...customStyles,
        control: base => ({
            ...base,
            borderColor: '#df4a4a',
            '&:hover': {
                borderColor: '#df4a4a'
            }
        })
    }

    return (
    <Select
        className='select'
        styles={ifError ? customStylesError : customStyles}
        theme={customTheme}
        {...props}
    />
    )
}

function ControlledDropdown({ errors, name, control, rules, defaultValue, ...props }) {
    return (
    <div className='select'>
    <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue ? defaultValue : null}
        render={({
            field: { onChange, onBlur, ref, value }
        }) => (
            <Dropdown
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                inputRef={ref}
                ifError={errors[name]}
                {...props}
            />
        )}
    />
    {errors[name] && <p className='input-error-text'>{errors[name].message}</p>}
    </div>
    )
}

function CreateDropdown({ ifError, ...props }) {
    const customTheme = theme => ({
        ...theme,
        borderRadius: 5,
        colors: {
            ...theme.colors,
            primary50: '#efb1f2',
            primary25: '#f8cdfa',
            primary: '#ba54bf'  
        }
    })

    const customStyles = {
        valueContainer: provided => ({
            ...provided,
            paddingLeft: 5,
        })
    }

    const customStylesError = {
        ...customStyles,
        control: base => ({
            ...base,
            borderColor: '#df4a4a',
            '&:hover': {
                borderColor: '#df4a4a'
            }
        })
    }

    return (
    <Creatable
        className='select'
        styles={ifError ? customStylesError : customStyles}
        theme={customTheme}
        {...props}
    />
    )
}

function ControlledCreateDropdown({ errors, name, control, rules, defaultValue, ...props }) {
    return (
    <div>
    <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue ? defaultValue : null}
        render={({
            field: { onChange, onBlur, ref, value }
        }) => (
            <CreateDropdown
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                inputRef={ref}
                ifError={errors[name]}
                {...props}
            />
        )}
    />
    {errors[name] && <p className='input-error-text'>{errors[name].message}</p>}
    </div>
    )
}


export {
    Dropdown,
    ControlledDropdown,
    CreateDropdown,
    ControlledCreateDropdown
};