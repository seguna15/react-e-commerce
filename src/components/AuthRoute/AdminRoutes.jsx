import Forbidden from '../../shared/components/Forbidden';
import { useContext } from 'react';
import { AuthContext } from '../../App';


const AdminRoutes = ({children}) => {
    
    const isAdmin  = useContext(AuthContext);
    
    if (!isAdmin) return <Forbidden />;
    return (
        <>{children}</>
    )
}

export default AdminRoutes;