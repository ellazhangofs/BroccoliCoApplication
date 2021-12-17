import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		closeButton: {
			position: 'absolute',
			right: theme.spacing(1),
			top: theme.spacing(1),
			color: theme.palette.grey[500]
		}
	})
);

interface Props {
	onClick: () => void;
}

const StyledCloseButton = ({ onClick }: Props) => {
	const classes = useStyles();
	return (
		<IconButton
			aria-label="close"
			className={classes.closeButton}
			onClick={onClick}
		>
			<CloseIcon />
		</IconButton>
	);
};

export default StyledCloseButton;
