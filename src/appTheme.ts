import { createTheme } from '@material-ui/core/styles';

const TEXT_COLOR = '#4A4A4A';
const PAPER_COLOR = '#FFFFFF';

const appTheme = createTheme({
	palette: {
		primary: {
			main: '#00A5A8'
		},
		secondary: {
			main: '#A8117B'
		},
		background: {
			paper: PAPER_COLOR,
			default: '#F7F8FC'
		},
		text: {
			primary: TEXT_COLOR,
			secondary: TEXT_COLOR
		}
	}
});

export default appTheme;
