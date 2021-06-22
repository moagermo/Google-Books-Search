import React, { Component } from 'react';
import { Container } from '../components/Grid/Grid';
import Nav from "../components/Nav/Nav";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import {Input, SubmitBtn} from "../components/Search/Search";
import API from "../utils/API";
import ResultList from "../components/ResultList/ResultList";

class Home extends Component
{
    state = {
        books:[],
        search: ""
    };

    searchBooks = () => 
    {
        API.googleBooks(this.state.search)
        .then(res => 
            {
                this.setState({books: res.data.items, search: ""})
            })
        .catch(err => console.log(err));
    };

    handleInputChange = event =>
    {
        const{name, value} = event.target;
        this.setName({[name]: value});
    };

    handleFormSubmit = event => 
    {
        event.preventDefault();
        this.searchBooks();
    };

    saveGoogleBook = currentBook => 
    {
        API.saveBook(
            {
                id: currentBook.id,
                title: currentBook.title,
                authors: currentBook.authors,
                description: currentBook.description,
                image: currentBook.image,
                link: currentBook.link
            })
            .then(res => console.log("Successful POST to DB!", res))
            .catch(err => console.log("Can not POST to DB!, err"))
    }

    render(){
        return(
            <div>
                <Nav />
                <Container fluid>
                    <Jumbotron />
                    <form>
                        <h5>Search for books.</h5>
                        <Input 
                        value={this.state.search}
                        onChange={this.handleInputChange}
                        name={"search"}
                        placeholder="e.g. Harry Potter"
                        />

                        <SubmitBtn onClick={this.handleFormSubmit}/>

                    </form>
                        
                        {this.state.books.length ? (<ResultList>bookState={this.state.books}
                        saveGoogleBook={this.saveGoogleBook}
                        </ResultList>) : (<div>
                                            <hr/>
                                            <p style={{fontStyle: "italic"}}>No results...</p>
                                          </div>)
                        }
                    
                </Container>
            </div>
        )
    }
}

export default Home;