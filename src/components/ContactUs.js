import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';

export const ContactUs = () => {
  const form = useRef();
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_d68zfap', 'template_08c2t65', form.current, {
        publicKey: 'aNHpnLvCFCG1WnhSN',
      })
      .then(
        () => {
          setIsMessageSent(true);
          alert('SUCCESS: ваше письмо успешно отправлено!');
          setErrorMessage('');
        },
        (error) => {
          alert('FAILED', error.text);
          setIsMessageSent(false);
          setErrorMessage('При отправке письма возникла ошибка');
        },
      );
  };

  return (
    <div>
      <form ref={form} onSubmit={sendEmail}>
        <label>Имя</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Сообщение</label>
        <textarea name="message" />
        <input type="submit" value="Отправить" />
      </form>

      {isMessageSent ? (
        <div className="message-sent">
          Сообщение успешно отправлено!
        </div>
      ) : (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
};