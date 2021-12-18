import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import SignUpDialog from '../signUp/SignUpDialog';
import SuccessDialog from '../signUp/SuccessDialog';

const LandingPageContent = () => {
	const [isSuccessDialogOpen, setIsSuccessDialogOpen] =
		React.useState<boolean>(false);
	return (
		<Grid
			container
			direction="row"
			alignContent="center"
			alignItems="center"
			justifyContent="center"
			spacing={2}
			style={{ textAlign: 'center' }}
		>
			<Grid item xs={12}>
				<Typography variant="h2">
					{'A better way to enjoy every day.'}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h5" color="textSecondary">
					{'Change your life from today'}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<SignUpDialog setIsSuccessDialogOpen={setIsSuccessDialogOpen} />
				{isSuccessDialogOpen && (
					<SuccessDialog
						isOpen={isSuccessDialogOpen}
						setIsOpen={setIsSuccessDialogOpen}
					/>
				)}
			</Grid>
		</Grid>
	);
};

export default LandingPageContent;
