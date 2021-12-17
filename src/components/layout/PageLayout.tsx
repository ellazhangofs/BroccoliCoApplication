import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';

export const headerHeight = '70px';
export const footerHeight = '70px';

const useStyles = makeStyles((theme: Theme) => ({
	pageLayout: {
		height: '100vh',
		display: 'grid',
		gridTemplateRows: `${headerHeight} 1fr ${footerHeight}`
	},
	header: {
		gridRowStart: '1',
		gridRowEnd: '2'
	},
	content: {
		gridRowStart: '2',
		gridRowEnd: '3',
		overflow: 'hidden',
		display: 'flex'
	},
	footer: {
		gridRowStart: '3',
		gridRowEnd: '4'
	}
}));

interface Props {
	header?: JSX.Element;
	content?: JSX.Element;
	footer?: JSX.Element;
}

const PageLayout = ({ header, content, footer }: Props) => {
	const classes = useStyles();

	return (
		<div className={classes.pageLayout}>
			{header && <div className={classes.header}>{header}</div>}
			{content && <div className={classes.content}>{content}</div>}
			{footer && <div className={classes.footer}>{footer}</div>}
		</div>
	);
};

export default PageLayout;
