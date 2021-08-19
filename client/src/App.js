import React, { useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [fileTitle, setFileTitle] = useState('');

	const instance = axios.create({
		baseURL: 'http://localhost:3400',
	});

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleChange = (event) => {
		setFileTitle(event.target.value);
	};

	React.useEffect(() => {
		fetch('http://localhost:3004/api')
			.then((response) => response.json())
			.then((data) => console.log(data));
	}, []);

	async function handleImageUpload(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', selectedFile);
		formData.append('title', fileTitle);
		try {
			const response = await axios.post(
				'http://localhost:3004/upload/',
				formData
			);
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code> src / App.js </code> and shit happens today
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'>
					Learn React
				</a>
			</header>
			<form onSubmit={handleImageUpload}>
				<div>
					<label htmlFor='Title'>Title</label>
					<input
						type='text'
						placeholder='title'
						value={fileTitle}
						onChange={handleChange}
					/>
				</div>
				<div>
					<input
						type='file'
						name='image'
						id='image'
						onChange={changeHandler}
					/>
				</div>
				<button>Submit</button>
			</form>
		</div>
	);
}

export default App;
