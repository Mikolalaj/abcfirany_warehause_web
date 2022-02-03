import { ControlledDropdown } from '../../Common/Dropdown';
import InputSwitch from '../../Common/InputSwitch';
import { destinations } from '../../../dicts';

function AmountInput({ register, errors, defaultValue, registerName, placeholder, autoFocus }) {

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
        autoFocus={autoFocus}
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

function CommentsInput({ register, errors, defaultValue, autoFocus }) {
    return (
    <>
    <input
        autoFocus={autoFocus}
        className={errors.comments && 'input-error'}
        type='text'
        placeholder='Uwagi'
        defaultValue={defaultValue}
        {...register('comments', {
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

function OrderNumberInput({ register, errors, defaultValue, autoFocus, setValue }) {
    return (
    <>
    <InputSwitch errors={errors} setValue={setValue}>
        {isOn => {
            return <input
                autoFocus={autoFocus}
                disabled={!isOn}
                className={errors.orderNumber && 'input-error'}
                type='text'
                placeholder={isOn ? 'Numer zamówienia' : ''}
                defaultValue={defaultValue}
                {...register('orderNumber', {
                    maxLength: {
                        value: 100,
                        message: 'Numer zamówienia może mieć maksymalnie 100 znaków'
                    },
                    required: {
                        value: isOn ? true : false,
                        message: 'Numer zamówienia jest wymagany'
                    }
                })}
            />
        }}
    </InputSwitch>
    {errors.orderNumber && <p className='input-error-text'>{errors.orderNumber.message}</p>}
    </>
    )
}

function DestinationInput({ errors, defaultValue, control, autoFocus }) {

    return (
    <ControlledDropdown
        errors = {errors}
        control = {control}
        defaultValue = {defaultValue}
        autoFocus = {autoFocus}
        placeholder = 'Miejsce'
        name = 'destination'
        options = {destinations}
        rules = {{
            required: {
                value: true,
                message: 'Miejsce docelowe jest wymagane'
            }
        }}
    />
    )
}


export {
    AmountInput,
    CommentsInput,
    OrderNumberInput,
    DestinationInput
};