import './Button.css'

function Button({ theme, children, onClick }) {
    return (
        <div className={`button ${theme}`} onClick={onClick}>
            {children}
        </div>
    )
}

export default Button;