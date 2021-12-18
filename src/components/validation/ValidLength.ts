import { validationError } from './validationError';
import { ValidationRule } from './ValidationRule';

export class ValidLength extends ValidationRule {
	constructor({
		minLength = 3,
		...passThrough
	}: Partial<Omit<ValidLength, 'error'>> = {}) {
		super({ ...passThrough, error: validationError.minLength });
		this.minLength = minLength;
	}
	minLength: number;

	public isValid(value: string | undefined): boolean {
		if (!super.isFilled(value)) {
			return true;
		} else if (typeof value === 'string') {
			return value.length >= this.minLength;
		} else {
			return false;
		}
	}
}
