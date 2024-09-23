export function formatDate(dateString) {
    const date = new Date(dateString);

    // Define options for formatting the date
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };

    // Format the date using toLocaleString
    return date.toLocaleString('en-US', options);
}

export function adjustDate(dateString, hours, minutes, seconds) {
    const date = new Date(dateString);
    date.setHours(hours, minutes, seconds);

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };

    return date.toLocaleString('en-US', options);
}