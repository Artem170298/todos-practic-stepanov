import { Component } from 'react';
// import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { label: '', minutes: '', seconds: '' };
  }

  handleKeyPressEnter = (event) => {
    // функция для отправки данных по нажатию Enter
    const { label, minutes, seconds } = this.state;
    const trimmedLabel = label.trim();

    if (!trimmedLabel) {
      return;
    }
    if (event.key === 'Enter') {
      this.props.onTaskAdded(trimmedLabel, parseInt(minutes, 10) || 0, parseInt(seconds, 10) || 0);
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  // eslint-disable-next-line class-methods-use-this
  handleKeyPress = (e) => {
    if (e.target.value >= 60 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinutesChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,2}$/.test(input)) {
      const num = parseInt(input, 10) || 0;

      if (input === '' || (num >= 1 && num <= 60)) {
        this.setState({
          minutes: input,
        });
      }
    }
  };

  onSecondsChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,2}$/.test(input)) {
      const num = parseInt(input, 10) || 0;

      if (input === '' || (num >= 1 && num <= 60)) {
        this.setState({
          seconds: input,
        });
      }
    }
  };

  render() {
    return (
      <div className="header new-todo-form">
        <h1>todos</h1>
        <form onKeyDown={this.handleKeyPressEnter}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.label}
            autoFocus
            onChange={this.onLabelChange}
          />
          <input
            type="number"
            min={0}
            max={60}
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.minutes}
            onKeyDown={this.handleKeyPress}
            onChange={this.onMinutesChange}
            inputMode="numeric"
          />
          <input
            type="number"
            min={0}
            max={60}
            className="new-todo-form__timer"
            placeholder="Sec"
            value={this.state.seconds}
            onKeyDown={this.handleKeyPress}
            onChange={this.onSecondsChange}
          />
        </form>
      </div>
    );
  }
}
//
