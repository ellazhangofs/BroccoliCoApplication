import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { GenerateId } from 'jss';
import React, { ReactElement, ReactNode } from 'react';
import appTheme from '../../appTheme';

let ruleCounter = 0;

/* istanbul ignore next */
export const generateClassName: GenerateId = (rule, sheet): string => {
	ruleCounter += 1;
	if (ruleCounter > 1e10) {
		console.warn(
			'generateClassName: you might have a memory leak. The ruleCounter is not supposed to grow that much.'
		);
	}

	if (process.env.NODE_ENV === 'production') {
		return `c${ruleCounter}`;
	}

	if (sheet && sheet.options.meta) {
		return `${sheet.options.meta}-${rule.key}-${ruleCounter}`;
	}

	return `${rule.key}-${ruleCounter}`;
};

interface Props {
	children: ReactNode;
}

export const AppThemeProvider = ({ children }: Props): ReactElement => {
	return (
		<StylesProvider generateClassName={generateClassName}>
			<ThemeProvider theme={appTheme}>{children}</ThemeProvider>
		</StylesProvider>
	);
};
