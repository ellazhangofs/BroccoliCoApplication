import { validationError } from './validationError';
import { ValidationRule } from './ValidationRule';

export class IsSameValue extends ValidationRule {
	constructor({
		comparedValue = String(),
		...passThrough
	}: Partial<Omit<IsSameValue, 'error'>> = {}) {
		super({
			...passThrough,
			error: validationError.isNotMatch
		});
		this.comparedValue = comparedValue;
	}
	readonly comparedValue: string;

	public isValid(value: string | undefined): boolean {
		return (
			!super.isFilled(value) ||
			typeof value !== 'string' ||
			value === this.comparedValue
		);
	}
}
