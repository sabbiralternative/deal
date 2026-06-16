const PrivateRoute = ({ children }) => {
  // const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);

  // if (Settings.force_login) {
  //   if (!token) {
  //     dispatch(logout());
  //     dispatch(setShowLoginModal(true));
  //   }
  // }
  return children;
};

export default PrivateRoute;
