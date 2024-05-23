import { Navigate, Outlet } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { isLog } = useSelector(
    (state) => ({
      isLog: state.login.isLogIn,
    }),
    shallowEqual
  );
  return isLog ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
