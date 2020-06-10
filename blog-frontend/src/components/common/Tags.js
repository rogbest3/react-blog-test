import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const Tags = ({tags}) => {
    return (
        <TagsBlock>
            {tags.map( tag => (
                <Link className="tag" to={`/?tag=${tag}`} key={tag}>
                    #{tag}
                </Link>
            ))}
        </TagsBlock>
    );
};
const TagsBlock = styled.div`
    margin-top : 0.5rem;
    .tag{
        display : inline-block;   // flex 효과
        color : ${palette.cyan[7]};
        text-decoration : none;
        margin-left:0.5rem;
        &:hover {
            color : ${palette.cyan[6]}
        }
    }
`
export default Tags;