


const useIsAdmin = () => {
  
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.userFound?.isAdmin ? true : false
  
  //return 
  return isAdmin
};

export default useIsAdmin;