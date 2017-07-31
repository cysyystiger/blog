import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class PostEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', category: '', content: '', warn: 0 };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    let post = [];
    axios.get('/api')
      .then((res) => {
        post = res.data.post;
        for (let i = 0; i < post.length; i++) {
          if (post[i]._id === this.props.match.params.id) {
            this.setState(post[i]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  onTitleChange(title) {
    this.setState({ title });
  }
  onCategoryChange(category) {
    this.setState({ category });
  }
  onContentChange(content) {
    this.setState({ content });
  }
  handleSubmit(event) {
    event.preventDefault();
    const id = this.props.match.params.id;
    if (this.state.title !== '' && this.state.category !== '' && this.state.content !== '') {
      axios.put(`/api/post/${id}`, {
        title: this.state.title,
        category: this.state.category,
        content: this.state.content
      })
        .catch(err => console.log(err));
      this.props.history.push('/');
    }
    this.setState({ warn: 1 });
  }
  renderwarn = (a) => {
    if (a) {
      return <p id="warn">You have to type in every item!!</p>;
    } else {
      return <p></p>;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <p>Title</p>
      <input
        className="form-control"
        value={this.state.title}
        onChange={event => this.onTitleChange(event.target.value)} />
      <p>Category</p>
      <input
        className="form-control"
        value={this.state.category}
        onChange={event => this.onCategoryChange(event.target.value)} />
      <p>Content</p>
      <textarea
        rows="12"
        className="form-control"
        value={this.state.content}
        onChange={event => this.onContentChange(event.target.value)} />
      <br />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <Link className="btn btn-danger" to="/">Cancel</Link>
      {this.renderwarn(this.state.warn)}
      </form>
    );
  }

}
