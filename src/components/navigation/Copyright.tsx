import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

const Copyright = () => {
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
};

export default Copyright;
