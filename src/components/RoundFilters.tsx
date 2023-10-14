import { Card, Checkbox, Flex, Stack } from '@mantine/core';
//----------------------------------------------------------

interface Props {
	rounds: string[];
	activeRounds: string[];
	toggleCheck: (round: string) => void;
}

const RoundFilters: React.FC<Props> = ({
	rounds,
	activeRounds,
	toggleCheck,
}) => {
	return (
		<Card className="no-print">
			<Stack gap="sm">
				{rounds.map((round) => (
					<Flex key={round} gap="md" align="center">
						<Checkbox
							checked={activeRounds.includes(round)}
							onChange={() => toggleCheck(round)}
							// style={{ pointerEvents: 'none' }}
							label={round}
						/>
					</Flex>
				))}
			</Stack>
		</Card>
	);
};

export default RoundFilters;
