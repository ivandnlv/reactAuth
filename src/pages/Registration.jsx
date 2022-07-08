import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addNewUser, addUserToLocal } from '../redux/slices/userSlice';

export const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

const Registration = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmitForm = (data) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const { accessToken, email, uid } = userCredential.user;
        dispatch(addNewUser({ token: accessToken, email, id: uid }));
        dispatch(addUserToLocal());
        navigate('/');
      })
      .catch((error) => {
        alert(error);
      });
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <Link to="/login">
        <Button variant="primary" type="submit">
          Назад
        </Button>
      </Link>
      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Label className={errors.email?.message && 'text-danger'}>
          {errors.email?.message || 'Введите email'}
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
          {errors.password?.message || 'Введите пароль'}
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Придумайте пароль"
          className={errors.password?.message && 'border-danger'}
          {...register('password', {
            required: 'Данное поле обязательно для заполнения',
            minLength: {
              value: 6,
              message: 'Пароль должен содержать не менее 6 символов',
            },
          })}
        />
      </Form.Group>
      <div className="row">
        <div className="col">
          <Button variant="success" type="submit">
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Registration;
