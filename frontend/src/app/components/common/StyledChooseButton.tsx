import './buttonStyles.css';

export const ChooseButton = ({children, ...props} : any) => {
    return <button
    className="btn-grad"
    {...props}
    >
        {children}
    </button>
}