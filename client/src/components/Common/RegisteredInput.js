
function RegisteredInput( { useForm, name, autoFocus, inputType, placeholder, defaultValue, options } ) {
    return (
    <div>
    <input
        className={useForm.formState.errors[name] && 'input-error'}
        autoFocus={autoFocus}
        type={inputType}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...useForm.register(name, options)}
    />
    {useForm.formState.errors[name] && <p className='input-error-text'>{useForm.formState.errors[name].message}</p>}
    </div>
    )
}

export default RegisteredInput