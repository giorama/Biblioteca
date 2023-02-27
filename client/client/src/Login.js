// client/src/Login.js
import React from 'react';
import "./Add.css";
import Book from './Book';


class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error:null,
      isLogged:null,
      nome:null,
      cognome:null,
      idUser:null,
    }
    this.login = this.login.bind(this);
  }

  // Login to db to check if user avalaible
  login(event) {
    event.preventDefault();
    let formData = new FormData(document.querySelector('form'));
    fetch("/auth",{
      method: 'post',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.users.length){
          this.setState({
            isLogged:true,
            nome: result.users[0].nome,
            cognome:result.users[0].cognome,
            idUser: result.users[0].idUser,
          })
        }
      },
      (error) => {
        this.setState({
          error:true,
          isLogged:false,
        })
      }
    )
  }

  logout(){
    this.setState({
      isLogged: false,
      nome:null,
      cognome:null,
      idUser:null,
    })
  }
  
  render(){
    let error = this.state.error;
    if (error){
      <div>Error during login</div>
    } else if (!this.state.isLogged){     
      return (      
        <div className="login-wrapper">
          <h4>Effettua il login</h4>
          <form>
            <label>
              <p>Nome</p>
              <input className = "form-login" name="nome" type="text" onChange={e => this.setState({nome: e.target.value})}/>
            </label>
            <label>
              <p>Cognome</p>
              <input className = "form-login"  name="cognome" type="text" onChange={e => this.setState({cognome: e.target.value})}/>
            </label>
            <div>
              <button onClick = {this.login}>Login</button>
            </div>
          </form>
        </div>
      )      
    } else {
      return (
        <div>
          <h2>Benvenuto, {this.state.nome} {this.state.cognome} </h2>
          <button onClick={this.logout}>Logout - TODO</button>
          <h2>Libreria</h2>
          <Book owner={this.state.idUser}/>
          
        </div>
        
      )
      
    }

  }
}

export default Login;