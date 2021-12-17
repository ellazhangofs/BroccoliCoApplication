import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary">
			{'Copyright © '}
			<Link color="inherit" href="https://localhost:3001/">
				{'Broccoli & CO'}
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	footer: {
		background: theme.palette.grey[200],
		height: '100%'
	}
}));
const StickyFooter = () => {
	const classes = useStyles();
	return (
		<Box component="footer" className={classes.footer}>
			<Container maxWidth="sm">
				<Typography variant="body1">{'Broccoli & Co'}</Typography>
				<Copyright />
			</Container>
		</Box>
	);
};

export default StickyFooter;
