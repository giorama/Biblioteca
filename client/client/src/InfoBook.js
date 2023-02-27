// client/src/Book.js

import React from "react";
import "./App.css";

class InfoBook extends React.Component {
  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      titolo:props.book.titolo,
      autore:props.book.autore,
      isbn:props.book.isbn,
      trama:props.book.trama,
      dataadd:props.book.dataadd,
      datadel:props.book.datadel,
      numlett:props.book.numlett,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (e) => {
    let fieldname = e.target.name;
    let fieldvalue = e.target.value;
    this.setState({[fieldname]: fieldvalue});
  }

  saveData(sqlbody){
    // Update data in table
    fetch("/generic/Library",{
      method: 'post',
      body: JSON.stringify(sqlbody),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(res => res.json())
    .then(
    (result) => {
      console.log(result.message);
    },
    (error) => {
      console.log(error.message);
    })
  }

  increaseRead (){
    if (!this.state.dataadd){
      alert("Il libro "+this.state.titolo+" non è presente nella tua libreria, aggiungere il libro prima di leggerelo");
      return;
    }
    if (!this.state.datadel){
      alert("Il libro "+this.state.titolo+" è stato eliminato in data "+this.state.datadel);
      return;
    }
    this.setState({numlett: this.state.numlett + 1})
    this.saveData({
      dataadd:this.state.dataadd,
      datadel:this.state.datadel,
      numlett:this.state.numlett,
      utente: this.props.owner,
      libro: this.props.book.idLibro
    });
  }

  addLibrary(){
    console.log(this.state);
    fetch("/insert/Library",{
      method: 'post',
      body: JSON.stringify({
        dataadd:this.state.dataadd,
        numlett:this.state.numlett,
        utente: this.props.owner,
        libro: this.props.book.idLibro
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(res => res.json())
    .then(
    (result) => {
      console.log(result);
      alert(result.message)
    },
    (error) => {
      alert(error.message)
    })
  }

  delLibrary(){
    console.log(this.state)
    let diff = new Date(this.state.dataadd)- new Date(this.state.datadel);
    if (diff > 0){
      alert("Controllare la data di eliminazione selezionata");
      return;
    }
    if (!this.state.dataadd){
      alert("Impossibile eliminare il libro se non è mai stato aggiunto alla libreria");
      return;
    }
    this.saveData({
      dataadd:this.state.dataadd,
      datadel:this.state.datadel,
      numlett:this.state.numlett,
      utente: this.props.owner,
      libro: this.props.book.idLibro
    });
  }

  render(){
    console.log(this.props.book.idLibro);
    if (!this.props.book.idLibro){
      return (<div>Book not found</div>)
    }else {
      return(
        <tr key={"book"+this.props.book.idLibro}>
          <td key={"book_cell_titolo"+this.props.book.idLibro}  >
            <input type="text" 
                name="titolo"
                value={this.state.titolo}
                key={"book_input_titolo"+this.props.book.idLibro} 
                onChange={this.handleInputChange.bind(this)} readOnly/>
          </td>
          <td key={"book_cell_autore"+this.props.book.idLibro}  >
            <input type="text" 
                name="autore"
                value={this.state.autore}
                key={"book_input_autore"+this.props.book.idLibro} 
                onChange={this.handleInputChange.bind(this)}readOnly/>
          </td>
          <td key={"book_cell_isbn"+this.props.book.idLibro}  >
            <input type="text" 
                name="isbn"
                value={this.state.isbn}
                key={"book_input_isbn"+this.props.book.idLibro} 
                onChange={this.handleInputChange.bind(this)}readOnly/>
          </td>
          <td key={"book_cell_trama"+this.props.book.idLibro}  >
            <input type="text" 
                name="trama"
                value={this.state.trama}
                key={"book_input_trama"+this.props.book.idLibro} 
                onChange={this.handleInputChange.bind(this)}readOnly/>
          </td>
          <td key={"book_cell_dataadd"+this.props.book.idLibro}  >
            <input type="datetime-local" 
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{3}"
              name="dataadd"
              value={this.state.dataadd ? (this.state.dataadd).split('.')[0]:null}
              key={"book_input_dataadd"+this.props.book.idLibro} 
              onChange={this.handleInputChange.bind(this)}/>
          </td>
          <td key={"book_cell_datadel"+this.props.book.idLibro}  >
            <input type="datetime-local" 
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z"
              name="datadel"
              value={this.state.datadel ? (this.state.datadel).split('.')[0]:null}
              key={"book_input_datadel"+this.props.book.idLibro} 
              onChange={this.handleInputChange.bind(this)}/>
          </td>
          <td key={"book_cell_numlett"+this.props.book.idLibro}  >
          <input type="text" 
                name="numlett"
                value={this.state.numlett}
                key={"book_input_numlett"+this.props.book.idLibro} 
                onChange={this.handleInputChange.bind(this)}/>
          </td>
          <td key={"book_cell_btn"+this.props.book.idLibro}  >
            <button key={"book_cell_btnr"+this.props.book.idLibro} onClick={() => this.increaseRead()}>Aggiungi lettura</button>
            <button key={"book_cell_btnedit"+this.props.book.idLibro} onClick={() => this.addLibrary()}>Aggiungi alla mia libreria</button>
            <button key={"book_cell_btndel"+this.props.book.idLibro} onClick={() => this.delLibrary()}>Elimina dalla libreria</button>
          </td>
        </tr>
      )
    }
  }
}

export default InfoBook;