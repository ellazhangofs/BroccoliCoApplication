import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { shallow, ShallowWrapper } from 'enzyme';
import { signUp } from '../api/signUp';
import StyledDialog from '../ui-components/StyledDialog';
import StyledDialogButton from '../ui-components/StyledDialogButton';
import StyledTextField from '../ui-components/StyledTextField';
import { validationError } from '../validation/validationError';
import SignUpDialog from './SignUpDialog';

jest.mock('../api/signUp');

describe('SignUpDialog', () => {
	const setIsSuccessDialogOpen = jest.fn();

	afterEach(() => {
		jest.clearAllMocks();
	});

	const createWrapper = () => {
		return shallow(
			<SignUpDialog setIsSuccessDialogOpen={setIsSuccessDialogOpen} />
		);
	};

	const clickDialogBtn = (wrapper: ShallowWrapper) => {
		wrapper.find(StyledDialogButton).simulate('click');
		wrapper.update();
	};

	const getNameField = (wrapper: ShallowWrapper) => {
		return wrapper.find(StyledDialog).dive().find(StyledTextField).at(0);
	};

	const getEmailField = (wrapper: ShallowWrapper) => {
		return wrapper.find(StyledDialog).dive().find(StyledTextField).at(1);
	};

	const getConfirmEmailField = (wrapper: ShallowWrapper) => {
		return wrapper.find(StyledDialog).dive().find(StyledTextField).at(2);
	};

	const clickConfirmBtn = async (wrapper: ShallowWrapper) => {
		await wrapper.find(StyledDialog).dive().find(Button).simulate('click');
		wrapper.update();
	};

	const simulateTextFieldChange = (
		wrapper: ShallowWrapper,
		index: number,
		value: string
	) => {
		wrapper
			.find(StyledDialog)
			.dive()
			.find(StyledTextField)
			.at(index)
			.prop('onChange')({ target: { value } });
		wrapper.update();
	};

	it('only renders a button if the dialog is not open', () => {
		const wrapper = createWrapper();
		expect(wrapper.find(StyledDialogButton)).toHaveLength(1);
		expect(wrapper.find(StyledDialog)).toHaveLength(0);
	});

	it('renders a dialog if clicking on sign up button', () => {
		const wrapper = createWrapper();
		expect(wrapper.find(StyledDialogButton)).toHaveLength(1);
		expect(wrapper.find(StyledDialog)).toHaveLength(0);

		clickDialogBtn(wrapper);
		expect(wrapper.find(StyledDialog)).toHaveLength(1);
		expect(
			wrapper.find(StyledDialog).dive().find(StyledTextField)
		).toHaveLength(3);
		expect(wrapper.find(StyledDialog).dive().find(Button)).toHaveLength(1);
	});

	it('displays validation error message if full name is not longer than 3 characters', () => {
		const wrapper = createWrapper();
		const value = '12';
		clickDialogBtn(wrapper);

		expect(getNameField(wrapper).prop('error')).toBeFalsy();
		simulateTextFieldChange(wrapper, 0, value);

		expect(getNameField(wrapper).prop('value')).toEqual(value);
		expect(getNameField(wrapper).prop('error')).toBeTruthy();
		expect(getNameField(wrapper).prop('helperText')).toEqual(
			validationError.minLength
		);
		expect(
			wrapper.find(StyledDialog).dive().find(Button).prop('disabled')
		).toBeTruthy();
	});

	it('displays validation error message if invalid email address', () => {
		const wrapper = createWrapper();
		const value = 'fakeEmail';
		clickDialogBtn(wrapper);

		expect(getEmailField(wrapper).prop('error')).toBeFalsy();
		simulateTextFieldChange(wrapper, 1, value);

		expect(getEmailField(wrapper).prop('value')).toEqual(value);
		expect(getEmailField(wrapper).prop('error')).toBeTruthy();
		expect(getEmailField(wrapper).prop('helperText')).toEqual(
			validationError.invalidEmail
		);
		expect(
			wrapper.find(StyledDialog).dive().find(Button).prop('disabled')
		).toBeTruthy();
	});

	it('displays validation error message if confirm email not matches email', () => {
		const wrapper = createWrapper();
		const email = 'fakeEmail@gmail.com';
		const confirmEmail = 'fakeEmail2@gmail.com';

		clickDialogBtn(wrapper);

		expect(getConfirmEmailField(wrapper).prop('error')).toBeFalsy();
		simulateTextFieldChange(wrapper, 1, email);
		simulateTextFieldChange(wrapper, 2, confirmEmail);

		expect(getConfirmEmailField(wrapper).prop('value')).toEqual(
			confirmEmail
		);
		expect(getConfirmEmailField(wrapper).prop('error')).toBeTruthy();
		expect(getConfirmEmailField(wrapper).prop('helperText')).toEqual(
			validationError.isNotMatch
		);
		expect(
			wrapper.find(StyledDialog).dive().find(Button).prop('disabled')
		).toBeTruthy();
	});

	it('submits the sign up dialog successfully', async () => {
		(signUp as jest.Mock).mockResolvedValue('ok');

		const wrapper = createWrapper();
		const name = 'fakeUser';
		const email = 'fakeEmail@gmail.com';
		const confirmEmail = 'fakeEmail@gmail.com';

		clickDialogBtn(wrapper);
		simulateTextFieldChange(wrapper, 0, name);
		simulateTextFieldChange(wrapper, 1, email);
		simulateTextFieldChange(wrapper, 2, confirmEmail);

		expect(
			wrapper.find(StyledDialog).dive().find(Button).prop('disabled')
		).toBeFalsy();
		await clickConfirmBtn(wrapper);

		expect(signUp).toHaveBeenCalledTimes(1);
		expect(signUp).toHaveBeenCalledWith(name, email);
		expect(setIsSuccessDialogOpen).toHaveBeenCalledWith(true);
	});

	it('displays error if failing to sign up', async () => {
		const error = { message: 'invalid request' };
		(signUp as jest.Mock).mockRejectedValue(error);

		const wrapper = createWrapper();
		const name = 'fakeUser';
		const email = 'fakeEmail@gmail.com';
		const confirmEmail = 'fakeEmail@gmail.com';

		clickDialogBtn(wrapper);
		simulateTextFieldChange(wrapper, 0, name);
		simulateTextFieldChange(wrapper, 1, email);
		simulateTextFieldChange(wrapper, 2, confirmEmail);

		expect(
			wrapper.find(StyledDialog).dive().find(Button).prop('disabled')
		).toBeFalsy();
		await clickConfirmBtn(wrapper);

		expect(signUp).toHaveBeenCalledTimes(1);
		expect(signUp).toHaveBeenCalledWith(name, email);

		expect(wrapper.find(StyledDialog).dive().find(Typography)).toHaveLength(
			2
		);
		expect(
			wrapper.find(StyledDialog).dive().find(Typography).at(1).text()
		).toEqual(error.message);
	});
});
