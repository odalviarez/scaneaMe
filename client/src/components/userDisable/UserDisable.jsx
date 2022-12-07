import React from "react";

export default function UserDisable({user}) {
// const { user, isAuthenticated, logout } = useAuth0();
//   const dispatch = useDispatch()
//   const userLogin = useSelector(state => state.userLogin)

//   useEffect(() => {
//     if (user) dispatch(getUserLogin(user.email))
//   }, [dispatch, userLogin])


  return (
    <div>
      <h1>The user {user.email} is disabled</h1>
    </div>
  );
}
