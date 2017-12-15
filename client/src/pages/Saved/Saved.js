import React from "react";
import DeleteBtn from "../../components/DeleteBtn";
import { Link } from "react-router-dom";
import { Col, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

const Saved = props => (

  <Col size="md-12 sm-12">
    <Container>
      <h1>Saved Articles</h1>
    </Container>
    {props.savedArticles.length ? (
      <List>
        {props.savedArticles.map(article => (
          <ListItem key={article.externalID}>
            <a href={article.url} target="_blank">
              <strong>
                {article.title}
              </strong>
            </a>
            <DeleteBtn onClick={() => {
              props.delete(article.externalID);
            }
          }>
            </DeleteBtn>
          </ListItem>
        ))}
      </List>
    ) : (
      <h3>No Results to Display</h3>
    )}
  </Col>
)

export default Saved;
