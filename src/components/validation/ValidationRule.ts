export abstract class ValidationRule {
	constructor({ error = String() }: Partial<ValidationRule>) {
		this.error = error;
	}
	readonly error: string;

	public abstract isValid(value: string | undefined): boolean;

	public isFilled(value: string | undefined): boolean {
		return typeof value === 'string'
			? value.trim() !== String()
			: value !== undefined;
	}

	public getError(value: string | undefined): string | undefined {
		return this.isValid(value) ? undefined : this.error;
	}
}
