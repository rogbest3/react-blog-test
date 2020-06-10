import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const AuthTemple = ({children}) => {
    return (
        <AuthTempleBlock>
            <WhiteBox>
                <div className="logo-area">
                    <Link to="/">REACTERS</Link>
                </div>
                {children}
            </WhiteBox>
        </AuthTempleBlock>
    );
};
const AuthTempleBlock = styled.div`
    position : absolute;
    left : 0;
    top : 0;
    bottom : 0;
    right : 0;
    background : ${palette.gray[2]};
    display : flex;
    flex-direction: column;
    justify-content : center;
    align-items : center;
`
const WhiteBox = styled.div`
    .logo-area {
        display : block;
        padding-bottom : 2rem;
        text-align : center;
        font-weight : bold;
        letter-spacing : 2px;   // 글자 간격
    }
    box-shadow : 0 0 8px rgba(0, 0, 0, 0.025 );
    padding:2rem;
    width : 360px;
    background : white;
    border-radius : 2px;

`

export default AuthTemple;