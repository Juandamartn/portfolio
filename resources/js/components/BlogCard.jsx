/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../../sass/BlogCard.scss';

const BlogCard = (props) => {
  const { type, cover, title, tags, body, created_at, slug } = props;

  const parseDate = (created_at) => {
    const date = new Date(created_at);
    const twoDigitDate = (value) => (value < 10 ? `0${value}` : value);

    return `${twoDigitDate(date.getDate())}/${twoDigitDate(
      date.getMonth() + 1,
    )}/${date.getFullYear()}`;
  };

  return (
    <Link
      to={type.includes('loading') ? '#' : `/blog/${slug}`}
      className={`blog-card card-${type}`}
    >
      <div className="blog-card__cover">
        <img
          src={`/storage/${cover}`}
          alt={`Portada del post "${title}"`}
          title={`Portada del post "${title}"`}
        />
      </div>

      <div className="blog-card--gradient" />

      <div className="blog-card__info d-flex flex-column justify-content-between">
        <div className="blog-card__info__head">
          <h3 className="blog-card__info__head--title">{title}</h3>

          <p className="blog-card__info__head--tags">{tags.map((tag) => `#${tag.name}, `)}</p>
        </div>

        <p className="blog-card__info--desc">
          {type === 'popular' ? `${body.slice(0, 530)}...` : `${body.slice(0, 150)}...`}
        </p>

        <p className="blog-card__info--date">{parseDate(created_at)}</p>
      </div>
    </Link>
  );
};

BlogCard.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  body: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default BlogCard;
