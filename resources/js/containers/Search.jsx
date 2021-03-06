/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import axios from 'axios';

import { Container, Col, Row } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/BlogCard';
import SearchInput from '../components/SearchInput';

import '../../sass/Search.scss';

function Search(props) {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const isTag = useQuery().get('isTag') === 'true';
  const searchParam = useQuery().get('searchParam');
  const { tags, poststags } = props;
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    document.title = `Resultados de búsqueda | Juan Daniel Martínez`;

    axios.post('/api/blog/search', { isTag, searchParam }).then((response) => {
      setSearchResult(response.data);
    });
  }, []);

  return (
    <div className="search">
      <Header />

      <Container>
        <Row>
          <Col>
            <SearchInput />

            <p className="text text-center">
              {`Resultados de la búsqueda: ${isTag ? '#' : ''}${searchParam}`}
            </p>
          </Col>
        </Row>

        <Row>
          {searchResult.length !== 0
            ? searchResult.map((post) => (
                <Col key={`search-post-${post.id}`} lg={4} sm={6} xs={12}>
                  <Card
                    type="recent"
                    title={post.title}
                    cover={post.cover}
                    tags={poststags
                      .filter((postTag) => postTag.post_id === post.id)
                      .map((tag) => ({
                        name: tags.filter((tagName) => tagName.id === tag.tag_id)[0].name,
                      }))}
                    body={post.body}
                    created_at={post.created_at}
                    slug={post.slug}
                  />
                </Col>
              ))
            : [...Array(3)].map((e, i) => (
                <Col key={`search-loading-${i}`} lg={4} sm={6} xs={12}>
                  <Card
                    type="recent loading"
                    title="Lorem ipsum dolor sit amet"
                    cover="posts/cover-loading.png"
                    tags={['lorem', 'ipsum', 'dolor']}
                    body="Lorem ipsum dolor sit amet consecetur amade mer do mori lorem ipsum dolor sit amet consecetur amadem er do mod"
                    created_at="Lorem ipsum"
                    slug="lorem"
                  />
                </Col>
              ))}
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

Search.propTypes = {
  poststags: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  poststags: state.poststags,
  tags: state.tags,
});

export default connect(mapStateToProps, null)(Search);
