import { validationError } from './validationError';
import { ValidEmailFormat } from './ValidEmailFormat';

describe('ValidEmailFormat', () => {
	const validEmail = 'newUser@gmail.com';

	it.each([
		['i am not an email string', false],
		['', true],
		[undefined, true],
		[validEmail, true]
	])(
		'when value is %s isValid returns %s',
		(value: string | undefined, expected: boolean) => {
			const validEmailFormat = new ValidEmailFormat();
			expect(validEmailFormat.isValid(value)).toEqual(expected);
		}
	);

	it.each([
		['i am not an email string', validationError.invalidEmail],
		[validEmail, undefined]
	])(
		'when value is %s getI18nString returns %s',
		(value: string | undefined, expected: string | undefined) => {
			const validEmailFormat = new ValidEmailFormat();
			expect(validEmailFormat.getError(value)).toEqual(expected);
		}
	);

	it('has constructor defaults', () => {
		const data: Partial<ValidEmailFormat> = {
			error: validationError.invalidEmail
		};
		expect(new ValidEmailFormat()).toEqual(data);
	});
});
