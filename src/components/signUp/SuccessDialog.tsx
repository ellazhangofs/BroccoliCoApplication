import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import StyledDialog from '../ui-components/StyledDialog';

interface Props {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
	content: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4)
	}
}));

const SuccessDialog = ({ setIsOpen, isOpen }: Props) => {
	const classes = useStyles();

	const onCloseClick = () => {
		setIsOpen(false);
	};

	const content = (
		<>
			<Grid container justifyContent="center" className={classes.content}>
				<Grid item xs={12}>
					<Typography>
						{
							'Congratulations! Your invitation has been requested successfully!'
						}
					</Typography>
				</Grid>
			</Grid>
		</>
	);

	const action = (
		<Grid container alignItems="center" justifyContent="center" spacing={1}>
			<Grid item xs={12}>
				<Button
					onClick={onCloseClick}
					variant="outlined"
					color="primary"
					fullWidth
				>
					Ok
				</Button>
			</Grid>
		</Grid>
	);

	return (
		<>
			<StyledDialog
				onClose={onCloseClick}
				isOpen={isOpen}
				title={'All done!'}
				content={content}
				action={action}
			/>
		</>
	);
};

export default SuccessDialog;
