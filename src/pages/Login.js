import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const schema = yup.object({
  username: yup
    .string()
    .required('le login est requis')
    .email('le doit être un email valide'),
  password: yup.string().required().min(6),
});
const Login = () => {
  const { onLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    onLogin(data);
  };

  return (
    <div className="row vh-100 align-items-center">
      <div className="col-lg-5 mx-auto">
        <h1 className="mb-3 display-5">Connexion</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Login
              </label>
              <input
                className={`form-control ${
                  errors.username ? 'is-invalid' : ''
                }`}
                {...register('username')}
                id="username"
                type="email"
              />
              <div className="invalid-feedback">{errors.login?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Mot de passe
              </label>
              <input
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
                {...register('password')}
                id="password"
                type="password"
              />
              <div className="invalid-feedback">{errors.login?.message}</div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
