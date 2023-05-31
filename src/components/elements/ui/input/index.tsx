import { ChangeEventHandler, FC, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import './input.scss';

type InputProps = {
  className?: string;
  id?: string;
  name?: string;
  type?: 'text' | 'tel' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  onChange: (value: string) => void;
  delay?: number;
}

const Input: FC<InputProps> = ({
                                 className = '',
                                 id = '',
                                 name = '',
                                 type = 'text',
                                 placeholder = '',
                                 required = false,
                                 minLength,
                                 maxLength,
                                 pattern,
                                 onChange,
                                 delay = 0,
                               }) => {
  const [value, setValue] = useState('');

  // Обработчик изменений в поле
  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    setValue(event.target.value);
    changeDelay(event.target.value);
  }, []);

  // Задержка для вызова onChange
  const changeDelay = useCallback(
    debounce(value => onChange(value), delay),
    []);

  const inputClass = classNames({
    'input': true,
    [className]: className,
  });

  return (
    <label className={inputClass}>
      <span className="input__required">* </span>
      <input
        className="input__field"
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        onChange={changeHandler}
      />
    </label>
  );
};

export default Input;
