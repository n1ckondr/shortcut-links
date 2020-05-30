import React from 'react';
import './LinksList.css';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './LinksList.css';

export const LinksList = ({links}) => {
  if (!links.length) {
    return <p className="links-list-center">Ссылок пока нет...</p>
  }

  console.log(links);

  return (
    <div className="links-list">
      <Table bordered striped responsive hover variant="light">
        <thead>
        <tr>
          <th>№</th>
          <th>Исходная</th>
          <th>Сокращёная</th>
          <th>Открыть</th>
        </tr>
        </thead>
        <tbody>
        {links.map((link, idx) => {
          return (
            <tr key={idx}>
              <th>{idx + 1}</th>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Открыть</Link>
              </td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    </div>
  );
};
