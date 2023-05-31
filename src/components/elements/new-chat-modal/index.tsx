import { FC, FormEvent, useCallback, useState } from 'react';
import { useActions } from '../../../hooks/use-actions';
import Modal from '../../layouts/modal';
import Button from '../ui/buttons/button';
import Input from '../ui/input';

const NewChatModal: FC = () => {
  const [phone, setPhone] = useState('');
  const { createChat } = useActions();

  // Обработка события отправки формы
  const submitHandler = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createChat(phone);
  }, [phone]);

  return (
    <Modal onSubmit={submitHandler} heading="Создание нового чата">
      <Input
        id="phone"
        name="phone"
        type="tel"
        placeholder="Номер телефона получателя"
        required
        minLength={11}
        maxLength={13}
        pattern="^\+?(?:[0-9] ?){6,14}[0-9]$"
        onChange={setPhone}
      />
      <Button type="submit" ariaLabel="Создать">Создать</Button>
    </Modal>
  );
};

export default NewChatModal;
