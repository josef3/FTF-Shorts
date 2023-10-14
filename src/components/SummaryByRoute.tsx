import React, { useMemo, useState } from 'react';
import { Flex, Text, Title } from '@mantine/core';
//-------------------- Components --------------------------
import ShortsTable from './ShortsTable';
import RoundFilters from './RoundFilters';
import { Order } from '../pages';
//----------------------------------------------------------

interface Props {
	orders: Order[] | undefined;
}

function getSummaryDetails(data: Order[] | undefined) {
	if (data == undefined) {
		return;
	}

	const filteredOrders = data
		.map((order) => ({
			...order,
			products: order.products.filter((product) => product.short > 0),
		}))
		.filter((order) => order.products.length > 0);

	const groupedOrders: Order[] = [];

	const customerMap = new Map<string, Order>();

	for (const order of filteredOrders) {
		const existingOrder = customerMap.get(order.customer_code);

		if (existingOrder) {
			// Update existing order with merged short quantities
			for (const product of order.products) {
				const existingProduct = existingOrder.products.find(
					(p) => p.product_code === product.product_code
				);

				if (existingProduct) {
					existingProduct.short += product.short;
				} else {
					existingOrder.products.push(product);
				}
			}
		} else {
			// No existing order found, add the order to the map
			customerMap.set(order.customer_code, order);
		}
	}

	// Convert the map back to an array
	groupedOrders.push(...customerMap.values());

	const groupedByRound: { [round: string]: Order[] } = {};

	for (const order of groupedOrders) {
		const round = order.round;
		if (!groupedByRound[round]) {
			groupedByRound[round] = [];
		}
		groupedByRound[round].push(order);
	}

	// Extract and sort the keys (rounds) by their numeric values
	const sortedRounds = Object.keys(groupedByRound).sort((a, b) => {
		const aNumber = parseInt(a.split(' ')[1]);
		const bNumber = parseInt(b.split(' ')[1]);
		console.log(aNumber);
		console.log(bNumber);
		return aNumber - bNumber;
	});

	// Create the final array in sorted order
	const finalArray = sortedRounds.map((round) => ({
		round,
		orders: groupedByRound[round],
	}));

	return {
		summary: finalArray,
		roundsArray: sortedRounds,
	};
}

const SummaryByRoute: React.FC<Props> = ({ orders }) => {
	const [activeRounds, setActiveRounds] = useState<string[]>([]);
	const summary = useMemo(() => getSummaryDetails(orders), [orders]);

	function toggleCheck(round: string) {
		if (activeRounds.includes(round)) {
			setActiveRounds((prevState) =>
				prevState.filter((state) => state != round)
			);
		} else {
			setActiveRounds((prevState) => [...prevState, round]);
		}
	}

	return (
		<Flex gap="lg">
			<Flex align="center" direction="column" gap="md">
				{summary?.summary
					.filter(
						({ round }) =>
							activeRounds.includes(round) || activeRounds.length === 0
					)
					.map(({ round, orders }) => (
						<Flex direction="column" align="center" key={round} gap="md">
							<Title order={4}>{round}</Title>
							{orders.map(({ customer_name, products }) => (
								<Flex
									direction="column"
									align="center"
									key={customer_name}
									p="sm"
									style={{ borderRadius: '4px', border: '0.7px solid #CED4D9' }}
								>
									<Text>{customer_name}</Text>
									<ShortsTable summary={products} />
								</Flex>
							))}
						</Flex>
					))}
			</Flex>
			<RoundFilters
				rounds={summary?.roundsArray || []}
				activeRounds={activeRounds}
				toggleCheck={toggleCheck}
			/>
		</Flex>
	);
};

export default SummaryByRoute;
