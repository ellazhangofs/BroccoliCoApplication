import { ValidationFieldMap } from './ValidationFieldMap';
import { ValidationStateMap } from './ValidationStateMap';

export type TranslationStringMap = { [name: string]: string[] };

export class Validate {
	public static getStateMap(fieldMap: ValidationFieldMap): ValidationStateMap {
		const result: ValidationStateMap = {};
		for (const [name, field] of Object.entries(fieldMap)) {
			result[name] = field.state;
		}
		return result;
	}

	public static hasErrors(stateMap: ValidationStateMap): boolean {
		return Object.values(stateMap).some((x) => x.hasError);
	}

	public static hasChanges(stateMap: ValidationStateMap): boolean {
		return Object.values(stateMap).some((x) => x.hasChanged);
	}

	public static disableSubmit(stateMap: ValidationStateMap, changesRequired: boolean = true): boolean {
		return (
			(changesRequired && !Validate.hasChanges(stateMap)) ||
			Object.values(stateMap).some((x) => !x.isRequiredFilled || x.hasError)
		);
	}

	public static hasAllRequiredFields(stateMap: ValidationStateMap): boolean {
		return Object.values(stateMap).every((x) => x.isRequiredFilled);
	}
}
