import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TextForm = () => {
  const baseURL = 'http://localhost:3000/text';
  const [paragraphs, setParagraphs] = useState([]);
  const [newParagraph, setNewParagraph] = useState('');
  const [selectedProcess, setSelectedProcess] = useState({});
  const [processResults, setProcessResults] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchParagraphs();
  }, []);

  const fetchParagraphs = async () => {
    try {
      const response = await axios.get(baseURL);
      setParagraphs(response.data);
    } catch (error) {
      setError('Error fetching paragraphs');
    }
  };

  const createParagraph = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseURL, {
        content: newParagraph,
      });
      setParagraphs([response.data, ...paragraphs]);
      setNewParagraph('');
      setError('');
    } catch (error) {
      setError('Error creating paragraph');
    }
  };

  const selectProcess = async (id) => {
    try {
      let response;
      switch (selectedProcess[id]) {
        case 'words':
          response = await axios.get(`${baseURL}/${id}/words`);
          break;
        case 'characters':
          response = await axios.get(`${baseURL}/${id}/characters`);
          break;
        case 'sentences':
          response = await axios.get(`${baseURL}/${id}/sentences`);
          break;
        case 'paragraphs':
          response = await axios.get(`${baseURL}/${id}/paragraphs`);
          break;
        case 'longest-word':
          response = await axios.get(`${baseURL}/${id}/longest-word`);
          break;
        default:
          response = { data: null };
      }
      setProcessResults({
        ...processResults,
        [id]: {
          label: selectedProcess[id],
          res: response.data.count
            ? response.data.count
            : response.data.longestWord,
        },
      });
      setError('');
    } catch (error) {
      setError('Error analyzing paragraph');
    }
  };

  const handleDropdownChange = (id, value) => {
    setSelectedProcess({
      ...selectedProcess,
      [id]: value,
    });
  };

  return (
    <div className=" mx-auto my-10 p-5 border rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Paragraph Processor</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={createParagraph}>
        <textarea
          value={newParagraph}
          onChange={(e) => setNewParagraph(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your paragraph here..."
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Paragraph
        </button>
      </form>
      <div className="mt-6">
        {paragraphs.map((paragraph) => (
          <div
            key={paragraph._id}
            className="mb-4 p-4 border rounded shadow-sm"
          >
            <p className="mb-2">{paragraph.content}</p>
            <select
              value={selectedProcess[paragraph._id] || ''}
              onChange={(e) =>
                handleDropdownChange(paragraph._id, e.target.value)
              }
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Process Type</option>
              <option value="words">Get Word Count</option>
              <option value="characters">Get Character Count</option>
              <option value="sentences">Get Sentence Count</option>
              <option value="paragraphs">Get Paragraph Count</option>
              <option value="longest-word">Get Longest Word</option>
            </select>
            <button
              onClick={() => selectProcess(paragraph._id)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Process
            </button>
            {processResults[paragraph._id] && (
              <div className="mt-2">
                <h2 className="text-xl font-bold mb-2">Process Result:</h2>
                <span className="font-bold">
                  {processResults[paragraph._id].label}:{' '}
                  {processResults[paragraph._id].res}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextForm;
