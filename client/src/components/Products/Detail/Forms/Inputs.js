

function WidthInput({ register, errors, defaultValue, autoFocus }) {
    return (
    <div>
    <input
        autoFocus={autoFocus}
        className={errors.width && 'input-error'}
        type='number'
        placeholder='Szerokość'
        defaultValue={defaultValue}
        {...register('width', {
            valueAsNumber: true,
            required: {
                value: true,
                message: 'Szerokość jest wymagana'
            },
            max: {
                value: 9999,
                message: 'Szerokość może mieć maksymalnie 4 znaków'
            },
            min: {
                value: 1,
                message: 'Szerokość musi być większa od 0'
            },
            validate: {
                integer: v => parseFloat(v) === parseInt(v) || 'Szerokość musi być liczbą całkowitą w cm'
            }
        })}
    />
    {errors.width && <p className='input-error-text'>{errors.width.message}</p>}
    </div>
    )
}

function AmountMeterInput({ register, errors, defaultValue, autoFocus }) {

    function twoDecimals(input) {
        input = input.toString()
        input = input.replace(',', '.')
        if (input.indexOf('.') === -1) return true;
        if (input.length <= input.indexOf('.') + 3) return true;
        return 'Ilość może mieć maksymalnie dwie cyfry po przecinku'
    }

    return (
    <div>
    <input
        autoFocus={autoFocus}
        className={errors.amount && 'input-error'}
        type='number'
        placeholder='Ilość metrów'
        defaultValue={defaultValue}
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
    {errors.amount && <p className='input-error-text'>{errors.amount.message}</p>}
    </div>
    )
}

function AmountPiecesInput({ register, errors, defaultValue, autoFocus }) {
    return (
    <div>
    <input
        autoFocus={autoFocus}
        className={errors.amount && 'input-error'}
        type='number'
        placeholder='Ilość sztuk'
        defaultValue={defaultValue}
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
                integer: v => parseFloat(v) === parseInt(v) || 'Ilość sztuk musi być liczbą całkowitą'
            }
        })}
    />
    {errors.amount && <p className='input-error-text'>{errors.amount.message}</p>}
    </div>
    )
}

function ShelfCodeInput({ register, errors, defaultValue, autoFocus, type }) {

    const regex = type === 'pillows' ? /[a-zA-Z]\d{1,2}/ : /\d{1,2}[-]\d{1,2}[-]\d{1,2}/
    const format = type === 'pillows' ? 'A1' : '1-2-3'

    return (
    <div>
    <input
        autoFocus={autoFocus}
        className={`shelf-code ${errors.shelfCode && 'input-error'}`}
        type='text'
        placeholder='Kod półki'
        defaultValue={defaultValue}
        {...register('shelfCode', {
            required: {
                value: true,
                message: 'Kod półki jest wymagany'
            },
            pattern: {
                value: regex,
                message: `Kod półki musi być w formacie ${format}`
            }
        })}
    />
    {errors.shelfCode && <p className='input-error-text'>{errors.shelfCode.message}</p>}
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

function FinishInput({ register, errors, defaultValue, autoFocus }) {
    return (
    <div>
    <input
        autoFocus={autoFocus}
        className={errors.finish && 'input-error'}
        type='text'
        placeholder='Wykończenie'
        defaultValue={defaultValue}
        {...register('finish', {
            required: {
                value: true,
                message: 'Wykończenie jest wymagane'
            },
            maxLength: {
                value: 100,
                message: 'Wykończenie może mieć maksymalnie 100 znaków'
            }
        })}
    />
    {errors.finish && <p className='input-error-text'>{errors.finish.message}</p>}
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
        placeholder='Wymiary'
        defaultValue={defaultValue}
        {...register('size', {
            required: {
                value: true,
                message: 'Wymiar jest wymagany'
            },
            maxLength: {
                value: 10,
                message: 'Wymiar może mieć maksymalnie 10 znaków'
            }
        })}
    />
    {errors.size && <p className='input-error-text'>{errors.size.message}</p>}
    </div>
    )
}

export {
    WidthInput,
    AmountMeterInput,
    AmountPiecesInput,
    ShelfCodeInput,
    CommentsInput,
    FinishInput,
    SizeInput
};