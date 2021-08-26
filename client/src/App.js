import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import { handleToken } from './utils/handleToken/handleToken';
import SignIn from './components/signin';
import SignUp from './components/SignUp/signup';
import './App.css';

function App() {
	const [user, setUserData] = useState('');

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = window.sessionStorage.getItem('token');

		if (token) {
			const loadUser = async () => {
				const user = await handleToken(token);
				setUserData(user);
				setIsLoggedIn(true);
				console.log(user);
			};
			loadUser();

			<Redirect to='/userData' />;
		}
	}, []);

	const handleSignOut = () => {
		window.sessionStorage.removeItem('token');
		setIsLoggedIn(false);
		setUserData('');
	};

	return (
		<Router className='App'>
			<Switch>
				<Route path='/login'>
					{' '}
					{!isLoggedIn ? (
						<SignIn
							setUserData={setUserData}
							setIsLoggedIn={setIsLoggedIn}
						/>
					) : (
						<Redirect to='/userDash' />
					)}{' '}
				</Route>{' '}
				<Route exact path='/userDash'>
					{' '}
					{isLoggedIn ? (
						<Dashboard
							user={user}
							setUserData={setUserData}
							handleSignOut={handleSignOut}
						/>
					) : (
						<Redirect to='/login' />
					)}{' '}
				</Route>{' '}
				<Route path='/signup'>
					<SignUp />
				</Route>{' '}
				<Route path='/'>
					{' '}
					{!isLoggedIn ? (
						<Redirect to='/login' />
					) : (
						<Redirect to='/userData' />
					)}{' '}
				</Route>{' '}
			</Switch>{' '}
		</Router>
	);
}

export default App;
