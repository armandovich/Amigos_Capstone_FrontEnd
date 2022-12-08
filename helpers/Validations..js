export default {
    formatDate: (value) => {
        return new Date(value).toISOString().slice(0, 10);
    },
    isValidDate: (value) => {
        return !isNaN(Date.parse(value));
    }
}