
function RegisteredTextarea( { useForm, name, autoFocus, placeholder, defaultValue, options } ) {
    return (
    <div>
    <textarea
        className={useForm.formState.errors[name] && 'input-error'}
        autoFocus={autoFocus}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...useForm.register(name, options)}
    />
    {useForm.formState.errors[name] && <p className='input-error-text'>{useForm.formState.errors[name].message}</p>}
    </div>
    )
}

export default RegisteredTextarea