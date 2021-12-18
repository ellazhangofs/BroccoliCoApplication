import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { signUp } from '../api/signUp';
import StyledDialog from '../ui-components/StyledDialog';
import StyledDialogButton from '../ui-components/StyledDialogButton';
import StyledTextField from '../ui-components/StyledTextField';
import { IsRequired } from '../validation/IsRequired';
import { IsSameValue } from '../validation/IsSameValue';
import { Validate } from '../validation/Validate';
import { ValidationField } from '../validation/ValidationField';
import { ValidEmailFormat } from '../validation/ValidEmailFormat';
import { ValidLength } from '../validation/ValidLength';

interface Props {
	setIsSuccessDialogOpen: (isSuccessDialog: boolean) => void;
}

const NAME_FIELD_NAME = 'name';
const EMAIL_NAME = 'email';
const CONFIRM_EMAIL_NAME = 'confirmEmail';

export const createNameValidation = (
	value: string | undefined,
	originalValue: string | undefined
) =>
	new ValidationField({
		value,
		originalValue,
		validationRules: [new ValidLength(), new IsRequired()]
	}).state;

export const createEmailValidation = (
	value: string | undefined,
	originalValue: string | undefined
) =>
	new ValidationField({
		value,
		originalValue,
		validationRules: [new ValidEmailFormat(), new IsRequired()]
	}).state;

export const createConfirmEmailValidation = (
	value: string | undefined,
	originalValue: string | undefined,
	comparedValue: string | undefined
) =>
	new ValidationField({
		value,
		originalValue,
		validationRules: [
			new IsSameValue({
				comparedValue
			}),
			new ValidEmailFormat(),
			new IsRequired()
		]
	}).state;

const SignUpDialog = ({ setIsSuccessDialogOpen }: Props) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const [name, setName] = React.useState<string>();
	const [email, setEmail] = React.useState<string>();
	const [confirmEmail, setConfirmEmail] = React.useState<string>();
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>();
	const [errorMessage, setErrorMessage] = React.useState<string>();

	const validationStateMap = {
		[NAME_FIELD_NAME]: createNameValidation(name, undefined),
		[EMAIL_NAME]: createEmailValidation(email, undefined),
		[CONFIRM_EMAIL_NAME]: createConfirmEmailValidation(
			confirmEmail,
			undefined,
			email
		)
	};

	const onOpenClick = () => {
		setIsOpen(true);
	};

	const onCloseClick = () => {
		setName(undefined);
		setEmail(undefined);
		setConfirmEmail(undefined);
		setIsOpen(false);
	};

	const onNameChange = (event: React.ChangeEvent<{ value: string }>) => {
		setName(event.target.value);
	};

	const onEmailChange = (event: React.ChangeEvent<{ value: string }>) => {
		setEmail(event.target.value);
	};

	const onConfirmEmailChange = (
		event: React.ChangeEvent<{ value: string }>
	) => {
		setConfirmEmail(event.target.value);
	};

	const onSubmit = () => {
		console.log('clicks');

		if (name && email) {
			setIsSubmitting(true);
			signUp(name, email)
				.then(() => {
					console.log('ishere');
					onCloseClick();
					console.log('before click');
					setIsSuccessDialogOpen(true);
				})
				.catch((e) => {
					console.log(e);
					setErrorMessage(e.message);
				})
				.finally(() => {
					setIsSubmitting(false);
				});
		}
	};
	console.log(errorMessage);

	const content = (
		<>
			<Grid container justifyContent="center">
				<Grid item xs={12}>
					<StyledTextField
						id="name"
						required
						value={name ?? ''}
						label={'Full name'}
						variant="outlined"
						onChange={onNameChange}
						error={
							!validationStateMap[NAME_FIELD_NAME].isValidField
						}
						helperText={validationStateMap[NAME_FIELD_NAME].error}
					/>
				</Grid>

				<Grid item xs={12}>
					<StyledTextField
						id="email"
						required
						value={email ?? ''}
						label={'Email address'}
						variant="outlined"
						onChange={onEmailChange}
						error={!validationStateMap[EMAIL_NAME].isValidField}
						helperText={validationStateMap[EMAIL_NAME].error}
					/>
				</Grid>
				<Grid item xs={12}>
					<StyledTextField
						id="confirmEmail"
						required
						value={confirmEmail ?? ''}
						label={'Confirm Email address'}
						variant="outlined"
						onChange={onConfirmEmailChange}
						error={
							!validationStateMap[CONFIRM_EMAIL_NAME].isValidField
						}
						helperText={
							validationStateMap[CONFIRM_EMAIL_NAME].error
						}
					/>
				</Grid>
			</Grid>
		</>
	);

	const action = (
		<Grid container alignItems="center" justifyContent="center" spacing={1}>
			<Grid item xs={12}>
				<Button
					variant="outlined"
					color="primary"
					fullWidth
					onClick={onSubmit}
					disabled={
						Validate.disableSubmit(validationStateMap) ||
						isSubmitting
					}
				>
					Send
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Typography color="error">{errorMessage}</Typography>
			</Grid>
		</Grid>
	);

	return (
		<>
			<StyledDialogButton
				onClick={onOpenClick}
				id="btn-sendInviteBtn"
				text={'Request an invite'}
			/>
			{isOpen && (
				<StyledDialog
					onClose={onCloseClick}
					isOpen={isOpen}
					title={'Request an invite'}
					content={content}
					action={action}
				/>
			)}
		</>
	);
};

export default SignUpDialog;
