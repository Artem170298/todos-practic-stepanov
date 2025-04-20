import React, { Component } from 'react';

import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';

import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    tasks: [
      {
        label: 'Completed task',
        checked: true,
        id: 1,
        timer: 1420247100000,
        edit: false,
      },
      {
        label: 'Completed task',
        checked: false,
        id: 2,
        timer: 1420247100000,
        edit: false,
      },
      {
        label: 'Completed task',
        checked: false,
        id: 3,
        timer: 1420247100000,
        edit: false,
      },
    ],

    filtValue: 'All',

    buttons: [
      { label: 'All', id: '1', status: 'active' },
      { label: 'Active', id: '2', status: 'passive' },
      { label: 'Completed', id: '3', status: 'passive' },
    ],
  };

  setStatusButton = (id) => {
    // установка статуса активная для кнопки
    const buttons = [...this.state.buttons];
    const newButtons = buttons.map((el) => {
      return {
        label: el.label,
        id: el.id,
        status: 'passive',
      };
    });

    const idx = newButtons.findIndex((elem) => {
      return elem.id === id;
    });

    newButtons[idx].status = 'active';

    this.setState({
      buttons: newButtons,
    });
  };

  deleteAllCompletedTasks = () => {
    // удаление всех выполненых задач
    this.setState(({ tasks }) => {
      const ActTasks = tasks.filter((el) => !el.checked);

      return {
        tasks: ActTasks,
      };
    });
  };

  deleteItem = (id) => {
    // удаление задачи
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((elem) => {
        return elem.id === id;
      });
      const before = tasks.slice(0, idx);
      const after = tasks.slice(idx + 1);

      const newArray = [...before, ...after];

      return {
        tasks: newArray,
      };
    });
  };

  openTheEditor = (id) => {
    // открытие редактора задачи
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((elem) => {
        return elem.id === id;
      });
      const newTasks = [...tasks];
      newTasks[idx].edit = true;

      return {
        tasks: newTasks,
      };
    });
  };

  handleCheckboxChange = (id) => {
    // установка чека на отмеченной задачи
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((elem) => elem.id === id);
      const oldTask = tasks[idx];
      const newTask = { ...oldTask, checked: !oldTask.checked };

      const newArray = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];

      return {
        tasks: newArray,
      };
    });
  };

  addTask = (text) => {
    // создание новой задачи
    const timeCreate = new Date();
    const time = timeCreate.getTime();

    const newTask = {
      label: text,
      checked: false,
      id: this.maxId++,
      timer: time,
    };

    this.setState(({ tasks }) => {
      const newArray = [...tasks, newTask];
      return {
        tasks: newArray,
      };
    });
  };

  updateTask = (id, label) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((elem) => {
        return elem.id === id;
      });

      const newArray = [...tasks];

      newArray[idx].label = label;
      newArray[idx].edit = false;

      return {
        tasks: newArray,
      };
    });
  };

  setActiveStatus = () => {
    this.setState({
      filtValue: 'Active',
    });
  };

  setCompletedStatus = () => {
    this.setState({
      filtValue: 'Completed',
    });
  };

  setAllStatus = () => {
    this.setState({
      filtValue: 'All',
    });
  };

  render() {
    const notCompleted = this.state.tasks.filter((el) => !el.checked).length;
    return (
      <section className="todoapp">
        <NewTaskForm onTaskAdded={this.addTask} />
        <section className="main">
          <TaskList
            tasks={this.state.tasks}
            onDeleted={(id) => this.deleteItem(id)}
            onCheck={(id) => this.handleCheckboxChange(id)}
            state={this.state}
            openTheEditor={(id) => this.openTheEditor(id)}
            updateTask={(id, label) => this.updateTask(id, label)}
          />

          <Footer
            notCompleted={notCompleted}
            Active={() => this.setActiveStatus()}
            Completed={() => this.setCompletedStatus()}
            All={() => this.setAllStatus()}
            setStatusButton={(id) => this.setStatusButton(id)}
            state={this.state}
            deleteCompleted={() => this.deleteAllCompletedTasks()}
          />
        </section>
      </section>
    );
  }
}
