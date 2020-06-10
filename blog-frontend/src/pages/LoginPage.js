import React from 'react';
import AuthTemple from '../components/auth/AuthTemple';
// import AuthForm from '../components/auth/AuthForm';
import LoginForm from '../containers/auth/LoginForm';

const LoginPage = () => {
    return (
        <AuthTemple>
            {/* <AuthForm type="login"/> */}
            <LoginForm/>
        </AuthTemple>
    );
};

export default LoginPage;