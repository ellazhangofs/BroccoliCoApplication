import { IsRequired } from './IsRequired';
import { validationError } from './validationError';

describe('IsRequired', () => {
	const isRequired = new IsRequired();

	it.each([
		['i am a string', true],
		['', false],
		[undefined, false],
		['     ', false]
	])(
		'when value is %s isValid returns %s',
		(value: string | undefined, expected: boolean) => {
			const isRequired = new IsRequired();
			expect(isRequired.isValid(value)).toEqual(expected);
		}
	);

	it.each([
		[undefined, validationError.isRequiredField],
		[
			'required wants to be returned as helper text',
			validationError.isRequiredField
		]
	])(
		'when value is %s getI18nString returns %s',
		(value: string | undefined, expected: string | undefined) => {
			expect(isRequired.getError(value)).toEqual(expected);
		}
	);

	it('has constructor defaults', () => {
		const data: Partial<IsRequired> = {
			error: validationError.isRequiredField
		};
		expect(new IsRequired()).toEqual(data);
	});
});
