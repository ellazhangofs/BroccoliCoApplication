import { validationError } from './validationError';
import { ValidationRule } from './ValidationRule';

class TestValidationRule extends ValidationRule {
	public isValid(value: string | undefined): boolean {
		return super.isFilled(value);
	}
	constructor({ ...passThrough }: Partial<TestValidationRule> = {}) {
		super({ ...passThrough });
	}
}

const error = validationError.isRequiredField;

describe('ValidationRule', () => {
	it.each([
		['', false],
		[undefined, false],
		['some string', true]
	])(
		'when value is %s and isFilled returns %s',
		(value: string | undefined, expected: boolean) => {
			const validationRule = new TestValidationRule({ error });
			expect(validationRule.isFilled(value)).toEqual(expected);
		}
	);

	it.each([
		['when value is valid', 'something valid', undefined],
		['when value has not been filled', undefined, error]
	])(
		'returns correct i18n code %s',
		(
			_description: string,
			value: string | undefined,
			expected: string | undefined
		) => {
			const validationRule = new TestValidationRule({ error });
			expect(validationRule.getError(value)).toEqual(expected);
		}
	);

	it('returns correct i18n code %s with no value', () => {
		const validationRule = new TestValidationRule({ error });
		expect(validationRule.getError(undefined)).toEqual(error);
	});
});
