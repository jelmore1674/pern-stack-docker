import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	React.useEffect(() => {
		fetch('http://localhost:3004/api')
			.then((response) => response.json())
			.then((data) => console.log(data));
	}, []);
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
		</div>
	);
}

export default App;
