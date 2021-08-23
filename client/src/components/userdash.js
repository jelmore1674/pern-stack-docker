import React, { useState } from 'react';
import axios from 'axios';

export default function UserDashboard({ user, handleSignOut, setUserData }) {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	async function handleImageUpload(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', selectedFile);
		try {
			const response = await axios.post(
				`http://localhost:3004/profile/${user.id}`,
				formData
			);
			setUserData(response.data);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<header className='App-header'>
			<div>
				<p onClick={handleSignOut}> Sign Out </p>{' '}
			</div>{' '}
			<div>
				<div> {user.name} </div> <div> {user.email} </div>{' '}
				<div className='image'>
					<img
						src={`http://localhost:3004/${user.imageurl}`}
						alt='test'
					/>
				</div>{' '}
			</div>{' '}
			<form onSubmit={handleImageUpload}>
				<div className='form-group'>
					<input
						type='file'
						name='image'
						id='image'
						onChange={changeHandler}
					/>{' '}
				</div>{' '}
				<button> Submit </button>{' '}
			</form>{' '}
		</header>
	);
}
