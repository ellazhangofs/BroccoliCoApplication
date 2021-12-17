import React from 'react';
import './App.css';
import PageLayout from './components/layout/PageLayout';
import LandingPageContent from './components/navigation/LandingPageContent';
import NavBar from './components/navigation/NavBar';
import StickyFooter from './components/navigation/StickyFooter';
import { AppThemeProvider } from './components/providers/AppThemeProvider';

export const App = () => {
	return (
		<AppThemeProvider>
			<PageLayout
				header={<NavBar />}
				content={<LandingPageContent />}
				footer={<StickyFooter />}
			/>
		</AppThemeProvider>
	);
};
