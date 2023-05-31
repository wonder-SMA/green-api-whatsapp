import { FC, FormEvent, useCallback, useState } from 'react';
import { useActions } from '../../../hooks/use-actions';
import { setAuth } from '../../../store/user/actions';
import Modal from '../../layouts/modal';
import Button from '../ui/buttons/button';
import Input from '../ui/input';

const Login: FC = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const { setAuth } = useActions();

  // Обработка события отправки формы
  const submitHandler = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuth({ id: idInstance, token: apiTokenInstance });
  }, [idInstance, apiTokenInstance]);

  return (
    <Modal onSubmit={submitHandler} heading="Авторизация">
      <Input
        id="id-instance"
        name="id-instance"
        placeholder="ID instance"
        required
        onChange={setIdInstance}
      />
      <Input
        id="api-token-instance"
        name="api-token-instance"
        placeholder="API token instance"
        required
        onChange={setApiTokenInstance}
      />
      <Button type="submit" ariaLabel="Войти">Войти</Button>
    </Modal>
  );
};

export default Login;
