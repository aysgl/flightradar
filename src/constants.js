export const getTime = (unix_time) => {
    const date = new Date(unix_time * 1000);

    const hours = date.getHours().toString().padStart(2, '0'); // Ensure two digits
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits

    return `${hours}:${minutes}`;
};

export const calculateTimeDifference = (departure, current) => {
    const departureParts = departure.split(':');
    const currentParts = current.split(':');

    const departureMinutes = parseInt(departureParts[0]);
    const currentMinutes = parseInt(currentParts[0]);

    let timeDifference = currentMinutes - departureMinutes;

    return timeDifference;
}
