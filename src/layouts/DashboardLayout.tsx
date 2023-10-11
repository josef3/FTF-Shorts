import { AppShell } from '@mantine/core';

interface Props {
	children: React.ReactNode;
}

// const navbarItems = [
// 	{ link: '', label: 'Orders' },
// 	{ link: '/shorts-detailed', label: 'Shorts Detailed' },
// 	{ link: '/shorts-sumarry', label: 'Shorts Summary' },
// ];

// const Navbar = () => {
// 	// const [active, setActive] = useState('Billing');

// 	const links = navbarItems.map(({ link, label }) => (
// 		<a
// 			// className={link}
// 			data-active={label === active || undefined}
// 			href={link}
// 			key={label}
// 			onClick={(event) => {
// 				event.preventDefault();
// 				setActive(label);
// 			}}
// 		>
// 			{/* <item.icon className={classes.linkIcon} stroke={1.5} /> */}
// 			<span>{label}</span>
// 		</a>
// 	));

// 	return (
// 		<nav className={classes.navbar}>
// 			<div className={classes.navbarMain}>
// 				<Group className={classes.header} justify="space-between">
// 					{/* <MantineLogo size={28} /> */}
// 					{/* <Code fw={700}>v3.1.2</Code> */}
// 				</Group>
// 				{links}
// 			</div>

// 			<div className={classes.footer}>
// 				<a
// 					href="#"
// 					className={classes.link}
// 					onClick={(event) => event.preventDefault()}
// 				>
// 					{/* <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} /> */}
// 					<span>Change account</span>
// 				</a>

// 				<a
// 					href="#"
// 					className={classes.link}
// 					onClick={(event) => event.preventDefault()}
// 				>
// 					{/* <IconLogout className={classes.linkIcon} stroke={1.5} /> */}
// 					<span>Logout</span>
// 				</a>
// 			</div>
// 		</nav>
// 	);
// };

const DashboardLayout: React.FC<Props> = ({ children }) => {
	// const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			// header={{ height: 60 }}
			// navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
			padding="md"
		>
			{/* <AppShell.Header>
				<Group h="100%" px="md">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
				</Group>
			</AppShell.Header> */}
			{/* <AppShell.Navbar p="md">
				{navbarItems.map(({ link, label }, index) => (
					<Text id={label} key={label}>
						{label}
					</Text>
				))}
			</AppShell.Navbar> */}
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
};

export default DashboardLayout;
