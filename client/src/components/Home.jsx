import React, { useState } from 'react';
import { FaFileWord } from 'react-icons/fa';
import axios from 'axios';

const Home = () => {

    const [name, setName] = useState("Choose File");
    const [file, setFile] = useState(null);
    const [convert, setConvert] = useState(null);
    const [downloadError, setDownloadError] = useState(null);

    const handleFileChange = (event) => {
        setName(event.target.files[0].name);
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (name === "Choose File") {
            console.log("Please choose a file");
            setConvert("Please choose a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:3000/convert-file", formData, {
                responseType: "blob",
            });
            console.log("The response is: "+response);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            console.log(url);
            link.setAttribute("download", name.replace(/\.[^/.]+$/, "") + ".pdf");
            document.body.appendChild(link);
            link.click();
            console.log(link);
            link.parentNode.removeChild(link);
            console.log(link);
            setName("Choose File");
            setConvert("File Converted Successfully");
        } catch (error) {
            console.log(error);
            // setDownloadError("Something went wrong");
            setDownloadError("Something Went Wrong!!! ");
            setConvert(null);
        }
    }

    return (
        <section className='container mx-auto p-5'>
            <div className='grid place-content-center'>

                <div className='border-2 border-dashed mt-20 border-neutral-700 rounded-lg p-5 pb-10'>
                    <div>
                        <h1 className='text-3xl text-center my-10'>Convert Word To Pdf Online</h1>
                        <p className='text-sm mb-5 text-center'>Easily convert word documents to PDF format online, without having to install any software.</p>
                    </div>

                    <div className='flex flex-col items-center gap-y-5 mt-10'>
                        <input onChange={handleFileChange} type="file" name="" id="FileInput" accept='.doc, .docx' hidden />
                        <label htmlFor="FileInput" className='w-full flex items-center justify-center gap-x-2 px-4 py-6 rounded-lg hover:drop-shadow-xl transition-all duration-200 hover:shadow-xl hover:shadow-indigo-600 bg-indigo-500 text-white cursor-pointer'>
                            <FaFileWord className='w-6 h-6' />
                            <span className='pt-1'>{name}</span>
                        </label>
                        <button
                            disabled={name === "Choose File" ? true : false}
                            onClick={handleSubmit}
                            className='disabled:bg-neutral-800 disabled:cursor-default disabled:text-neutral-400 disabled:shadow-none disabled:drop-shadow-none px-4 py-6 w-full bg-teal-500 rounded-lg hover:drop-shadow-lg transition-all duration-200 hover:shadow-lg hover:shadow-teal-500 text-white cursor-pointer'>Convert File</button>

                        {convert && (
                            <span className='text-green-500 text-sm'>{convert}</span>
                        )}

                        {downloadError && (
                            <span className='text-red-500 text-sm'>{downloadError}</span>
                        )}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Home;