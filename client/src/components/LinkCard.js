import React from 'react';
import Card from 'react-bootstrap/Card';
import './LinkCard.css';

export const LinkCard = ({link}) => {
  return (
    <div className="link-card">
      <Card>
        <Card.Body>
          <h2>Ссылка</h2>
          <p>Сокращённая: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
          <p>Исходная: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
          <p>Количество переходов: <strong>{link.clicks}</strong></p>
          <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </Card.Body>
      </Card>
    </div>
  );
};
