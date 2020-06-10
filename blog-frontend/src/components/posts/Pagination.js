import React from 'react';
import styled from 'styled-components'
import Button from '../common/Button';
import qs from 'qs'

const buildLink = ({ username, tag, page }) => {
    const query = qs.stringify({tag, page})
    return username ? `/@${username}?${query}` : `/?${query}`
}

const Pagination = ({ page, lastPage, username, tag }) => {
    console.log('lastPage : ', lastPage)
    return (
        <PaginationBlock>
            <Button
                disabled={page === 1}
                to={ page === 1 
                    ? undefined 
                    : buildLink({ username, tag, page : page - 1})
                }
            >
                이전
            </Button>
            <PageNumber>{page}</PageNumber>
            <Button
                disabled={page === lastPage}
                to={ page === lastPage 
                    ? undefined 
                    : buildLink({ username, tag, page : page + 1})}
            >
                다음
            </Button>
        </PaginationBlock>
    );
};
const PaginationBlock = styled.div`
    width : 320px;
    margin : 0 auto;
    display : flex;
    justify-content : space-between;
    margin-bottom : 3rem;
`
const PageNumber = styled.div`

`

export default Pagination;