import React, { Component } from 'react';
import Task from '../task';
import './task-list.css';

export default class TaskList extends Component {
  // eslint-disable-next-line consistent-return, class-methods-use-this
  filteredTasks = (filtState, arr) => {
    // отфильтрованый массив задач для отображения
    if (filtState === 'Active') {
      const newArray = arr.filter((el) => !el.checked);
      return newArray;
    }
    if (filtState === 'Completed') {
      const newArray = arr.filter((el) => el.checked);

      return newArray;
    }
    if (filtState === 'All') {
      const newArray = [...arr];
      return newArray;
    }
  };

  render() {
    const { tasks, onDeleted, onCheck, state, openTheEditor, updateTask } = this.props;

    const { filtValue } = state;

    const filTasks = this.filteredTasks(filtValue, tasks);

    const tasklist = filTasks.map((task) => {
      const { checked, edit } = task;
      let className = '';
      if (checked) {
        className += ' completed';
      } else if (edit) {
        className += ' editing';
      }

      return (
        <li key={task.id} className={className}>
          <Task
            label={task.label}
            id={task.id}
            onDeleted={() => onDeleted(task.id)}
            onCheck={() => onCheck(task.id)}
            state={state}
            timer={task.timer}
            openTheEditor={() => openTheEditor(task.id)}
            updateTask={(label) => updateTask(task.id, label)}
          />
        </li>
      );
    });

    return <ul className="todo-list">{tasklist}</ul>;
  }
}
