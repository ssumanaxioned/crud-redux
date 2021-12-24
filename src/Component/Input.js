import React, { Component } from 'react'
import { connect } from 'react-redux';
import './input.css';
import { addTodo, getTodo, removeTodo, updateTodo } from '../Actions/actions';

const mapStateToProps = state => {
  return {
    todo: state.data
  }
}

// const mapDispatchToProps =dispatch=> {
//   return {
//     getTodo: ()=> dispatch(getTodo()),
//     addTodo: ()=> dispatch(addTodo()),
//     editTodo: ()=> dispatch(updateTodo()),
//     removeTodo: ()=> dispatch(removeTodo())
//   }
// }

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: '',
      desc: ''
    }
  }

  handleTitle = e => {
    this.setState({ title: e.target.value })
  }

  handleDesc = e => {
    this.setState({ desc: e.target.value })
  }

  handleOnSubmit = e => {
    e.preventDefault();
    if (this.state.title && this.state.desc && !this.state.id) {
      const newTodo = {
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        title: this.state.title,
        desc: this.state.desc
      }
      this.props.dispatch(addTodo(newTodo));
    } else if (this.state.title && this.state.desc && this.state.id) {
      const editTodo = {
        id: this.state.id,
        title: this.state.title,
        desc: this.state.desc
      }
      this.props.dispatch(updateTodo(editTodo));
    } else {
      alert('Enter details');
    }
    this.clearData();
  }

  editDetails = (data) => {
    this.setState({
      id: data.id,
      title: data.title,
      desc: data.desc
    })
    document.getElementById('title').value = data.title;
    document.getElementById('desc').value = data.desc;
  }

  clearData = () => {
    this.setState({
      id: 0,
      title: "",
      desc: ""
    });
    document.getElementById('title').value = '';
    document.getElementById('desc').value = '';
  }

  componentDidMount() {
    this.props.dispatch(getTodo());
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleOnSubmit}>
          <label htmlFor="title">Title
            <input type="text" id='title' onChange={this.handleTitle} />
          </label>
          <label htmlFor="desc">Description
            <input type="text" id='desc' onChange={this.handleDesc} />
          </label>
          <button type="submit">Add</button>
        </form>
        <ul>
          <li>
            <span>Sr No.</span>
            <span>Title</span>
            <span>Description</span>
            <span>Edit</span>
            <span>Delete</span>
          </li>
          {
            this.props.todo && this.props.todo.map((data, index) => {
              return <li key={(index + 1)}>
                <span>{(index + 1)}</span>
                <span>{data.title}</span>
                <span>{data.desc}</span>
                <button onClick={() => this.editDetails(data)}>Edit</button>
                <button onClick={() => this.props.dispatch(removeTodo(data.id))}>Delete</button>
              </li>
            })
          }
        </ul>
      </>
    )
  }
}

export default connect(mapStateToProps)(Input)
