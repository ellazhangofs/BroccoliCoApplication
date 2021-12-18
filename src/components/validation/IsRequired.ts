import { validationError } from './validationError';
import { ValidationRule } from './ValidationRule';

export class IsRequired extends ValidationRule {
	constructor({ ...passThrough }: Partial<Omit<IsRequired, 'error'>> = {}) {
		super({ ...passThrough, error: validationError.isRequiredField });
	}

	public isValid(value: string | undefined): boolean {
		return typeof value === 'string'
			? value.trim() !== String()
			: value !== undefined;
	}

	public getError(_value: string | undefined): string | undefined {
		return this.error;
	}
}
