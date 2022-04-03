import { ControlledDropdown } from '../../Common/Dropdown';
import RegisteredInput from '../../Common/RegisteredInput';
import InputSwitch from '../../Common/InputSwitch';
import { destinations } from '../../../dicts';

function AmountInput({ useForm, defaultValue, registerName, placeholder, autoFocus }) {

    function twoDecimals(input) {
        input = input.toString()
        input = input.replace(',', '.')
        if (input.indexOf('.') === -1) return true;
        if (input.length <= input.indexOf('.') + 3) return true;
        return 'Ilość może mieć maksymalnie dwie cyfry po przecinku'
    }

    return (
    <RegisteredInput
        useForm={useForm}
        name={registerName}
        autoFocus={autoFocus}
        inputType='number'
        defaultValue={defaultValue}
        placeholder={placeholder}
        options={{
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
        }}
    />
    )
}

function CommentsInput(props) {
    return (
    <RegisteredInput
        {...props}
        name='comments'
        inputType='text'
        placeholder='Uwagi'
        options={{
            maxLength: {
                value: 100,
                message: 'Uwagi mogą mieć maksymalnie 100 znaków'
            }
        }}
    />
    )
}

function OrderNumberInput({ useForm, defaultValue, autoFocus }) {
    const { register, setValue, formState: { errors } } = useForm;

    return (
    <div>
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
    </div>
    )
}

function DestinationInput({ useForm, defaultValue, autoFocus }) {
    const { control, formState: { errors } } = useForm;

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