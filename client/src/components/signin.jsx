import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as ReactLink } from 'react-router-dom';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn({ setUserData, setIsLoggedIn }) {
	const classes = useStyles();
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPass, setLoginPass] = useState('');

	const saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	};

	async function handleLogin(event) {
		event.preventDefault();
		const response = await fetch('http://localhost:3004/login', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: loginEmail,
				password: loginPass,
			}),
		});
		const data = await response.json();
		if (data.success) {
			saveAuthTokenInSession(data.token);
			const response = await fetch(
				`http://localhost:3004/profile/${data.userId}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: data.token,
					},
				}
			);
			const user = await response.json();
			console.log(user);

			if (user.id && user.email) {
				setUserData(user);
				setIsLoggedIn(true);
			}
		}
	}

	const handleLoginData = (event) => {
		if (event.target.id === 'email') {
			setLoginEmail(event.target.value);
		} else if (event.target.id === 'password') {
			setLoginPass(event.target.value);
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form
					className={classes.form}
					noValidate
					onSubmit={handleLogin}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
						value={loginEmail}
						onChange={handleLoginData}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						value={loginPass}
						onChange={handleLoginData}
					/>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<ReactLink to='/signup'>
								<Link variant='body2'>
									{"Don't have an account? Sign Up"}
								</Link>
							</ReactLink>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
