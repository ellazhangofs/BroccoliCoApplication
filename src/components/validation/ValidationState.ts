export class ValidationState {
	constructor({
		hasChanged = false,
		hasError = false,
		isValidField = false,
		isRequiredFilled = false,
		error = ''
	}: Partial<ValidationState> = {}) {
		this.hasChanged = hasChanged;
		this.hasError = hasError;
		this.isValidField = isValidField;
		this.isRequiredFilled = isRequiredFilled;
		this.error = error;
	}

	readonly hasChanged: boolean;
	readonly hasError: boolean;
	readonly isValidField: boolean;
	readonly isRequiredFilled: boolean;
	readonly error: string;
}
