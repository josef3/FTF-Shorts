import React from 'react';
import { Table, Text } from '@mantine/core';
import { Summary } from '../pages';

interface Props {
	summary: Summary;
}

const ShortsTable: React.FC<Props> = ({ summary }) => {
	let currentCategory = '';
	const rows = summary.map(({ product_desc, uos, category, short }, index) => {
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
						{/* <Table.Td></Table.Td> */}
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
					</Table.Tr>
				)}
				<Table.Tr key={index}>
					{/* <Table.Td>{product_code}</Table.Td> */}
					<Table.Td>{product_desc}</Table.Td>
					<Table.Td>{uos}</Table.Td>
					<Table.Td>{short}</Table.Td>
				</Table.Tr>
			</React.Fragment>
		);
	});

	return (
		<Table>
			<Table.Thead>
				<Table.Tr>
					{/* <Table.Th>Code</Table.Th> */}
					<Table.Th>Description</Table.Th>
					<Table.Th>Unit of Sale</Table.Th>
					<Table.Th>Short Qty</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>{rows}</Table.Tbody>
		</Table>
	);
};

export default ShortsTable;
