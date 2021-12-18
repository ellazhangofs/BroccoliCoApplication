import { validationError } from './validationError';
import { ValidLength } from './ValidLength';

describe('ValidLength', () => {
	it.each([
		['long text', true],
		[undefined, true],
		['12345', true],
		['123', false]
	])(
		'when value is %s returns %s',
		(value: string | undefined, expected: boolean) => {
			const minLength = 5;
			const validLength = new ValidLength({ minLength });
			expect(validLength.isValid(value)).toEqual(expected);
			expect(validLength.error).toEqual(validationError.minLength);
		}
	);

	it.each([
		['when value is valid', '12345', undefined],
		['when value is invalid', '122', validationError.minLength]
	])(
		'returns correct i18n code %s',
		(
			_description: string,
			value: string | undefined,
			expected: string | undefined
		) => {
			const validLength = new ValidLength({ minLength: 5 });
			expect(validLength.getError(value)).toEqual(expected);
		}
	);
});
