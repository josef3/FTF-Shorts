export function getTomorrowsDate() {
	// Get the current date
	const currentDate = new Date();

	// Calculate tomorrow's date
	const tomorrow = new Date(currentDate);
	tomorrow.setDate(currentDate.getDate() + 1);

	// Format the date as "DD-MM-YYYY"
	const dd = String(tomorrow.getDate()).padStart(2, '0');
	const mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); // January is 0!
	const yyyy = tomorrow.getFullYear();

	return `${dd}-${mm}-${yyyy}`;
}
