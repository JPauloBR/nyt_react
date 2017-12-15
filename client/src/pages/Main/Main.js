import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Modal  from "../../components/Modal";
import CustomModal from "react-modal";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class Main extends Component {
  state = {
    articles: [],
    title: "",
    startYear: "",
    endYear: "",
    isOpen: false
  };

  componentDidMount() {
    this.setState(
          { 
            articles: [], 
            title: "", 
            startYear: "", 
            endYear: "",
            isOpen: false })
  }

  loadArticles = (searchTerm, startYear, endYear) => {
    API.getArticles(searchTerm, startYear, endYear)
      .then(res =>
        this.setState(
          { 
            articles: res.data.response.docs, 
            title: "", 
            startYear: "", 
            endYear: "" })
        // console.log(res.data.response.docs)      
        )
      .catch(err => console.log(err));
  };

  saveArticle = obj => {
    API.saveArticle(obj)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) 
      this.loadArticles(this.state.title)
  };

  toggleModal = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    return (
      <Row >
          <Col size="md-12">
            <Container>
              <h1>Search</h1>
            </Container>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Year (Optional)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Year (Optional)"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-12 sm-12">
            <Container>
              <h1>Results</h1>
            </Container>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={article.web_url}>
                      <strong>
                        {article.headline.main}
                      </strong>
                    </Link>
                    <SaveBtn onClick={() => {
                      this.saveArticle(
                      {
                        title: article.headline.main,
                        url: article.web_url,
                        externalID: article._id
                      }
                      );
                      this.toggleModal()
                    }
                  }>
                    </SaveBtn>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Modal show={this.state.isOpen} className="modal fade" tabindex="-1" role="dialog">
                <SaveBtn onClick={() => this.toggleModal()}/>
          </Modal>


          </Row>
    );
  }
}

export default Main;
