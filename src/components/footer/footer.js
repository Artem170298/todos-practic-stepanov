import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './footer.css';

import TasksFilter from '../tasks-filter';

export default class Footer extends Component {
  static defaultProps = {
    notCompleted: true,
  };

  static propTypes = {
    // проверка типа prop с помощью функции написанной вручную
    //   notCompleted: (props, propName, componentName) =>{
    //     const value = props[propName];

    //     if (typeof value === 'number' && !isNaN(value)) {
    //       return null;
    //     }

    //     return new TypeError(`${componentName}: must be number!`)
    //   }
    notCompleted: PropTypes.number,
  };

  render() {
    const { notCompleted, Active, Completed, All, state, setStatusButton, deleteCompleted } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{notCompleted} items left</span>
        <TasksFilter
          Active={() => Active()}
          Completed={() => Completed()}
          All={() => All()}
          state={state}
          setStatusButton={(id) => setStatusButton(id)}
        />
        <button className="clear-completed" onClick={deleteCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
