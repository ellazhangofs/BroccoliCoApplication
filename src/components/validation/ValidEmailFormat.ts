import { isValidEmail } from './isValidEmail';
import { validationError } from './validationError';
import { ValidationRule } from './ValidationRule';

export class ValidEmailFormat extends ValidationRule {
	constructor({
		...passThrough
	}: Partial<Omit<ValidEmailFormat, 'error'>> = {}) {
		super({
			...passThrough,
			error: validationError.invalidEmail
		});
	}

	public isValid(value: string | undefined): boolean {
		return (
			!super.isFilled(value) ||
			(typeof value === 'string' && isValidEmail(value))
		);
	}
}
