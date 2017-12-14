import axios from "axios";

export default {

  // Gets all articles
  getSavedArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the book with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  getArticles: function(searchTerm, startYear, endYear) {

    // This variable will be pre-programmed with our authentication key
    // (the one we received when we registered)
    const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

    // queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
    // the user hits the search button
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
      authKey + 
      "&q=" +
      searchTerm;

    if(startYear) {
      queryURL = queryURL +  "&begin_date=" + startYear + "0101";
    };

    if(endYear) {
      queryURL = queryURL +  "&end_date=" + endYear + "0101";
    }

    return axios.get(queryURL);
  }
};
