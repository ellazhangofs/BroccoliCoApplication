import { TextField } from '@material-ui/core';
import { styled, withTheme } from '@material-ui/core/styles';

const StyledTextField = styled(withTheme(TextField))((props: any) => ({
	'width': '100%',
	'marginTop': props.theme.spacing(3),
	'marginBottom': props.theme.spacing(3),
	'& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
		{
			display: 'none'
		}
}));

export default StyledTextField;
