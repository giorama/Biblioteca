// client/src/Book.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import InfoBook from "./InfoBook"
import Masterbook from "./Masterbook";

class Book extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error:null,
      books:[],
      owner:props.owner,
      isLoaded:false,
    }
  }


  componentDidMount() {
    // Get data from db based on owner provided as param
    if (!this.state.owner){
      return;
    }
    fetch("/library/"+this.state.owner)
    .then(res => res.json())
    .then(
    (result) => {
      this.setState({
        books:result.books,
        isLoaded:true,
      })
    },
    (error) => {
      alert(error.message);
      this.setState({
        error:true,
        isLoaded:true,
      })
    })
  }

  render (){
    const {error, isLoaded, books} = this.state;
    if (error){
       return <div>Error:</div>;
    } else if(!isLoaded) {
       return (
        <div>Loading</div>,
        <img src={logo} className="App-logo" alt="logo" />
       )
    } else {
      console.log('owner'+this.state.owner)
      return (
        <div>
          <Masterbook/>
          <table className = "Books">
            <thead>
              <tr>
                <th>Titolo</th>
                <th>Autore</th>
                <th>ISBN</th>
                <th>Trama</th>
                <th>Data di aggiunta</th>
                <th>Data di eliminazione</th>
                <th>Numero di letture complete</th>
                <th colSpan="2">&nbsp;</th>
              </tr>
            </thead>
            <tbody>

              {
                books.map((data) => 
                  <InfoBook book={data} owner={this.state.owner}/>
                )
              }
            </tbody>
          </table>
        </div>
      )
    }
  }
}


export default Book;