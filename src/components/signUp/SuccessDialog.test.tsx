import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { shallow, ShallowWrapper } from 'enzyme';
import StyledDialog from '../ui-components/StyledDialog';
import SuccessDialog from './SuccessDialog';

describe('SuccessDialog', () => {
	const setIsOpen = jest.fn();

	afterEach(() => {
		jest.clearAllMocks();
	});

	const createWrapper = (isOpen: boolean = true) => {
		return shallow(<SuccessDialog setIsOpen={setIsOpen} isOpen={isOpen} />);
	};

	const clickConfirmBtn = (wrapper: ShallowWrapper) => {
		wrapper.find(StyledDialog).dive().find(Button).simulate('click');
		wrapper.update();
	};

	it('only renders a button if the dialog is not open', () => {
		const wrapper = createWrapper(false);
		expect(wrapper.find(StyledDialog)).toHaveLength(1);
		expect(wrapper.find(StyledDialog).prop('isOpen')).toBeFalsy();
	});

	it('renders a dialog if clicking on sign up button', () => {
		const wrapper = createWrapper();
		expect(wrapper.find(StyledDialog)).toHaveLength(1);
		expect(wrapper.find(StyledDialog).prop('isOpen')).toBeTruthy();

		expect(wrapper.find(StyledDialog).dive().find(Typography)).toHaveLength(
			2
		);
		expect(wrapper.find(StyledDialog).dive().find(Button)).toHaveLength(1);
	});

	it('closes the dialog if clicking on confirm button', () => {
		const wrapper = createWrapper();
		expect(wrapper.find(StyledDialog)).toHaveLength(1);
		expect(wrapper.find(StyledDialog).prop('isOpen')).toBeTruthy();

		clickConfirmBtn(wrapper);

		expect(setIsOpen).toHaveBeenCalledTimes(1);
		expect(setIsOpen).toHaveBeenCalledWith(false);
	});
});
