import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import CardA from './components/CardA/CardA';
import CardB from './components/CardB/CardB';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true);

  // Data fetch
  useEffect(() => {
    setLoading(true);
    fetch('https://warm-lowlands-13918.herokuapp.com/data')
      .then(res => res.json())
      .then(data => setTasks(data))
      .finally(() => {
        setLoading(false)
      })
  }, [toggle]);

  // Handler onDragEnd
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
    <div className="max-w-screen-lg mx-auto mt-20 grid grid-cols-2">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <CardA tasks={tasks} loading={loading} toggle={toggle} setToggle={setToggle}></CardA>
        <CardB tasks={tasks} loading={loading} toggle={toggle}></CardB>
      </DragDropContext>
    </div>
  );
}

export default App;
