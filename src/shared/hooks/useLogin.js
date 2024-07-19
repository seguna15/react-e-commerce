

const useLogin = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const isLoggedIn = user?.token ? true : false
    return isLoggedIn
}

export default useLogin