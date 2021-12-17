import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import React from 'react';

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles((theme) => ({
	logo: {
		fontSize: '3rem',
		marginRight: theme.spacing(2)
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
		boxShadow: `0 ${theme.spacing(0.25)}px ${theme.spacing(
			1
		)}px 0 rgba(0, 0, 0, 0.2)`
	},
	appBarGridItem: {
		margin: 'auto',
		display: 'flex'
	},
	menuIconButton: {
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	navMenuContainer: {
		display: 'flex',
		justifyContent: 'flex-end'
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
				<Typography variant="h6">Scroll to Elevate App Bar</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
