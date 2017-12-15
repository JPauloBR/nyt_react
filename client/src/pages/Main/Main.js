import React, { Component } from "react";
import API from "../../utils/API";
import { Row } from "../../components/Grid";
import Search from "../../pages/Search";
import Results from "../../pages/Results";
import Saved from "../../pages/Saved";

class Main extends Component {
  state = {
    articles: [],
    savedArticles: [],
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
            endYear: "" 
          }
        )
    this.loadSavedArticles();
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

  loadSavedArticles = () => {
    API.getSavedArticles()
      .then(res =>
        this.setState(
          { 
            savedArticles: res.data
        // console.log(res.data.response.docs)  
          }    
        )
        )
      .catch(err => console.log(err));
  };

  handleDelete = id => {
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
      this.loadSavedArticles();
  };

  saveArticle = obj => {
    API.saveArticle(obj)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
      this.loadSavedArticles();
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
      this.loadArticles(this.state.title, this.state.startYear, this.state.endYear)  
  };

  toggleModal = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    return (
      <Row >
        <Search 
            searchTerm={this.state.title}
            onChangeSearch={this.handleInputChange}
            searchName="title"
            searchPlaceholder="Topic (required)"

            startYear={this.state.startYear}
            onChangeStartYear={this.handleInputChange}
            startYearName="startYear"
            startYearPlaceholder="Start Year (Optional)"

            endYear={this.state.endYear}
            onChangeEndYear={this.handleInputChange}
            endYearName="endYear"
            endYearPlaceHolder="End Year (Optional"

            disabled={!(this.state.title)}
            onClick={this.handleFormSubmit}
        />
        <Results
          articles={this.state.articles}
          saveArticle={this.saveArticle}
          toggleModal={this.toggleModal}
        />

        <Saved 
          savedArticles={this.state.savedArticles}
          delete={this.handleDelete}
        />
      </Row>
    );
  }
}

export default Main;
