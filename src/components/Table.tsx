import styled        from 'styled-components';

import { IComments } from '@/api/CommentsApi';
import { useState }  from 'react';

const TableStyle = styled.table`
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    border-collapse: collapse;

    thead { 
        th {
            vertical-align: bottom;
            cursor: default;
            font-size: 1rem;
            border-bottom: 2px solid #32383e;
        }
    }

    th {
        font-size: 13px;
        border-top: 1px solid #32383e;
        padding: 0.75rem;

        @media (max-width: 768px) {
            padding: 0;
        }
    }
`;

interface ITable {
    theadValue : IComments;
    data       : IComments[];
};

const Table: React.FC<ITable> = ({ theadValue, data }) => {
    const [order, setOrder] = useState(false);

    const filterTableById = () => {
        setOrder(!order);
        if (!order) {
            data.sort((a, b) => b.id - a.id);
        } else {
            data.reverse();
        };
    };

    return (
        <TableStyle>
            <thead onClick={filterTableById}>
                <tr>
                    {Object.keys(theadValue).map(el => el !== 'postId' && <th key={el}>{el}</th>)}
                </tr>
            </thead>
            <tbody>
                <>
                    {data.map(el => (
                        <tr key={el.id}>
                            <th>{el.id}</th>
                            <th>{el.name}</th>
                            <th>{el.email}</th>
                            <th>{el.body}</th>
                        </tr>
                    ))}
                </>
            </tbody>
        </TableStyle>
    );
};

export default Table;