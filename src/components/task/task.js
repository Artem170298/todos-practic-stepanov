/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from '../timer';
// import './task.css';

export default class Task extends Component {
  state = {
    label: '',
    seconds: this.props.seconds,
    minutes: this.props.minutes,
  };

  // componentDidMount() {
  //   this.startTimer(this.props.minutes, this.props.seconds);
  // }

  componentWillUnmount() {
    this.stopTimer();
  }

  incrimentTimer = () => {
    // таймер на увеличение
    this.timerId = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.seconds === 59) {
          return {
            minutes: prevState.minutes + 1,
            seconds: 0,
          };
        }
        if (prevState.minutes > 59) {
          clearInterval(this.timerId);
          return {
            minutes: 0,
            seconds: 0,
          };
        }

        return { seconds: prevState.seconds + 1 };
      });
    }, 1000);
  };

  dicrementTimer = () => {
    // таймер на убывание
    this.timerId = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.minutes === 0 && prevState.seconds === 0) {
          clearInterval(this.timerId);
          return {
            minutes: 0,
            seconds: 0,
          };
        }
        if (prevState.seconds === 0) {
          return {
            minutes: prevState.minutes - 1,
            seconds: 59,
          };
        }

        return { seconds: prevState.seconds - 1 };
      });
    }, 1000);
  };

  startTimer = (minutes, seconds) => {
    if (minutes === 0 && seconds === 0) {
      this.incrimentTimer();
    } else if (minutes > 0 || seconds > 0) {
      this.dicrementTimer();
    }
  };

  stopTimer = () => {
    clearInterval(this.timerId);
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.updateTask(this.state.label);
  };

  static defaultProps = {
    label: 'Task',
    onDeleted: () => {},
    onCheck: () => {},
    timer: 'now',
  };

  static propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    onCheck: PropTypes.func,
    updateTask: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    state: PropTypes.object.isRequired,
    openTheEditor: PropTypes.func.isRequired,
    timer: PropTypes.string,
  };

  // handleChange=(e) =>{
  //   let isChecked = e.target.checked;
  //   return isChecked;
  // }

  render() {
    const { label, onDeleted, onCheck, id, state, timer, openTheEditor } = this.props;

    const { tasks } = state;

    const idx = tasks.findIndex((elem) => elem.id === id);
    const che = tasks[idx].checked;

    return (
      <div>
        <input className="toggle" type="checkbox" checked={che} onChange={onCheck} />

        <label>
          <span className="description label">{label}</span>
          <span className="description">
            <button
              className="icon icon-play"
              onClick={() => this.startTimer(this.state.minutes, this.state.seconds)}
            ></button>
            <button className="icon icon-pause" onClick={() => this.stopTimer()}></button>
            <span>{this.state.minutes}</span>:<span>{this.state.seconds}</span>
          </span>
          <span className="created description">
            <Timer timer={timer} />
          </span>
        </label>
        <button className="icon icon-edit" onClick={openTheEditor} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
    );
  }
}
