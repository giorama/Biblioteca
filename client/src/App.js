import React from 'react';
import './App.css';
import Login from './Login';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error:null,
      isLogged:null,
      idUser:null,
    }
  }

  render(){
    const iduser = this.state.idUser;
    if (!iduser){
      return(
        <div className="wrapper">
          <h1>Index</h1>

          <h2>Login</h2>
          <Login selectedUser={this.selectedUser}/>
        </div>
      )
    } else {
      return(
        <div className="wrapper">
          <h1>Index</h1>
            <Login selectedUser={this.selectedUser}/>
        </div>
      )      
    }

  }
}

export default App;