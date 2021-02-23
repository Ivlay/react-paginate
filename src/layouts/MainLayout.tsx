import styled          from 'styled-components';

import { GlobalStyle } from '@/styled/globalStyled';

const MainLayoutStyle = styled.div`
    min-height: 100vh;
    max-width: 960px;
    box-sizing: content-box;
    padding: 0 15px;
    margin: 0 auto;
`;

const MainLayout: React.FC = ({ children }) => {
    return (
        <MainLayoutStyle>
            <GlobalStyle />
            {children}
        </MainLayoutStyle>
    );
};

export default MainLayout;
