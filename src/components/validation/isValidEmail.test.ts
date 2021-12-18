import { isValidEmail } from './isValidEmail';

describe('isValidEmail', () => {
	it.each([
		['123', false],
		['test@', false],
		['test@hotmail', false],
		['test@hotmail.com', true],
		['ella+is+awesome@hotmail.com', true],
		['test@hot@mail.com', false],
		['test@hotmail.com    ', false],
		['    test@hotmail.com', false],
		['test@hotmail.com.au', true],
		['test+SUPER@hotmail.com', true],
		[
			'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ@bla.com',
			true
		]
	])("when input is '%s', return %s", (email: string, expected: boolean) => {
		expect(isValidEmail(email)).toBe(expected);
	});
});
