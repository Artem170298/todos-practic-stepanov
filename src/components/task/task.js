import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from '../timer';
import './task.css';

export default class Task extends Component {
  state = {
    label: '',
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
          <span className="description">{label}</span>
          <span className="created">
            <Timer timer={timer} />
          </span>
        </label>
        <button className="icon icon-edit" onClick={openTheEditor} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
    );
  }
}
