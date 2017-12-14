import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Results extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    this.loadSavedArticles() 
  }

  loadSavedArticles = () => {
    API.getSavedArticles()
      .then(res =>
        this.setState(
          { 
            articles: res.data
        // console.log(res.data.response.docs)  
          }    
        )
        )
      .catch(err => console.log(err));
  };

  handleDelete = event => {
    event.preventDefault();
    if (this.state.title) 
      this.loadArticles(this.state.title)
  };

  render() {
    return (
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article.externalID}>
                    <Link to={article.url}>
                      <strong>
                        {article.title}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.handleDelete(article.externalID)}>
                    </DeleteBtn>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
    );
  }
}

export default Results;
