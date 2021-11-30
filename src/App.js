import React, { useState, useEffect } from 'react';
import { Form, Card, Icon, Image } from 'semantic-ui-react'
import './App.css';


function App() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [seguidores, setSeguidores] = useState('');
  const [seguindo, setSeguindo] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('null');

  useEffect(() => {
    fetch(`https://api.github.com/users/example`)
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
  }, [])
  const setData = ({ 
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url }) => {
    setName(name);
    setUserName(login);
    setSeguidores(followers);
    setSeguindo(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const pesquisar = e => {
    setUserInput(e.target.value);
  };
  const enviar = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
     // .then(data => {setData(data)})
     .then(data => {
       if (data.message){
         setError(data.message);
       }else{
         setData(data);
         setError(null);
       }
     })
  }

  return (
    <div>
      <div className="navbar" text="">Pesquisando no Github</div>
      <div className="pesquisa">
        <Form onSubmit={enviar}>
          <Form.Group>
            <Form.Input placeholder='Pequisa no Github' name='github user' onChange={pesquisar} />
            <Form.Button color='twitter' className="button" content='Pesquisar' />
          </Form.Group>
        </Form>
      </div>
     { error ? (<h1>O usuário não existe</h1>) : (
      <div className="card">
        <Card>
          <Image src={avatar} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta meta='Friend'>User: {userName}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name= 'teal' name='users' />
              {seguidores} Seguidores
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='eye' />
              {seguindo} Seguindo
            </a>
          </Card.Content>
          <Card.Content extra>
            <a href="seguidores.js">
              <Icon name='folder open outline' />
              {repos} Respositorios
            </a>
          </Card.Content>
        </Card>
      </div>
      )}
    </div>
  );
}

export default App;
