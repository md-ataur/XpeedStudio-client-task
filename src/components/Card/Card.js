import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Card = ({ tasks, loading, toggle, setToggle }) => {
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [calculate, setCalculate] = useState(null);

    // File read
    if (selectedFile) {
        selectedFile.text()
            .then((digits) => {
                setCalculate(eval(digits));
            })
    }

    // Form handler
    const handleForm = (e) => {
        e.preventDefault();

        // File check
        if (selectedFile && selectedFile.type === "text/plain") {
            let myData = {
                title,
                calculate
            }

            fetch('http://localhost:5000/data', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(myData)
            })
                .then((res) => {
                    console.log('Data successfully Inserted');
                })

            setToggle(!toggle);

        } else {
            alert("File extension is not supported! Please upload the txt file");
        }

        // Field clear
        document.getElementById("title").value = "";
        document.getElementById("formFile").value = "";
    }

    return (
        <div className="max-w-screen-lg mx-auto mt-20">
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
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <div className="border border-gray-300 bg-white rounded p-2 px-2 mb-3">
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
                <div>
                    <h2 className="text-2xl mb-3">Input</h2>
                    <form onSubmit={handleForm} action="">
                        <div className="mb-3">
                            <input onBlur={(e) => setTitle(e.target.value)} type="text" id="title" className="w-96 border border-solid border-gray-300 px-2 py-1.5 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Calculation Title" required />
                        </div>
                        <div className="mb-3 w-96">
                            <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">Upload your text file</label>
                            <input onBlur={(e) => setSelectedFile(e.target.files[0])} type="file" id="formFile" className="w-full px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded" />
                        </div>
                        <button type="submit" className="py-2 px-3 rounded border text-white bg-gray-600 hover:bg-gray-500">Calculate</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Card;