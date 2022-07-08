import { Navigate } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addNewUser, clearUser } from '../redux/slices/userSlice';

const Main = () => {
  const { email } = useSelector((state) => state.user.user);
  const [auth, setAuth] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) {
      dispatch(addNewUser({ ...localUser }));
      setAuth(true);
    } else setAuth(false);
  }, []);

  const onExitClick = () => {
    dispatch(clearUser());
    setAuth(false);
  };

  return (
    <>
      <ListGroup>
        <ListGroup.Item>Привет, {email}</ListGroup.Item>
      </ListGroup>
      <Button className="mt-5" variant="danger" onClick={onExitClick}>
        Выйти
      </Button>
      {!auth && <Navigate replace to={'/login'} />}
    </>
  );
};

export default Main;
