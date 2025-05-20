import React, { useState, useEffect } from 'react';
import './task-update.css';

function TaskUpdate({ label, updateTask }) {
  const [inputValue, setInputValue] = useState(label.trim());

  useEffect(() => {
    // Обновляем состояние при изменении пропа label
    setInputValue(label.trim());
  }, [label]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();

    if (trimmedValue) {
      updateTask(trimmedValue);
    } else {
      setInputValue(label.trim()); // Возвращаем исходное значение, если ввод пустой
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="edit" defaultValue={inputValue} onChange={handleChange} />
    </form>
  );
}

export default TaskUpdate;
