import ToggleSwitch from "./ToggleSwitch";
import { useState } from 'react';
import './InputSwitch.css';

function InputSwitch({ errors, setValue, children }) {
    const [isOn, setIsOn] = useState(true);

    function updateSwitch(value) {
        setIsOn(value);
        if (value === false) {
            errors.orderNumber = undefined
            setValue('orderNumber', '');
        }
    }
    
    return (
    <div className='input-switch'>
        {children(isOn)}
        <ToggleSwitch setValue={updateSwitch} value={isOn} defaultChecked={true} />
    </div>
    )
}

export default InputSwitch;