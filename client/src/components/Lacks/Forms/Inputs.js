import { useEffect, useState } from 'react';
import { units, unitsDict } from '../../../dicts';
import { ControlledDropdown } from '../../Common/Dropdown';
import useAPI from '../../../hooks/useAPI';

function AmountInput({ register, errors, control, defaultValue, autoFocus }) {

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

function CommentsInput({ register, errors, defaultValue, autoFocus }) {
    return (
    <div>
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
    </div>
    )
}

function SizeInput({ register, errors, defaultValue, autoFocus }) {
    return (
    <div>
    <input
        autoFocus={autoFocus}
        className={errors.size && 'input-error'}
        type='text'
        placeholder='Wymiar'
        defaultValue={defaultValue}
        {...register('size', {
            maxLength: {
                value: 100,
                message: 'Wymiar może mieć maksymalnie 100 znaków'
            }
        })}
    />
    {errors.size && <p className='input-error-text'>{errors.size.message}</p>}
    </div>
    )
}

function OrderNumberInput({ register, errors, defaultValue, autoFocus }) {
    
    return (
    <div>
    <input
        autoFocus={autoFocus}
        className={errors.orderNumber && 'input-error'}
        type='text'
        placeholder='Numer zamówienia'
        defaultValue={defaultValue}
        {...register('orderNumber', {
            maxLength: {
                value: 100,
                message: 'Numer zamówienia może mieć maksymalnie 100 znaków'
            },
            required: {
                value: true,
                message: 'Numer zamówienia jest wymagany'
            }
        })}
    />
    {errors.orderNumber && <p className='input-error-text'>{errors.orderNumber.message}</p>}
    </div>
    )
}

function SymbolFeatureInput({ errors, defaultValue, control, getValues, setValue, resetField, autoFocus }) {
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
    
    const [stateFeatures, setUrlFeatures,,, refresh] = useAPI('get', '/products/features/null', []);

    useEffect(() => {
        if (stateFeatures.isSuccess) {
            setFeatures(modifyDataFeatures(stateFeatures.data))
        }
    }, [stateFeatures]);

    useEffect(() => {
        setValue('symbol', {label: defaultValue?.symbol, value: defaultValue?.productId})
        resetField('feature')
        setUrlFeatures(`/products/features/${defaultValue?.productId}`)
        refresh()
        setValue('feature', {label: defaultValue?.feature, value: defaultValue?.featureId})
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
            onChange: (e) => {resetField('feature'); setUrlFeatures(`/products/features/${e.target.value.value}`); refresh()}
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