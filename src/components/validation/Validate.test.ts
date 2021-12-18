import { IsRequired } from './IsRequired';
import { Validate } from './Validate';
import { ValidationField } from './ValidationField';
import { ValidationFieldMap } from './ValidationFieldMap';
import { ValidationState } from './ValidationState';
import { ValidationStateMap } from './ValidationStateMap';
import { ValidLength } from './ValidLength';

describe('Validate', () => {
	const validationFieldWithoutValidationRules = new ValidationField({
		value: 'something valid'
	});

	const validationFieldWithRequiredFieldNotFilled = new ValidationField({
		value: '',
		validationRules: [new IsRequired()]
	});

	const validationFieldWithRequiredFieldFilled = new ValidationField({
		value: 'Elora Danan',
		validationRules: [new IsRequired()]
	});

	describe('getStateMap', () => {
		it.each([
			['is empty', {}, {}],
			[
				'has a single field',
				{ field1: validationFieldWithoutValidationRules },
				{ field1: validationFieldWithoutValidationRules.state }
			],
			[
				'has multiple fields',
				{
					field1: validationFieldWithoutValidationRules,
					field2: validationFieldWithRequiredFieldNotFilled,
					field3: validationFieldWithRequiredFieldFilled
				},
				{
					field1: validationFieldWithoutValidationRules.state,
					field2: validationFieldWithRequiredFieldNotFilled.state,
					field3: validationFieldWithRequiredFieldFilled.state
				}
			]
		])(
			'when field map %s',
			(
				_description: string,
				fieldMap: ValidationFieldMap,
				expected: ValidationStateMap
			) => {
				expect(Validate.getStateMap(fieldMap)).toEqual(expected);
			}
		);
	});

	describe('hasErrors', () => {
		it.each([
			[
				'required field is not filled',
				true,
				{
					field1: validationFieldWithRequiredFieldNotFilled.state
				}
			],
			[
				'required field is filled',
				false,
				{
					field1: validationFieldWithRequiredFieldFilled.state
				}
			]
		])(
			'%s returns %s',
			(
				_description: string,
				expected: boolean,
				data: ValidationStateMap
			) => {
				expect(Validate.hasErrors(data)).toEqual(expected);
			}
		);
	});

	describe('hasChanges', () => {
		it.each([
			[
				'empty string without original value',
				true,
				{
					field1: validationFieldWithRequiredFieldNotFilled.state
				}
			],
			[
				'valid string without original value',
				true,
				{
					field1: validationFieldWithRequiredFieldFilled.state
				}
			],
			[
				'empty string with original value',
				true,
				{
					field1: new ValidationField({
						...validationFieldWithRequiredFieldNotFilled,
						originalValue: 'something'
					}).state
				}
			],
			[
				'valid string with original value',
				true,
				{
					field1: new ValidationField({
						...validationFieldWithRequiredFieldFilled,
						originalValue: 'something'
					}).state
				}
			],
			[
				'changed string with no original value or validation rules',
				true,
				{
					field1: new ValidationField({
						value: 'Elora Danan'
					}).state
				}
			],
			[
				'unchanged string with original value',
				false,
				{
					field1: new ValidationField({
						value: 'Elora Danan',
						originalValue: 'Elora Danan',
						validationRules: [new IsRequired()]
					}).state
				}
			],
			[
				'with value undefined and no validation rules',
				false,
				{
					field1: new ValidationField({
						value: undefined
					}).state
				}
			]
		])(
			'%s returns %s',
			(
				_description: string,
				expected: boolean,
				data: ValidationStateMap
			) => {
				expect(Validate.hasChanges(data)).toEqual(expected);
			}
		);
	});

	describe('hasAllRequiredFields', () => {
		it.each([
			[
				'required field is not filled',
				false,
				{
					field1: validationFieldWithRequiredFieldNotFilled.state
				}
			],
			[
				'required field is filled',
				true,
				{
					field1: validationFieldWithRequiredFieldFilled.state
				}
			],
			[
				'not required field is not filled',
				true,
				{
					field1: new ValidationField({
						value: '',
						validationRules: [new ValidLength({ minLength: 20 })]
					}).state
				}
			],
			[
				'not required field is filled',
				true,
				{
					field1: validationFieldWithRequiredFieldFilled.state
				}
			],
			[
				'multiple required fields, one is filled',
				false,
				{
					field1: validationFieldWithRequiredFieldFilled.state,
					field2: validationFieldWithRequiredFieldNotFilled.state
				}
			],
			[
				'multiple required fields, all are filled',
				true,
				{
					field1: validationFieldWithRequiredFieldFilled.state,
					field2: validationFieldWithRequiredFieldFilled.state
				}
			],
			[
				'required field with multiple validation rules',
				true,
				{
					field1: new ValidationField({
						value: 'Elora Danan',
						validationRules: [
							new ValidLength({ minLength: 20 }),
							new IsRequired()
						]
					}).state,
					field2: new ValidationField({
						value: 'description goes here',
						validationRules: [
							new ValidLength({ minLength: 20 }),
							new IsRequired()
						]
					}).state
				}
			],
			[
				'required field with multiple validation rules, one rule fails',
				true,
				{
					field1: new ValidationField({
						value: 'Elora Danan',
						validationRules: [
							new ValidLength({ minLength: 20 }),
							new IsRequired()
						]
					}).state,
					field2: new ValidationField({
						value: 'description is too long',
						validationRules: [
							new ValidLength({ minLength: 20 }),
							new IsRequired()
						]
					}).state
				}
			]
		])(
			'%s returns %s',
			(
				_description: string,
				expected: boolean,
				data: ValidationStateMap
			) => {
				expect(Validate.hasAllRequiredFields(data)).toEqual(expected);
			}
		);
	});

	describe('disableSubmit', () => {
		it.each([
			[
				'required field is not filled',
				true,
				{
					field1: validationFieldWithRequiredFieldNotFilled.state
				}
			],
			[
				'required field is filled',
				false,
				{
					field1: validationFieldWithRequiredFieldFilled.state
				}
			],
			[
				'multiple required fields, one is filled',
				true,
				{
					field1: validationFieldWithRequiredFieldFilled.state,
					field2: validationFieldWithRequiredFieldNotFilled.state
				}
			],
			[
				'required field with multiple validation rules, one rule fails',
				true,
				{
					field1: new ValidationField({
						value: 'Elora Danan',
						validationRules: [
							new ValidLength({ minLength: 20 }),
							new IsRequired()
						]
					}).state,
					field2: new ValidationField({
						value: 'description is too long',
						validationRules: [
							new ValidLength({ minLength: 20 }),
							new IsRequired()
						]
					}).state
				}
			]
		])(
			'%s returns %s',
			(
				_description: string,
				expected: boolean,
				data: ValidationStateMap
			) => {
				expect(Validate.disableSubmit(data)).toEqual(expected);
			}
		);

		it.each([
			[true, true],
			[true, false],
			[false, true],
			[false, false]
		])(
			'when changes required is %s and field changes is %s',
			(changesRequired: boolean, hasChanged: boolean) => {
				const state = {
					bogus: new ValidationState({
						hasChanged,
						isRequiredFilled: true,
						hasError: false,
						isValidField: true
					})
				};
				expect(Validate.disableSubmit(state, changesRequired)).toEqual(
					changesRequired && !hasChanged
				);
			}
		);
	});
});
