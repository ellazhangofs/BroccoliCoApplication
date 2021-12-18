import { IsSameValue } from './IsSameValue';
import { validationError } from './validationError';

describe('IsSameValue', () => {
	it.each([
		['i am a string', true],
		['i am not a string', false],
		[undefined, true],
		['     ', true]
	])(
		'when value is %s isValid returns %s',
		(value: string | undefined, expected: boolean) => {
			const isSameValue = new IsSameValue({
				comparedValue: 'i am a string'
			});
			expect(isSameValue.isValid(value)).toEqual(expected);
		}
	);

	it('has constructor defaults', () => {
		const data: Partial<IsSameValue> = {
			error: validationError.isNotMatch,
			comparedValue: ''
		};
		expect(new IsSameValue()).toEqual(data);
	});
});
