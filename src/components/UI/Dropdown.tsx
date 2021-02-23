import { IComments } from '@/api/CommentsApi';
import styled        from 'styled-components';

const DropDownStyle = styled.div`
    p {
        cursor: pointer;
        text-align: center;

        &:hover {
            text-decoration: underline;
        }
    }
`;

interface IDropDown {
    items: IComments;
    inputValue: string;
    setFindItem: (item: string) => void;
};

const DropDown: React.FC<IDropDown> = ({ items, inputValue, setFindItem }) => {
    const handleItemClick = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        setFindItem(e.currentTarget.innerText);
    }

    const renderList = () => {
        let renderSearchItem = Object.keys(items);

        if (inputValue) {
            renderSearchItem = renderSearchItem.filter((el) =>
                el.toLowerCase()
                .includes(inputValue.toLowerCase())
            );
        } else {
            renderSearchItem = Object.keys(items);
        };

        return renderSearchItem.map(el => el !=='postId' && (
            <p
                onClick = {handleItemClick}
                key     = {el}
            >
                {el}
            </p>
        ));
    };

    return (
        <DropDownStyle>
            {inputValue && renderList()}
        </DropDownStyle>
    );
};

export default DropDown;
