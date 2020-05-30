import React, {useContext, useState} from 'react';
import './CreatePage.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const [link, setLink] = useState('');

  const createLink = async () => {
    try {
      const data = await request('/api/link/generate',
        'POST', {from: link}, {Authorization: `Bearer ${auth.token}`});
      history.push(`/detail/${data.link._id}`);

    } catch (e) {
      window.alert('Что-то пошло не так! Попробуйте снова!')
    }
  };

  const pressHandler = (event) => {
    if (event.key === 'Enter') {
      return createLink();
    }
  }

  const createHandler = () => {
    return createLink();
  }

  return (
    <div className="create-page">
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <label htmlFor="link">
              <InputGroup.Text id="inputGroup-sizing-default">Ссылка</InputGroup.Text>
            </label>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Вставьте ссылку и нажми Enter"
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
        </InputGroup>
      </div>
      <Button variant="success" onClick={createHandler}>Создать сокращение</Button>
    </div>
  )
};
