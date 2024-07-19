import React from 'react'
import useLogin from '../../shared/hooks/useLogin'
import Login from '../Users/Forms/Login';
import useIsAdmin from '../../shared/hooks/useIsAdmin';
import Forbidden from '../../shared/components/Forbidden';

const AdminRoutes = ({children}) => {
    //get user from localStorage
    const isLoggedIn = useIsAdmin();

    if(!isLoggedIn) return <Forbidden/>
    return (
        <>{children}</>
    )
}

export default AdminRoutes;