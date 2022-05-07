import { useEffect, useState } from 'react';
import { units, unitsDict } from '../../../dicts';
import { ControlledDropdown } from '../../Common/Dropdown';
import RegisteredInput from '../../Common/RegisteredInput';
import useAPI from '../../../hooks/useAPI';

function AmountInput({ useForm, defaultValue, autoFocus }) {
    const { control, register, formState: { errors } } = useForm;

    function twoDecimals(input) {
        input = input.toString()
        input = input.replace(',', '.')
        if (input.indexOf('.') === -1) return true;
        if (input.length <= input.indexOf('.') + 3) return true;
        return 'Ilość może mieć maksymalnie dwie cyfry po przecinku'
    }

    return (
    <div>
        <div style={{'display': 'flex', 'justifyContent': 'space-between'}}>
            <input
                style={{'width': '74%'}}
                autoFocus={autoFocus}
                className={errors.amount && 'input-error'}
                type='number'
                placeholder='Ilość'
                defaultValue={defaultValue.amount}
                {...register('amount', {
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
            <ControlledDropdown
                style={{'width': '23%'}}
                name='unit'
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'Jednostka jest wymagana'
                    }
                }}
                placeholder='Jednostka'
                options={units}
                isSearchable={false}
                defaultValue={defaultValue.unit ? {label: unitsDict[defaultValue.unit], value: defaultValue.unit} : units[0]}
            />
        </div>
    {errors.amount && <p className='input-error-text'>{errors.amount.message}</p>}
    </div>
    )
}

function CommentsInput({ useForm, defaultValue, autoFocus }) {
    return (
    <RegisteredInput
        useForm={useForm}
        name='comments'
        autoFocus={autoFocus}
        inputType='text'
        placeholder='Uwagi'
        defaultValue={defaultValue}
        options={{
            maxLength: {
                value: 100,
                message: 'Uwagi mogą mieć maksymalnie 100 znaków'
            }
        }}
    />
    )
}

function SizeInput({ useForm, defaultValue, autoFocus }) {
    return (
        <RegisteredInput
            useForm={useForm}
            name='size'
            autoFocus={autoFocus}
            inputType='text'
            placeholder='Wymiar'
            defaultValue={defaultValue}
            options={{
                maxLength: {
                    value: 100,
                    message: 'Wymiar może mieć maksymalnie 100 znaków'
                }
            }}
        />
    )
}

function OrderNumberInput({ useForm, defaultValue, autoFocus }) {
    return (
    <RegisteredInput
        useForm={useForm}
        name='orderNumber'
        autoFocus={autoFocus}
        inputType='text'
        placeholder='Numer zamówienia'
        defaultValue={defaultValue}
        options={{
            maxLength: {
                value: 100,
                message: 'Numer zamówienia może mieć maksymalnie 100 znaków'
            },
            required: {
                value: true,
                message: 'Numer zamówienia jest wymagany'
            }
        }}
    />

    )
}

function SymbolFeatureInput({ useForm, defaultValue, autoFocus }) {
    const { control, setValue, resetField, formState: { errors } } = useForm;

    const [features, setFeatures] = useState([]);
    const [symbols, setSymbols] = useState([]);

    function modifyDataFeatures(data) {
        return data.map(item => ({
            value: item.feature_id,
            label: item.name
        }))
    }

    function modifyDataSymbols(data) {
        return data.map(item => ({
            value: item.product_id,
            label: item.symbol
        }))
    }

    const [stateSymbols] = useAPI('get', '/products/symbols', []);

    useEffect(() => {
        if (stateSymbols.isSuccess) {
            setSymbols(modifyDataSymbols(stateSymbols.data))
        }
    }, [stateSymbols]);
    
    const [stateFeatures, setUrlFeatures,,,, refreshFeatures] = useAPI('get', '/products/features/null', []);

    useEffect(() => {
        if (stateFeatures.isSuccess) {
            setFeatures(modifyDataFeatures(stateFeatures.data))
        }
    }, [stateFeatures]);

    useEffect(() => {
        defaultValue.symbol !== '' && setValue('symbol', {label: defaultValue?.symbol, value: defaultValue?.productId})
        resetField('feature')
        setUrlFeatures(`/products/features/${defaultValue?.productId ? defaultValue.productId : 'null'}`)
        refreshFeatures()
        defaultValue.feature !== '' && setValue('feature', {label: defaultValue?.feature, value: defaultValue?.featureId})
    }, [defaultValue])

    return (
    <>
    <ControlledDropdown
        errors={errors}
        name='symbol'
        control={control}
        rules={{
            required: {
                value: true,
                message: 'Symbol jest wymagany'
            },
            onChange: (e) => {resetField('feature'); setUrlFeatures(`/products/features/${e.target.value.value}`); refreshFeatures()}
        }}
        autoFocus={autoFocus}
        placeholder='Symbol'
        options={symbols}
        isSearchable={true}
        isLoading={stateSymbols.isLoading}
    />
    <ControlledDropdown
        errors={errors}
        name='feature'
        control={control}
        rules={{
            required: {
                value: features.length === 0 ? false : true,
                message: 'Cecha jest wymagana'
            }
        }}
        placeholder='Cechy'
        options={features}
        isSearchable={true}
        isLoading={stateFeatures.isLoading}
    />
    </>
    )
}

export {
    AmountInput,
    CommentsInput,
    OrderNumberInput,
    SymbolFeatureInput,
    SizeInput
};