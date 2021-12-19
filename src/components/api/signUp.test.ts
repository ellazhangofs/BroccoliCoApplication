import axios from 'axios';
import { signUp } from './signUp';

jest.mock('axios');

describe('signUp', () => {
	const name = 'user1';
	const email = 'user1@gmail.com';

	it('sends a post request to sign up', async () => {
		(axios.post as jest.Mock).mockResolvedValue('success');
		try {
			await signUp(name, email);
			expect(axios.post).toHaveBeenCalledTimes(1);
			expect(axios.post).toHaveBeenCalledWith(
				'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
				{
					name,
					email
				}
			);
		} catch (e) {
			fail('failed to pass the test');
		}
	});
});
