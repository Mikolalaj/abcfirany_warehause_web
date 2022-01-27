import './ToggleSwitch.css'

function ToggleSwitch({ value }) {
    return (
    <div className="switch-box">
        <input type="checkbox" className="switch" value={value} />
    </div>
    )
}

export default ToggleSwitch;