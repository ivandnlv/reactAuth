import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { emailReg } from './Registration';
import { useNavigate } from 'react-router-dom';
import { addNewUser, addUserToLocal } from '../redux/slices/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onLoginSubmit = (data) => {
    const { email, password } = data;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { email, accessToken, uid } = userCredential.user;
        dispatch(addNewUser({ email, token: accessToken, id: uid }));
        dispatch(addUserToLocal());
        reset();
        navigate('/');
      })
      .catch((error) => {
        reset();
        alert('Неверный логин или пароль');
      });
  };

  return (
    <Form onSubmit={handleSubmit(onLoginSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className={errors.email?.message && 'text-danger'}>
          {errors.email?.message || 'Адрес электронной почты'}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите свой email"
          className={errors.email?.message && 'border-danger'}
          {...register('email', {
            required: 'Данное поле обязательно для заполнения',
            pattern: {
              value: emailReg,
              message: 'Электронная почта должна иметь вид pochta@mail.ru',
            },
          })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className={errors.password?.message && 'text-danger'}>
          {errors.password?.message || 'Пароль'}
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Введите пароль"
          className={errors.password?.message && 'border-danger'}
          {...register('password', {
            required: 'Данное поле обязательно для заполнения',
          })}
        />
      </Form.Group>

      <div className="row">
        <div className="col-md-auto">
          <Button variant="primary" type="submit">
            Войти
          </Button>
        </div>
        <div className="col">
          <Link to="/registration">
            <Button variant="danger" type="button">
              Зарегистрироваться
            </Button>
          </Link>
        </div>
      </div>
    </Form>
  );
};

export default Login;
