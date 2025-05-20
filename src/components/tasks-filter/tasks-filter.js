/* eslint-disable func-names */
import { Component } from 'react';
// import './tasks-filter.css';

export default class TasksFilter extends Component {
  render() {
    const { Active, All, Completed, state, setStatusButton } = this.props;
    const { buttons } = state;
    const buttonsFilt = buttons.map((button) => {
      const { status } = button;
      let className = '';
      if (status === 'active') {
        className += ' selected';
      }

      let onClickV;

      if (button.label === 'All') {
        onClickV = All;
      } else if (button.label === 'Active') {
        onClickV = Active;
      } else {
        onClickV = Completed;
      }

      return (
        <li key={button.id}>
          <button
            id={button.id}
            className={className}
            onClick={function (event) {
              onClickV();
              setStatusButton(button.id);
            }}
          >
            {' '}
            {button.label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttonsFilt}</ul>;
  }
}
