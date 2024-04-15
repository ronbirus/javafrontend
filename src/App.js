import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

function deleteBook(props){
    const id = props.id;
      var myHeaders = new Headers();
      var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
      };
  
      fetch(`http://localhost:8080/api/v1/books/${id}`, requestOptions)
      .then(
          response =>  {
              if( !response.ok) {
                  let code = response.status.toString();
                  throw new Error( `${code} ${response.statusText}`);
              }
              return response.json();
      })
      .then( book => props.setInfo(book) )
      .catch( e => {
          console.log("Error!!!");
          console.log(e.message);
      });
  }


export function ViewAuthors(props){
  useEffect( () => {
    var myHeaders = new Headers();
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/api/v1/authors", requestOptions)
    .then(
        response =>  {
            if( !response.ok) {
                let code = response.status.toString();
                throw new Error( `${code} ${response.statusText}`);
            }
            return response.json();
    })
    .then( author => props.setInfo(author) )
    .catch( e => {
        console.log("Error!!!");
        console.log(e.message);
    });
    
  },[])
  return (
    <>
    {
        props.author.map( author => {
            return (
              <Table striped bordered hover>
<thead>
          <tr>
            <th style={{width: '200px'}}>Author ID</th>
            <th style={{width: '100px'}}>First Name</th>
            <th style={{width: '100px'}}>Last Name</th>
          </tr>
        </thead>
<tbody>
  <tr>
  <td style={{width: '200px'}}>{author.author_id}</td>
    <td style={{width: '100px'}}>{author.firstName}</td>
    <td style={{width: '100px'}}>{author.lastName}</td>
  </tr>
</tbody>
</Table>
            
            )
        })
    }  
</>
  )
}
const [authors, setAuthors] = useState([]);
return (
  <div className="App">
    <header className="App-header">
      <h1>Author List</h1>
      <ViewAuthors authors={authors} setInfo={setAuthors}/>
    </header>
  </div>
);

 

function App() {
  function BookList(props){
    useEffect( () => {
      var myHeaders = new Headers();
      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };
  
      fetch("http://localhost:8080/api/v1/books", requestOptions)
      .then(
          response =>  {
              if( !response.ok) {
                  let code = response.status.toString();
                  throw new Error( `${code} ${response.statusText}`);
              }
              return response.json();
      })
      .then( book => props.setInfo(book) )
      .catch( e => {
          console.log("Error!!!");
          console.log(e.message);
      });
      
    },[])
    return (
      <>
      {
          props.books.map( book => {
              return (
                <Table striped bordered hover>
  <thead>
            <tr>
              <th style={{width: '200px'}}>Title</th>
              <th style={{width: '100px'}}>ISBN</th>
              <th style={{width: '100px'}}>Edition Number</th>
              <th style={{width: '150px'}}>Copy Right</th>
            </tr>
          </thead>
  <tbody>
    <tr>
    <td style={{width: '200px'}}>{book.title}</td>
      <td style={{width: '100px'}}>{book.isbn}</td>
      <td style={{width: '100px'}}>{book.editionNumber}</td>
      <td style={{width: '150px'}}>{book.copyright}</td>
      <td style={{width: '100px'}}><Button variant="danger" onClick={deleteBook(book.isbn)}>Delete</Button></td>
    </tr>
  </tbody>
</Table>
              
              )
          })
      }  
  </>
    )
  }
  const [books, setBooks] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
      <Link to= "/authors">View Authors </Link>
        <h1>Book List</h1>
        <BookList books={books} setInfo={setBooks}/>
      </header>
    </div>
  );
}

export default App;
