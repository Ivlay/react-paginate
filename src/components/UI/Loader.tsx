import styled, { keyframes } from 'styled-components';

const ldsGrid = keyframes`
    0%,
    100% {
        opacity: 1;
        transform: scale(1);
        -webkit-transform: scale(1);
    }

    50% {
        opacity: 0.7;
        transform: scale(0.5);
        -webkit-transform: scale(0.5);
    }
`;

const LoaderStyle = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    div {
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin: 2px;
        background: #208D8C;
        animation: ${ldsGrid} 0.8s ease infinite;

        &:nth-child(1) {
            top: 8px;
            left: 8px;
            animation-delay: 0s;
        }

        &:nth-child(2) {
            top: 8px;
            left: 32px;
            animation-delay: -0.25s;
        }

        &:nth-child(3) {
            top: 8px;
            left: 56px;
            animation-delay: -0.6s;
        }

        &:nth-child(4) {
            top: 32px;
            left: 8px;
            animation-delay: -0.9s;
        }

        &:nth-child(5) {
            top: 32px;
            left: 32px;
            animation-delay: -1.5s;
        }

        &:nth-child(6) {
            top: 32px;
            left: 56px;
            animation-delay: -0.45s;
        }

        &:nth-child(7) {
            top: 56px;
            left: 8px;
            animation-delay: -0.6s;
        }

        &:nth-child(8) {
            top: 56px;
            left: 32px;
            animation-delay: -0.3s;
        }

        &:nth-child(9) {
            top: 56px;
            left: 56px;
            animation-delay: -0.8s;
        }
    }
`;

const Loader: React.FC = () => {
    return (
        <LoaderStyle>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </LoaderStyle>
    );
};

export default Loader;
