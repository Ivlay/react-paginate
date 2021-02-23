import styled from 'styled-components';

const InputWrapper = styled.div`
    position: relative;

    div {
        position: absolute;
        cursor: pointer;
        left: 5px;
        top: 40%;
        border: 1px solid #CCC;
        border-radius: 8px;
        transform: translateY(-55%);
        color: black;
    }
`;

const InputStyle = styled.input<Pick<IInput, 'item'>>`
    height: 34px;
    border-radius: 7.5px;
    outline: none;
    padding: 9px ${(props => props.item ? 54 : 20)}px;
    margin-bottom: 10px;
    transition: padding 0.3s linear;
`;

interface IInput {
    name        : string;
    type        : 'text';
    placeholder : string;
    value       : string;
    item        : string;
    onChange    : (e: React.ChangeEvent<HTMLInputElement>) => void;
    onReset     : (item: string) => void;
};

const Input: React.FC<IInput> = ({ name, type, placeholder, value, onChange, item, onReset }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e);

    return (
        <InputWrapper>
            <InputStyle
                name        = {name}
                type        = {type}
                placeholder = {placeholder}
                value       = {value}
                item        = {item}
                onChange    = {handleInputChange}
            />
            <div onClick={onReset.bind(null, '')}>{item}</div>
        </InputWrapper>
    );
};

export default Input;
