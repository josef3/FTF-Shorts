const formatDate = (date: Date) => {
	const dd = String(date.getDate()).padStart(2, '0');
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const yyyy = date.getFullYear();
	return `${dd}-${mm}-${yyyy}`;
};

export function getTomorrowsDate() {
	// Get the current date
	const currentDate = new Date();

	// Calculate tomorrow's date
	const tomorrow = new Date(currentDate);
	tomorrow.setDate(currentDate.getDate() + 1);

	return formatDate(tomorrow);
}

export function getActualDate() {
	const currentDateTime = new Date();
	const targetTime = new Date(currentDateTime);
	targetTime.setHours(15, 0, 0, 0);

	if (currentDateTime < targetTime) {
		// If it's before 3 PM, return today's date
		return formatDate(currentDateTime);
	} else {
		// If it's after 3 PM, return tomorrow's date
		return getTomorrowsDate();
	}
}
