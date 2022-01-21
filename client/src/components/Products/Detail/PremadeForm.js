
import { useForm } from 'react-hook-form';
import './ProductForm.css';

function PremadeForm({ closePopup, okButtonText, onYes, productData }) {
    const {register, handleSubmit, formState: { errors }} = useForm();

    function onSubmit(formData) {
        let {shelfCode, ...rest} = formData;
        shelfCode = shelfCode.split('-');
        onYes({...rest, shelving: shelfCode[0], column: shelfCode[1], shelf: shelfCode[2]});
    }

    return (
    <form className='product-form'>
        <input
            className={errors.size && 'input-error'}
            type='text'
            placeholder='Wymiary'
            defaultValue={productData.size}
            {...register("size", {
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

        <input
            className={errors.amount && 'input-error'}
            type='number'
            placeholder='Ilość sztuk'
            defaultValue={productData.amount}
            {...register("amount", {
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
            className={errors.finish && 'input-error'}
            type='text'
            placeholder='Wykończenie'
            defaultValue={productData.finish}
            {...register("finish", {
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

export default PremadeForm;
