import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import DashboardLayout from './layouts/DashboardLayout.tsx';
import Orders from './pages';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<MantineProvider theme={theme}>
			<DashboardLayout>
				<Orders />
			</DashboardLayout>
		</MantineProvider>
	</React.StrictMode>
);
