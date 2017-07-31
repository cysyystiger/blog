import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class PostNew extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', category: '', content: '', warn: 0, count: 0};
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onNewPost = this.onNewPost.bind(this);
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
  onNewPost(event) {
    event.preventDefault();
    if (this.state.title !== '' && this.state.category !== '' && this.state.content !== '') {
      axios.post('/api/newpost', { title: this.state.title, category: this.state.category, content:this.state.content })
        .then((res) => {console.log(res);})
        .catch((err) => {console.log(err);});
      let a = this.state.count;
      a = a + 1;
      this.setState({ title: '', category: '', content: '', warn: 0, count: a });
    } else {
      this.setState({ warn: 1 });
    }
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
      <form onSubmit={this.onNewPost} className="input-group-button">
      <p>Title</p>
      <input
        className="form-control"
        placeholder="Type title"
        value={this.state.title}
        onChange={event => this.onTitleChange(event.target.value)} />
      <p>Category</p>
      <input
        className="form-control"
        placeholder="Type category"
        value={this.state.category}
        onChange={event => this.onCategoryChange(event.target.value)} />
      <p>Content</p>
      <textarea
        rows="12"
        className="form-control"
        placeholder="Type content"
        value={this.state.content}
        onChange={event => this.onContentChange(event.target.value)} />
      <br />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <Link to="/" className="btn btn-danger">Back to Index</Link>
      {this.renderwarn(this.state.warn)}
      <p>You have submit {this.state.count} post(s)</p>
      </form>

    );
  }
}
