import axios from 'axios';

export const signUp = async (name: string, email: string) => {
	return axios.post(
		'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
		{
			name,
			email
		}
	);
};
