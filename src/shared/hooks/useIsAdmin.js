

const useIsAdmin = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
 
  return user?.userData?.isAdmin ? true : false;
};

export default useIsAdmin;