import { useState } from 'react';
import Select from 'react-select'
import ToggleSwitch from '../../Common/ToggleSwitch';
import { Controller } from 'react-hook-form';
import { destinations } from '../../../dicts';

function AmountInput({ register, errors, defaultValue, registerName, placeholder }) {

    function twoDecimals(input) {
        input = input.toString()
        input = input.replace(',', '.')
        if (input.indexOf('.') === -1) return true;
        if (input.length <= input.indexOf('.') + 3) return true;
        return 'Ilość może mieć maksymalnie dwie cyfry po przecinku'
    }

    return (
    <>
    <input
        className={errors[registerName] && 'input-error'}
        type='number'
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(registerName, {
            valueAsNumber: true,
            required: {
                value: true,
                message: 'Ilość jest wymagana'
            },
            max: {
                value: 99999,
                message: 'Ilość może mieć maksymalnie 5 znaków'
            },
            min: {
                value: 1,
                message: 'Ilość musi być większa od 0'
            },
            validate: {
                twoDecimals: v => twoDecimals(v)
            }
        })}
    />
    {errors[registerName] && <p className='input-error-text'>{errors[registerName].message}</p>}
    </>
    )
}

function CommentsInput({ register, errors, defaultValue }) {
    return (
    <>
    <input
        className={errors.comments && 'input-error'}
        type='text'
        placeholder='Uwagi'
        defaultValue={defaultValue}
        {...register("comments", {
            maxLength: {
                value: 100,
                message: 'Uwagi mogą mieć maksymalnie 100 znaków'
            }
        })}
    />
    {errors.comments && <p className='input-error-text'>{errors.comments.message}</p>}
    </>
    )
}

function OrderNumberInput({ register, errors, defaultValue }) {
    const [isOn, setIsOn] = useState(true);

    return (
    <>
    <div className='input-switch'>
        <input
            disabled={isOn}
            className={errors.orderNumber && 'input-error'}
            type='text'
            placeholder='Numer zamówienia'
            defaultValue={defaultValue}
            {...register("orderNumber", {
                maxLength: {
                    value: 100,
                    message: 'Numer zamówienia może mieć maksymalnie 100 znaków'
                },
                required: {
                    value: true,
                    message: 'Numer zamówienia jest wymagany'
                },
            })}
        />
        <div onClick={()=>setIsOn(!isOn)}><ToggleSwitch value={isOn} /></div>
    </div>
    {errors.orderNumber && <p className='input-error-text'>{errors.orderNumber.message}</p>}
    </>
    )
}

function DestinationInput({ errors, defaultValue, control }) {
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
    <>
    <Controller
        control={control}
        name="destination"
        rules={{ required: {value: true, message: 'Ilość jest wymagana' }}}
        render={({
            field: { onChange, onBlur, ref, value }
        }) => (
            <Select
                onBlur={onBlur}
                onChange={onChange}
                inputRef={ref}
                checked={value}
                placeholder='Miejsce'
                className='select'
                styles={errors.destination ? customStylesError : customStyles}
                options={destinations.sewing}
                defaultValue={defaultValue}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                        ...theme.colors,
                        primary25: '#f8cdfa',
                        primary: '#ba54bf'  
                    }
                })}
            />
        )}
    />
    {errors.destination && <p className='input-error-text'>{errors.destination.message}</p>}
    </>
    )
}


export {
    AmountInput,
    CommentsInput,
    OrderNumberInput,
    DestinationInput
};