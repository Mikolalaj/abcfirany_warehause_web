import './Popup.css'

function Popup({ children, trigger }) {
    return (
        trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-popup">Close</button>
                {children}
            </div>
        </div>
        ) : ""
    )
}

export default Popup;