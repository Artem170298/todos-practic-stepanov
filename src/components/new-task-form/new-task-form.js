import { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { label: '' };
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // handleKeyPress = (event) => { //функция для отправки данных по нажатию Enter
  //     if (event.key === 'Enter') {
  //       this.props.onTaskAdded(this.state.label)
  //     }
  // }

  onLabelChange(e) {
    this.setState({
      label: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onTaskAdded(this.state.label);
    this.setState({
      label: '',
    });
  }

  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.label}
          autoFocus
          onChange={this.onLabelChange}
        />
      </form>
    );
  }
}
//
