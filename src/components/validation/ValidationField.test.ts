import { IsRequired } from './IsRequired';
import { validationError } from './validationError';
import { ValidationField } from './ValidationField';
import { ValidLength } from './ValidLength';

describe('ValidationField', () => {
	const validationFieldNoRules = new ValidationField({
		value: 'blah',
		originalValue: undefined
	});

	const validationFieldOneRuleFails = new ValidationField({
		value: 'i',
		originalValue: undefined,
		validationRules: [new ValidLength(), new IsRequired()]
	});

	describe('hasChanged', () => {
		it.each([
			['', true],
			[undefined, false],
			['12345', true],
			['12345 too long', true]
		])(
			'when type is %s, value is %s and original is undefined returns %s',
			(value: string | undefined, expected: boolean) => {
				const validationField = new ValidationField({
					...validationFieldNoRules,
					value
				});
				expect(validationField.getHasChanged()).toEqual(expected);
				expect(validationField.state.hasChanged).toEqual(expected);
			}
		);

		it.each([
			['og', 'og', false],
			['', 'og', true],
			[undefined, 'og', true],
			['12345', 'og', true],
			['12345 too long', 'og', true]
		])(
			'when type is %s, value is %s and original is %s returns %s',
			(
				value: string | undefined,
				originalValue: string | undefined,
				expected: boolean
			) => {
				const validationField = new ValidationField({
					...validationFieldNoRules,
					value,
					originalValue
				});
				expect(validationField.getHasChanged()).toEqual(expected);
				expect(validationField.state.hasChanged).toEqual(expected);
			}
		);
	});

	describe('hasError', () => {
		it.each([
			[
				'returns false if no validation rules',
				false,
				validationFieldNoRules
			],
			[
				'returns true if one validation rule fails',
				true,
				validationFieldOneRuleFails
			]
		])(
			'when %s returns %s',
			(
				_description: string,
				expected: boolean,
				validationField: ValidationField
			) => {
				expect(validationField.getHasError()).toEqual(expected);
			}
		);

		it.each([
			['not changed', false, undefined],
			['changed and valid', false, 'i am a string'],
			['changed and invalid', true, 'i']
		])(
			'when %s returns %s',
			(_description: string, expected: boolean, value: any) => {
				const validationField = new ValidationField({
					value,
					originalValue: undefined,
					validationRules: [new ValidLength()]
				});
				expect(validationField.getHasError()).toEqual(expected);
				expect(validationField.state.hasError).toEqual(expected);
			}
		);
	});

	describe('isValidField', () => {
		it.each([
			[
				'returns true if no validation rules',
				true,
				validationFieldNoRules
			],
			[
				'returns false if one validation rule fails',
				false,
				validationFieldOneRuleFails
			]
		])(
			'when %s returns %s',
			(
				_description: string,
				expected: boolean,
				validationField: ValidationField
			) => {
				expect(validationField.getIsValidField()).toEqual(expected);
				expect(validationField.state.isValidField).toEqual(expected);
			}
		);

		it.each([
			['not changed', true, undefined],
			['changed and valid', true, 'i am string'],
			['changed and invalid', false, 'i']
		])(
			'when %s returns %s',
			(_description: string, expected: boolean, value: any) => {
				const validationField = new ValidationField({
					value,
					originalValue: undefined,
					validationRules: [new ValidLength()]
				});
				expect(validationField.getIsValidField()).toEqual(expected);
				expect(validationField.state.isValidField).toEqual(expected);
			}
		);
	});

	describe('isRequiredFilled', () => {
		it.each([
			[
				'returns true if no validation rules',
				true,
				validationFieldNoRules
			],
			[
				'returns true if one validation rule fails',
				true,
				validationFieldOneRuleFails
			]
		])(
			'when %s returns %s',
			(
				_description: string,
				expected: boolean,
				validationField: ValidationField
			) => {
				expect(validationField.getIsRequiredFilled()).toEqual(expected);
				expect(validationField.state.isRequiredFilled).toEqual(
					expected
				);
			}
		);

		it.each([
			['not changed', false, undefined],
			['changed and valid', true, 'i am a string'],
			['changed and invalid', true, 'i']
		])(
			'when %s returns %s',
			(_description: string, expected: boolean, value: any) => {
				const validationField = new ValidationField({
					value,
					originalValue: undefined,
					validationRules: [new ValidLength(), new IsRequired()]
				});
				expect(validationField.getIsRequiredFilled()).toEqual(expected);
				expect(validationField.state.isRequiredFilled).toEqual(
					expected
				);
			}
		);
	});

	describe('error', () => {
		it.each([
			['not changed', validationError.isRequiredField, undefined],
			[
				'changed and valid',
				validationError.isRequiredField,
				'i am a string'
			],
			['changed and invalid', validationError.minLength, 'i']
		])(
			'when %s returns %s',
			(_description: string, expected: string, value: any) => {
				const validationField = new ValidationField({
					value,
					originalValue: undefined,
					validationRules: [new ValidLength(), new IsRequired()]
				});
				expect(validationField.getError()).toEqual(expected);
				expect(validationField.state.error).toEqual(expected);
			}
		);
	});
});
