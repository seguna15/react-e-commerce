import React from 'react'
import useLogin from '../../shared/hooks/useLogin'
import Login from '../Users/Forms/Login';

const AuthRoute = ({children}) => {
    //get user from localStorage
    const isLoggedIn = useLogin();
    console.log(isLoggedIn)
    if(!isLoggedIn) return <Login />
    return (
        <>{children}</>
    )
}

export default AuthRoute