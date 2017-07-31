import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

export default class PostShow extends Component {
  constructor(props) {
    super(props);
    this.state = { post: {} };
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onBack = this.onBack.bind(this);
    this.fetchPost = this.fetchPost.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchPost(id);
  }
  fetchPost(id) {
    let post = [];
    axios.get('/api')
      .then((res) => {
        post = res.data.post;
        for (let i = 0; i < post.length; i++) {
          if (post[i]._id === id) {
            this.setState({ post: post[i] });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onBack() {
    this.props.history.push('/');
  }
  onEdit() {
    const id = this.props.match.params.id;
    this.props.history.push(`/post/edit/${id}`);
  }
  onDelete() {
    const id = this.props.match.params.id;
    axios.delete(`/api/post/${id}`)
      .catch(err => console.log(err));
    this.props.history.push('/');
  }
  render() {
    const { post } = this.state;
    if (!post.content) {
      return <div>Loading...</div>;
    }
    const html = post.content.replace(/\r?\n/g, '<br />');

    return (
      <div>
        <button
          onClick={this.onBack}
          className="btn btn-default"
          id="back"
        >
          Back to index
        </button>
        <button
          onClick={this.onEdit}
          className="btn btn-primary"
        >
          Edit
        </button>
        <button
          onClick={this.onDelete}
          className="btn btn-danger"
        >
          Delete
        </button>
        <h3>{post.title}</h3>
        <h3>Category: {post.category}</h3>
        <h4>{ ReactHtmlParser(html) }</h4>
      </div>
    );
  }
}
