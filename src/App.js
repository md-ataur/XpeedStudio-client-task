import logo from './logo.svg';
import './App.css';
import Card from './components/Card/Card';
import { DragDropContext } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/data')
      .then(res => res.json())
      .then(data => setTasks(data))
      .finally(() => {
        setLoading(false)
      })
  }, [toggle]);

  function handleOnDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Card tasks={tasks} loading={loading} toggle={toggle} setToggle={setToggle}></Card>
      </DragDropContext>
    </div>
  );
}

export default App;
