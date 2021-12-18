import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import Copyright from './Copyright';

const useStyles = makeStyles((theme: Theme) => ({
	footer: {
		background: theme.palette.grey[200],
		height: '100%',
		textAlign: 'center',
		paddingTop: theme.spacing(2)
	}
}));
const StickyFooter = () => {
	const classes = useStyles();
	return (
		<Box component="footer" className={classes.footer}>
			<Typography variant="body1">{'Broccoli & Co'}</Typography>
			<Copyright />
		</Box>
	);
};

export default StickyFooter;
