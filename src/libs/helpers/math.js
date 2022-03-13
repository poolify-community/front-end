export const formatNumber = (number,minPrecision = 2,maxPrecision = 2) => {
    if (number === 0) {
        return '0';
    }
    try {
        //if (number > 1) {
        if (number) {
            const options = {
                minimumFractionDigits: minPrecision,
                maximumFractionDigits: maxPrecision,
            };
            return number.toLocaleString(undefined, options);
        } else {
            return number.toPrecision(2);
        }
    } catch (e) {
        return number;
    }
};