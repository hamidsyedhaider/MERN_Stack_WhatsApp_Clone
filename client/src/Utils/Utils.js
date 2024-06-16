export const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();

    const formattedHours = `${hours < 10 ? "0" + hours : hours}`;
    const formattedMinutes = `${minutes < 10 ? "0" + minutes : minutes}`;

    return (`${formattedHours}:${formattedMinutes}`);
};