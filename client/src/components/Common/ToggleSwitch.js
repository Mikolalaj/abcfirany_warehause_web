import './ToggleSwitch.css'

function ToggleSwitch({ value, setValue, defaultChecked }) {
    return (
    <div className='switch-box'>
        <input
            type='checkbox'
            className='switch'
            tabIndex='-1'
            value={value}
            defaultChecked={defaultChecked}
            onChange={(e)=>setValue(e.target.checked)}
        />
    </div>
    )
}

function ToggleSwitchRegister({ defaultChecked, register }) {
    return (
    <div className='switch-box'>
        <input
            type='checkbox'
            className='switch'
            tabIndex='-1'
            defaultChecked={defaultChecked}
            {...register}
        />
    </div>
    )
}

export default ToggleSwitch;
export { ToggleSwitchRegister };
