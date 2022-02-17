import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const CardB = ({ tasks, loading, toggle }) => {
    return (
        <div>
            <h1 className="text-3xl mb-4">Card B</h1>
            <div className="max-w-md p-4 border border-gray-300">
                {loading ?
                    <p className='mb-2 text-lg text-green-600'>Loading...</p>
                    :
                    <div className="mb-10">
                        <h2 className="text-2xl mb-3">Total Results: {tasks.length}</h2>
                        <Droppable droppableId="droppable-1">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {tasks.map((task, index) =>
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div className='mb-3'
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <div className="border border-gray-300 bg-white rounded p-2 px-2">
                                                        <div className="flex justify-between">
                                                            <div className="text-lg">= {task.calculate}</div>
                                                            <div className="text-lg">{task.title}</div>
                                                            <div><button className="rounded bg-gray-600 hover:bg-gray-500 text-white py-1 px-3">See Input</button></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                }
            </div>
        </div>
    );
};

export default CardB;