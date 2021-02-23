import styled from 'styled-components';

const ButtonStyle = styled.button`
    position: relative;
    height: 22px;
    background: rgb(230,230,216);
    background: linear-gradient(90deg, rgba(230,230,216,1) 0%, rgba(181,181,191,1) 35%, rgba(158,158,139,1) 100%);
    border-radius: 8px;
    cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
    width: 70px;
`;

interface IButton {
    label: string | number;
    isLoding: boolean;
    disabled: boolean;
    onClick: () => void;
};

const Button: React.FC<IButton> = ({ label, onClick, isLoding = false, disabled = false }) => {
    const handleButtonClick = () => {
        if (!isLoding && !disabled && onClick) onClick();
    };

    return (
        <ButtonStyle
            onClick  = {handleButtonClick}
            disabled = {disabled}
        >
            <span>{label}</span>
        </ButtonStyle>
    );
};

export default Button;
