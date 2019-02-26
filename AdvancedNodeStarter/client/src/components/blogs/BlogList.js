import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs, deleteBlog } from '../../actions';

class BlogList extends Component {
  componentDidMount() {
    this.props.fetchBlogs();
  }

  handleClickDelete = (e, id) => {
    // e.preventDefault();
    this.props.deleteBlog(id);
  }

  renderBlogs() {
    return map(this.props.blogs, blog => {
      return (
        <div className="card darken-1 horizontal" key={blog._id}>
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">{blog.title}</span>
              <p>{blog.content}</p>
            </div>
            <div className="card-action">
              <Link to={`/blogs/${blog._id}`}>Read</Link>
              <a 
                className="waves-effect waves-teal btn-flat"
                onClick={(e) => this.handleClickDelete(e, blog._id)}>
                  Delete
              </a>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderBlogs()}</div>;
  }
}

function mapStateToProps({ blogs }) {
  return { blogs };
}

export default connect(mapStateToProps, { fetchBlogs, deleteBlog })(BlogList);
