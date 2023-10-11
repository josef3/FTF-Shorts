import { Button, Checkbox, Flex, Input, Table, Text } from '@mantine/core';
import React from 'react';

export interface Product {
	product_code: string;
	product_desc: string;
	category: string;
	qty: number;
	uos: string;
	short: number;
}

interface Props {
	data: Product[];
	orderNumber: number;
	updateShort: (
		orderNumber: number,
		productIndex: number,
		shortQty: number
	) => void;
}

const ProductsTable: React.FC<Props> = ({ data, orderNumber, updateShort }) => {
	let currentCategory = '';
	const rows = data.map(
		({ product_code, product_desc, uos, qty, short, category }, index) => {
			const isCurrentCategory = currentCategory === category;
			currentCategory = category;
			return (
				<React.Fragment key={`row_${index}`}>
					{!isCurrentCategory && (
						<Table.Tr key={`header_${index}`}>
							<Table.Td style={{ textAlign: 'center' }}>
								<Text size="xs" fw="bold">
									{category}
								</Text>
							</Table.Td>
							<Table.Td></Table.Td>
							<Table.Td></Table.Td>
							<Table.Td></Table.Td>
							<Table.Td></Table.Td>
						</Table.Tr>
					)}
					<Table.Tr key={index}>
						<Table.Td>{product_code}</Table.Td>
						<Table.Td>{product_desc}</Table.Td>
						<Table.Td>{uos}</Table.Td>
						<Table.Td>{qty}</Table.Td>
						<Table.Td>
							<Flex align="center">
								<Checkbox
									checked={short > 0}
									onChange={
										short > 0
											? () => updateShort(orderNumber, index, 0)
											: () => updateShort(orderNumber, index, qty)
									}
								/>
								{short > 0 && (
									// <Button size="xs" ml="sm">
									// 	Change Qty
									// </Button>
									<>
										<Button
											variant="outline"
											ml="md"
											size="compact-sm"
											style={{ borderRadius: '100%' }}
											disabled={short === 1}
											onClick={() => updateShort(orderNumber, index, short - 1)}
										>
											<Text>-</Text>
										</Button>
										<Input value={short} ml="sm" mr="sm" w={60} readOnly />
										<Button
											variant="outline"
											size="compact-sm"
											style={{ borderRadius: '100%' }}
											disabled={short == qty}
											onClick={() => updateShort(orderNumber, index, short + 1)}
										>
											<Text>+</Text>
										</Button>
									</>
								)}
							</Flex>
						</Table.Td>
					</Table.Tr>
				</React.Fragment>
			);
		}
	);

	return (
		<Table>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Code</Table.Th>
					<Table.Th style={{ minWidth: '300px' }}>Description</Table.Th>
					{/* <Table.Th>Description</Table.Th> */}
					<Table.Th>Unit of Sale</Table.Th>
					<Table.Th>Qty</Table.Th>
					<Table.Th>Short?</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>{rows}</Table.Tbody>
		</Table>
	);
};

export default ProductsTable;
