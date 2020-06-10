import React from 'react';
import AuthTemple from '../components/auth/AuthTemple';
// import AuthForm from '../components/auth/AuthForm';
import RegisterForm from '../containers/auth/RegisterForm';

const RegisterPage = () => {
    return (
        <AuthTemple>
            {/* <AuthForm type="register"/> */}
            <RegisterForm/>
        </AuthTemple>
    );
};

export default RegisterPage;