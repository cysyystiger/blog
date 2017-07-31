import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class PostIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { post: [] };
    this.fetchPosts = this.fetchPosts.bind(this);
  }
  componentDidMount() {
    this.fetchPosts();
  }
  fetchPosts() {
    let post = [];
    axios.get('/api')
      .then((res) => {
        post = res.data.post;
        this.setState({ post });
      })
      .catch((err) => {console.log(err);});
  }
  renderPost = (arr) => {
    return arr.map(this.renderPostTitle);
  }
  renderPostTitle = (post) => {
    return (
      <li key={post._id}>
        <Link to={`/post/${post._id}`}>
            {post.title}
        </Link>
      </li>
    );
  }


  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/post/new">Add a Post</Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">{this.renderPost(this.state.post)}</ul>
      </div>
  );
  }
}
