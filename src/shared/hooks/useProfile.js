import { useEffect } from "react"
import { getUserProfileAction } from "../../redux/slices/users/usersSlice"
import { useSelector } from "react-redux"

const useProfile = (dispatch) => {
    useEffect(() => {
        dispatch(getUserProfileAction())
    },[dispatch])

    const {loading, profile} = useSelector(state => state?.users)
    return {loading,profile};
}

export default useProfile