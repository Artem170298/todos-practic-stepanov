import React, { useState } from 'react';
import './task-updata.css';

function TaskUpdata({ label, updateTask }) {
  const [prevLabel, setPrevLabel] = useState('');
  const [labels, setLabel] = useState(label);

  function onSubmit(e) {
    e.preventDefault();
    const labelss = prevLabel.trim();
    setLabel(labelss);
    updateTask(labels);
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" defaultValue={labels} onChange={(e) => setPrevLabel(e.target.value)} />
    </form>
  );
}

export default TaskUpdata;
