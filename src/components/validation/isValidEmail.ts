export const isValidEmail = (email: string): boolean => {
	return !!email
		.toLowerCase()
		.match(
			/^[a-z\u00C0-\u00ff0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\u00C0-\u00ff0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/
		);
};
