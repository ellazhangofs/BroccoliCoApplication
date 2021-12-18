import { validationError } from './validationError';
import { ValidationState } from './ValidationState';

describe('ValidationState', () => {
	it('has constructor defaults', () => {
		const expected: ValidationState = {
			hasChanged: false,
			hasError: false,
			isValidField: false,
			isRequiredFilled: false,
			error: ''
		};
		expect(new ValidationState()).toEqual(expected);
	});

	it.each([
		{ hasChanged: true },
		{ hasError: true },
		{ isValidField: true },
		{ isRequiredFilled: true },
		{ error: validationError.isRequiredField }
	])(
		'constructor passes explicit %s value',
		(data: Partial<ValidationState>) => {
			expect(new ValidationState(data)).toEqual(
				expect.objectContaining(data)
			);
		}
	);
});
