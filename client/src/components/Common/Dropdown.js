import Select from 'react-select'
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

function ControlledDropdown({ errors, name, control, rules, ...props }) {
    return (
    <>
    <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
            field: { onChange, onBlur, ref, value }
        }) => (
            <Dropdown
                onBlur={onBlur}
                onChange={onChange}
                inputRef={ref}
                checked={value}
                ifError={errors[name]}
                {...props}
            />
        )}
    />
    {errors[name] && <p className='input-error-text'>{errors[name].message}</p>}
    </>
    )
}


export {
    Dropdown,
    ControlledDropdown
};