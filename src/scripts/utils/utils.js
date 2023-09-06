export function formatDate(date, getHours = false) {
    if (!date) return null;
    const d = new Date(new Date(date).toUTCString().substr(0, 25));
    if (getHours) {
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
    }
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
}

function setCurrency(lang) {
    const curreny = {
        en: 'USD',
        pt: 'BRL',
    };
    return curreny[lang];
}

export function formatCurrency(amount, language = 'pt-BR', currency = 'BRL', precision = 2) {
    const lang = language.slice(0, 2);
    currency = setCurrency(lang);
    let amountParsed = amount;

    if (typeof amountParsed !== 'number') {
        amountParsed = parseFloat(amount);
    }
    if (typeof amountParsed !== 'number') return null;

    return amountParsed.toLocaleString(language, {
        style: 'currency',
        currency,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
    });
}

export function convertHourInTime(hours, workingHours, monthDays = 22) {
    const secondsPerMinute = 60;
    const minutesPerHour = 60;
    const hoursPerDay = workingHours;
    const daysPerYear = monthDays * 12;
    const secondsPerDay = secondsPerMinute * minutesPerHour * hoursPerDay;

    const years = Math.floor(hours / (secondsPerDay * daysPerYear));
    hours %= secondsPerDay * daysPerYear;

    const months = Math.floor(hours / (secondsPerDay * 30.44));
    hours %= secondsPerDay * 30.44;

    const days = Math.floor(hours / secondsPerDay);
    hours %= secondsPerDay;

    const remainingHours = Math.floor(hours / (secondsPerMinute * minutesPerHour));
    hours %= secondsPerMinute * minutesPerHour;

    const remainingMinutes = Math.floor(hours / secondsPerMinute);
    hours %= secondsPerMinute;

    const remainingSeconds = Math.floor(hours);

    return {
        years,
        months,
        days,
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
    };
}
