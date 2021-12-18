import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import React from 'react';

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles((theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
		boxShadow: `0 ${theme.spacing(0.25)}px ${theme.spacing(
			1
		)}px 0 rgba(0, 0, 0, 0.2)`,
		paddingLeft: theme.spacing(2)
	}
}));

const NavBar = () => {
	const classes = useStyles();

	const isScrolled = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0
	});

	return (
		<AppBar
			position="sticky"
			elevation={isScrolled ? 4 : 0}
			className={classes.appBar}
		>
			<Toolbar disableGutters>
				<Typography variant="h6">{'Broccoli & Co'}</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
