
import { useForm } from 'react-hook-form';
import './ProductForm.css';

function MeterForm({ closePopup, okButtonText, onYes, productData }) {
    const {register, handleSubmit, formState: { errors }} = useForm();
    
    function onSubmit(formData) {
        let {shelfCode, ...rest} = formData;
        shelfCode = shelfCode.split('-');
        onYes({...rest, shelving: shelfCode[0], column: shelfCode[1], shelf: shelfCode[2]});
    }

    return (
    <form className='product-form'>
        <input
            autoFocus
            className={errors.width && 'input-error'}
            type='number'
            placeholder='Szerokość'
            defaultValue={productData.width}
            {...register("width", {
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

        <input
            className={errors.amount && 'input-error'}
            type='number'
            placeholder='Ilość metrów'
            defaultValue={productData.amount}
            {...register("amount", {
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
                    twoDecimals: v => v.toString().length <= v.toString().replace(',', '.').indexOf('.') + 3 || 'Ilość może mieć maksymalnie dwie cyfry po przecinku'
                }
            })}
        />
        {errors.amount && <p className='input-error-text'>{errors.amount.message}</p>}

        <input
            className={errors.shelfCode && 'input-error'}
            type='text'
            placeholder='Kod półki'
            defaultValue={productData.shelving === '' ? '' : `${productData.shelving}-${productData.column}-${productData.shelf}`}
            {...register("shelfCode", {
                required: {
                    value: true,
                    message: 'Kod półki jest wymagany'
                },
                pattern: {
                    value: /\d{1,2}[-]\d{1,2}[-]\d{1,2}/,
                    message: 'Kod półki musi być w formacie: 1-2-3'
                }
            })}
        />
        {errors.shelfCode && <p className='input-error-text'>{errors.shelfCode.message}</p>}

        <input
            className={errors.comments && 'input-error'}
            type='text'
            placeholder='Uwagi'
            defaultValue={productData.comments}
            {...register("comments", {
                maxLength: {
                    value: 100,
                    message: 'Uwagi mogą mieć maksymalnie 100 znaków'
                }
            })}
        />
        {errors.comments && <p className='input-error-text'>{errors.comments.message}</p>}

        <div className="popup-buttons">
            <div className="popup-no" onClick={closePopup}>
                Anuluj
            </div>
            <div className="popup-yes" onClick={handleSubmit(onSubmit)}>
                {okButtonText}
            </div>
        </div>
    </form>
    )
}

export default MeterForm;
