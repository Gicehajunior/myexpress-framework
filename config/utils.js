const utility = {
    ucwords: (str) => {
        return str?.length ? str
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ') : null;
    },
    ucfirst: (str) => {
        return str?.length ? str.charAt(0).toUpperCase() + str.slice(1) : null;
    },
    dateToISO8601Formatter: (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },
    nl2br: (text) => {
        return text.replace(/\n/g, '<br>');
    }
}

module.exports = utility;
