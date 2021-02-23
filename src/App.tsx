import { useEffect, useState } from 'react';
import { hot }                 from 'react-hot-loader/root';
import styled                  from 'styled-components';
import { useQuery }            from 'react-query';

import api                     from 'apiSingelton';
import { IComments }           from './api/CommentsApi';

import Button                  from '@components/UI/Button';
import MainLayout              from '@layouts/MainLayout';
import Table                   from '@components/Table';
import Input                   from '@components/UI/Input';
import DropDown                from '@components/UI/Dropdown';

const Wrapper = styled.div`
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
`;

const ButtonContainer = styled.footer`
    button + button {
        margin-left: 20px;
    }
`;

const App: React.FC = () => {
    const [pageState, setPageState] = useState({
        pageNumber : 0,
        findItem   : '',
        value      : ''
    });

    useEffect(() => {
        document.body.scrollIntoView({
            behavior : 'smooth',
            block    : 'start'
        });
    }, [pageState.pageNumber]);

    const { data, isLoading, isFetching } = useQuery(
        ['comments', pageState.pageNumber],
        () => api.comments.loadComments(pageState.pageNumber),
        { keepPreviousData: true, staleTime: 5000, refetchInterval: false, refetchOnWindowFocus: false }
    );

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPageState({
            ...pageState,
            value: e.target.value
        });
    };

    const setFindItem = (item: string) => {
        setPageState({
            ...pageState,
            findItem : item,
            value    : ''
        });
    };

    const renderTable = () => {
        let dataTable: IComments[];

        if (pageState.findItem) {
            dataTable = data.data.filter(el => {
                return String(el[pageState.findItem])
                    .toLowerCase()
                    .includes(pageState.value.toLowerCase())
            });
        } else {
            dataTable = data.data
        };

        return (
            <Table
                data       = {dataTable}
                theadValue = {data?.data[0]}
            />
        );
    };

    const handlePaginateClick = (e: 'next' | 'prev') => {
        const maxpages = +data.totalCount / 10 - 5;
        if (e === 'next' && pageState.pageNumber < maxpages) {
            setPageState({
                ...pageState,
                pageNumber: pageState.pageNumber + 5
            });
        } else if (e === 'prev' && pageState.pageNumber) {
            setPageState({
                ...pageState,
                pageNumber: pageState.pageNumber - 5
            });
        };
    };

    return (
        <MainLayout>
            <Wrapper>
                {data && (
                    <>
                        <Input
                            name        = 'findItem'
                            placeholder = 'find'
                            type        = 'text'
                            item        = {pageState.findItem}
                            value       = {pageState.value}
                            onChange    = {handleValueChange}
                            onReset     = {setFindItem}
                        />
                        <DropDown
                            items       = {data?.data[0]}
                            inputValue  = {pageState.findItem ? '' : pageState.value}
                            setFindItem = {setFindItem}
                        />
                        {renderTable()}
                        <ButtonContainer>
                            <Button
                                isLoding = {isLoading || isFetching}
                                onClick  = {handlePaginateClick.bind(null, 'prev')}
                                disabled = {!pageState.pageNumber}
                                label    = 'prev'
                            />
                            <Button
                                isLoding = {isLoading || isFetching}
                                onClick  = {handlePaginateClick.bind(null, 'next')}
                                disabled = {pageState.pageNumber === +data.totalCount / 10 - 5}
                                label    = 'next'
                            />
                        </ButtonContainer>
                    </>
                )}
            </Wrapper>
        </MainLayout>
    );
};

export default hot(App);
