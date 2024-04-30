import { Navigate, Outlet } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { isLog } = useSelector(
    (state) => ({
      isLog: state.login.isLogIn,
    }),
    shallowEqual
  );
  return isLog ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
