// client/src/Masterbook.js

import React from "react";
import "./App.css";

class Masterbook extends React.Component {
  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      titolo:null,
      autore:null,
      isbn:null,
      trama:null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (e) => {
    let fieldname = e.target.name;
    let fieldvalue = e.target.value;
    this.setState({[fieldname]: fieldvalue});
    console.log(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch('/insert/Libri', {
      method: 'POST', 
      body: JSON.stringify(this.state),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(res => res.json())
    .then(
    (result) => {
      console.log(result.message);
    },
    (error) => {
      console.log(error.message);
    });
  }

  render(){
    return(
      <form method="post" onSubmit={this.handleSubmit}>
        <div>
          <label>Titolo  <input type="text" name="titolo" placeholder="Inserisci nuovo titolo" value = {this.state.titolo} onChange={this.handleInputChange.bind(this)} required/></label>
          <label>Autore  <input type="text" name="autore" placeholder="Inserisci nuovo autore" value = {this.state.autore} onChange={this.handleInputChange.bind(this)} required/></label>
          <label>ISBN    <input type="text" name="isbn" placeholder="Inserisci nuovo isbn" value = {this.state.isbn} onChange={this.handleInputChange.bind(this)} /></label>
          <label>Trama   <input type="text" name="trama" placeholder="Inserisci una trama del libro" value = {this.state.trama} onChange={this.handleInputChange.bind(this)}/></label>
          <input type="submit" value="Inserisci libro" />
        </div>
      </form>
    )
  }
}

export default Masterbook;