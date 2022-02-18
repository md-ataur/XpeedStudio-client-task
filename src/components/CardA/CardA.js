import axios from 'axios';
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const CardA = ({ tasks, loading, toggle, setToggle }) => {
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [calculate, setCalculate] = useState(null);
    const [message, setMessage] = useState('');

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

        if (selectedFile && selectedFile.type === "text/plain") {
            // Message set
            setMessage("Calculating, Please wait 15 seconds");

            // Attribute set
            document.getElementById('submit').disabled = true;

            // Wait for 15 seconds
            setTimeout(() => {
                calculation();
                setMessage('');
                document.getElementById('submit').disabled = false;
            }, 15000);

            // Calculation function
            const calculation = () => {
                let myData = {
                    title,
                    calculate
                }

                const data = new FormData();
                data.append('file', selectedFile);
                data.append('data', JSON.stringify(myData));

                axios({
                    method: 'post',
                    url: 'http://localhost:5000/data',
                    data: data,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    }
                })
                    .then(res => {
                        console.log(res.data);
                    });

                setToggle(!toggle);
            }

        } else {
            alert("File extension is not supported! Please upload the txt file");
        }

        // Fields clear
        document.getElementById("title").value = "";
        document.getElementById("formFile").value = "";
        setSelectedFile("");
    }

    return (
        <div>
            <h1 className="text-3xl mb-4">Card A</h1>
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
                                                            <div><button onClick={() => alert(`${task.filePath}`)} className="rounded bg-gray-600 hover:bg-gray-500 text-white py-1 px-3">See Input</button></div>
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
                    <form onSubmit={handleForm} action="" encType="multipart/form-data">
                        <div className="mb-3">
                            <input onBlur={(e) => setTitle(e.target.value)} type="text" id="title" className="w-96 border border-solid border-gray-300 px-2 py-1.5 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Calculation Title" required />
                        </div>
                        <div className="mb-4 w-96">
                            <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">Upload your text file</label>
                            <input onBlur={(e) => setSelectedFile(e.target.files[0])} type="file" id="formFile" className="w-full px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded" />
                        </div>
                        <p className="text-md text-green-600 mb-3">{message ? message : ''}</p>
                        <button id="submit" type="submit" className="py-1 px-3 rounded border border-gray-600">Calculate</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CardA;