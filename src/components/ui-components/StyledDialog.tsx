import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import StyledCloseButton from './StyledCloseButton';

type Props = {
	isOpen: boolean;
	title: string;
	titleColor?:
		| 'initial'
		| 'inherit'
		| 'primary'
		| 'secondary'
		| 'textPrimary'
		| 'textSecondary'
		| 'error';
	content: JSX.Element;
	action?: JSX.Element;
	onClose: () => void;
};

const useStyles = makeStyles((theme) =>
	createStyles({
		styledDialogPaper: {
			maxHeight: '90vh',
			padding: theme.spacing(2)
		},
		styledDialogTitle: {
			alignItems: 'center',
			display: 'flex'
		},
		styledDialogActions: {
			paddingRight: theme.spacing(3),
			paddingLeft: theme.spacing(3),
			textAlign: 'center',
			display: 'flex'
		}
	})
);

export const StyledDialog = ({
	isOpen,
	onClose,
	title,
	titleColor,
	content,
	action
}: Props) => {
	const classes = useStyles();

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			scroll="paper"
			maxWidth="sm"
			fullWidth={true}
			classes={{ paper: classes.styledDialogPaper }}
		>
			<DialogTitle
				disableTypography
				className={classes.styledDialogTitle}
			>
				<Typography color={titleColor} variant="h4">
					{title}
				</Typography>
				<StyledCloseButton onClick={onClose} />
			</DialogTitle>
			<DialogContent>{content}</DialogContent>
			{action && (
				<DialogActions className={classes.styledDialogActions}>
					{action}
				</DialogActions>
			)}
		</Dialog>
	);
};

export default StyledDialog;
