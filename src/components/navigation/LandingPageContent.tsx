import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const LandingPageContent = () => {
	return (
		<Grid
			container
			direction="row"
			alignContent="center"
			alignItems="center"
			justifyContent="center"
		>
			<Grid item xs={12} md={6}>
				<Typography variant="h2">
					{'A better way to enjoy every day.'}
				</Typography>
				<Typography variant="h5" color="textSecondary">
					{'Change your life from today'}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default LandingPageContent;
