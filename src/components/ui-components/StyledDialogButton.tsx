import Button from '@material-ui/core/Button';
import React from 'react';

interface Props {
	id?: string;
	text: string;
	onClick?: () => void;
	variant?: any;
	disabled?: boolean;
}

const StyledDialogButton = ({
	id,
	text,
	onClick,
	variant,
	disabled
}: Props) => {
	return (
		<Button
			id={id}
			variant={variant ?? 'contained'}
			onClick={onClick}
			color="primary"
			disabled={disabled}
		>
			{text}
		</Button>
	);
};

export default StyledDialogButton;
