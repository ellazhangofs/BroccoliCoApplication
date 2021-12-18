import { IsRequired } from './IsRequired';
import { ValidationRule } from './ValidationRule';
import { ValidationState } from './ValidationState';

export class ValidationField {
	constructor({
		value,
		originalValue,
		validationRules = []
	}: Partial<ValidationField>) {
		this.value = value;
		this.originalValue = originalValue;
		this.validationRules = validationRules;
	}
	readonly value: string | undefined;
	readonly originalValue: string | undefined;
	readonly validationRules: ValidationRule[];

	public getHasChanged(): boolean {
		return this.originalValue !== this.value;
	}

	public getHasError(): boolean {
		return !!this.validationRules.some(
			(rule: ValidationRule) =>
				this.getHasChanged() && !rule.isValid(this.value)
		);
	}

	public getIsValidField(): boolean {
		return (
			!this.validationRules ||
			this.validationRules?.every(
				(rule: ValidationRule) =>
					!this.getHasChanged() || rule.isValid(this.value)
			)
		);
	}

	public getIsRequiredFilled(): boolean {
		return (
			!this.validationRules ||
			this.validationRules.every((rule: ValidationRule) =>
				rule instanceof IsRequired ? rule.isFilled(this.value) : true
			)
		);
	}

	public getError(): string | undefined {
		const rule = this.validationRules.find(
			(rule) =>
				(this.getHasChanged() && !rule.isValid(this.value)) ||
				rule instanceof IsRequired
		);
		return rule?.getError(this.value) ?? undefined;
	}

	public get state(): ValidationState {
		return new ValidationState({
			hasChanged: this.getHasChanged(),
			hasError: this.getHasError(),
			isValidField: this.getIsValidField(),
			isRequiredFilled: this.getIsRequiredFilled(),
			error: this.getError()
		});
	}
}
