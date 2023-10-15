import { useEffect, useState } from 'react';
import { onValue, ref, set } from 'firebase/database';
import {
	Affix,
	Button,
	Container,
	Flex,
	SegmentedControl,
	Text,
	TextInput,
	Title,
	Transition,
} from '@mantine/core';
import { useDebouncedState, useWindowScroll } from '@mantine/hooks';
//-------------------- Components --------------------------
import ProductsTable, { Product } from '../components/ProductsTable';
import ShortsTable from '../components/ShortsTable';
import SummaryByRoute from '../components/SummaryByRoute';
//----------------------------------------------------------
import { getActualDate } from '../utils';
import { db } from '../db';
//----------------------------------------------------------
export interface Order {
	customer_code: string;
	customer_name: string;
	order_number: number;
	products: Product[];
	round: string;
}

export type Summary = Omit<Product, 'qty'>[];

function getSummary(data: Order[] | undefined) {
	const summary: Summary = [];

	data?.forEach(({ products }) => {
		products.forEach((product) => {
			if (product.short > 0) {
				// Check if the product with the same code already exists in the summary array
				const existingProductIndex = summary.findIndex(
					(item) => item.product_code === product.product_code
				);

				if (existingProductIndex !== -1) {
					// If the product is already in the array, update the quantity and other info
					summary[existingProductIndex].short += product.short;
					// Optionally, you can also update other information here
				} else {
					// If the product is not in the array, add it with the info
					summary.push({
						product_code: product.product_code,
						product_desc: product.product_desc,
						category: product.category,
						uos: product.uos,
						short: product.short,
					});
				}
			}
		});
	});

	summary.sort((a, b) => {
		if (a.category === b.category) {
			return a.product_code.localeCompare(b.product_code);
		}
		return a.category.localeCompare(b.category);
	});

	return summary;
}

const Orders = () => {
	const [scroll, scrollTo] = useWindowScroll();
	const [orders, setOrders] = useState<Order[]>();
	const [filteredOrder, setFilteredOrder] = useState<Order>();

	const [search, setSearch] = useDebouncedState('', 200);

	const [segment, setSegment] = useState('Orders');

	const date = getActualDate();

	const summary = getSummary(orders);

	useEffect(() => {
		const query = ref(db, date);
		return onValue(query, (snapshot) => {
			const data = snapshot.val();
			setOrders(data);
		});
	}, [date]);

	const updateShort = (
		orderNumber: number,
		productIndex: number,
		shortQty: number
	) => {
		const orderIndex = orders?.findIndex(
			(order) => order.order_number === orderNumber
		);
		set(
			ref(db, `${date}/${orderIndex}/products/${productIndex}/short`),
			shortQty
		);
	};

	useEffect(() => {
		if (search.length > 4) {
			const findOrder = orders?.filter(
				(order) => order.order_number.toString() == search
			);
			if (findOrder) setFilteredOrder(findOrder[0]);
		} else {
			if (setFilteredOrder != null) setFilteredOrder(undefined);
		}
	}, [search, orders]);

	return (
		<>
			<Affix position={{ bottom: 20, right: 20 }}>
				<Transition transition="slide-up" mounted={scroll.y > 0}>
					{(transitionStyles) => (
						<Button
							leftSection={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									style={{ width: '1rem' }}
								>
									<path
										fill-rule="evenodd"
										d="M12 20.25a.75.75 0 01-.75-.75V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l6.75 6.75a.75.75 0 11-1.06 1.06l-5.47-5.47V19.5a.75.75 0 01-.75.75z"
										clip-rule="evenodd"
									/>
								</svg>
							}
							style={transitionStyles}
							onClick={() => scrollTo({ y: 0 })}
						>
							Scroll to top
						</Button>
					)}
				</Transition>
			</Affix>
			<Flex direction="column" align="center" gap="xs">
				<Flex align="center" justify="space-around" w="100%" mb="sm">
					<Flex align="center">
						<img src="/ftf-logo.jpeg" style={{ width: 50, borderRadius: 10 }} />
						<Text ml="sm" fw="bold">
							FTF Shorts
						</Text>
					</Flex>
					<SegmentedControl
						value={segment}
						onChange={setSegment}
						data={[
							{ value: 'Orders', label: 'Orders' },
							{ value: 'Summary', label: 'Summary' },
							{ value: 'By Route', label: 'By Route' },
						]}
					/>
				</Flex>
				{segment === 'Orders' && (
					<Container style={{ minWidth: '60vw' }}>
						<Flex justify="center">
							<Title order={2} mb="md">
								List of orders
							</Title>
						</Flex>
						<Flex align="center" justify="space-between" mb="md">
							<TextInput
								label="Order no."
								size="sm"
								onChange={(event) => setSearch(event.currentTarget.value)}
							/>
							<Text fw="bold">Date: {date}</Text>
						</Flex>
						{filteredOrder != null && (
							<ProductsTable
								data={filteredOrder.products}
								orderNumber={filteredOrder.order_number}
								updateShort={updateShort}
							/>
						)}
						{filteredOrder == null && search.length > 0 && (
							<Text>No order found</Text>
						)}
					</Container>
				)}
				{segment === 'Summary' && (
					<Container fluid>
						<Flex justify="center">
							<Title order={2} mb="md">
								Shorts Summary
							</Title>
						</Flex>
						<Flex justify="space-between" align="center" mb="md">
							<Text fw="bold">Date: {date}</Text>
							<Button
								mb="sm"
								variant="filled"
								onClick={() => window.print()}
								className="no-print"
							>
								Print report
							</Button>
						</Flex>
						<ShortsTable summary={summary} withBorder />
					</Container>
				)}
				{segment === 'By Route' && (
					<Container fluid>
						<Flex justify="center">
							<Title order={2} mb="md">
								Shorts Summary Detailed
							</Title>
						</Flex>
						<Flex
							justify="space-between"
							align="center"
							mb="md"
							style={{ width: '100%' }}
						>
							<Text fw="bold">Date: {date}</Text>
							<Button
								mb="sm"
								variant="filled"
								onClick={() => window.print()}
								className="no-print"
							>
								Print report
							</Button>
						</Flex>
						<Flex>
							<SummaryByRoute orders={orders} />
						</Flex>
					</Container>
				)}
			</Flex>
		</>
	);
};

export default Orders;
