/**
 * Validate screenshot date + time independently,
 * supporting all UPI app variations.
 *
 * @param {string|null} dateStr
 * @param {string|null} timeStr
 */
export function validateUPIScreenshotTime(dateStr, timeStr) {
    if (!dateStr || !timeStr) {
        return { valid: false, reason: "Invalid date and time." };
    }

    // Normalize input first
    dateStr = dateStr.trim().replace(/,/g, "");
    timeStr = timeStr.trim().replace(/\./g, ":").replace(/-/g, ":");

    let parsedDate = parseUPIDate(dateStr);
    let parsedTime = parseUPITime(timeStr);

    if (!parsedDate) {
        return { valid: false, reason: "Invalid date and time" };
    }

    if (!parsedTime) {
        return { valid: false, reason: "Invalid date and time" };
    }

    // Merge date + time into a real Date object safely
    const finalDateTime = new Date(
        parsedDate.year,
        parsedDate.month - 1,
        parsedDate.day,
        parsedTime.hour,
        parsedTime.minute,
        parsedTime.second
    );

    if (isNaN(finalDateTime.getTime())) {
        return { valid: false, reason: "failed_datetime_merge" };
    }

    const now = new Date();

    // Screenshot cannot be from the future
    if (finalDateTime > now) {
        return { valid: false, reason: "future_screenshot_time" };
    }

    // Check maximum allowed age: 15 minutes
    const diffMinutes = (now - finalDateTime) / (1000 * 60);

    if (diffMinutes > 15) {
        return { valid: false, reason: "screenshot_too_old" };
    }

    return {
        valid: true,
        dateTime: finalDateTime,
    };
}


/** -------------------------------
 * UPI DATE PARSER
 * Supports:
 *  - 24/01/2025
 *  - 24-01-2025
 *  - 24.01.2025
 *  - 2025/01/24
 *  - Jan 24, 2025
 *  - 24 Jan 2025
 ----------------------------------*/
function parseUPIDate(dateStr) {
    const formats = [
        /^(\d{2})\/(\d{2})\/(\d{4})$/,     // 24/01/2025
        /^(\d{2})-(\d{2})-(\d{4})$/,       // 24-01-2025
        /^(\d{2})\.(\d{2})\.(\d{4})$/,     // 24.01.2025
        /^(\d{4})\/(\d{2})\/(\d{2})$/,     // 2025/01/24
        /^(\d{2})\s([A-Za-z]+)\s(\d{4})$/, // 24 Jan 2025
        /^([A-Za-z]+)\s(\d{2}),\s?(\d{4})$/ // Jan 24, 2025
    ];

    for (let f of formats) {
        const match = dateStr.match(f);
        if (!match) continue;

        // Format types
        if (f === formats[0] || f === formats[1] || f === formats[2]) {
            return { day: +match[1], month: +match[2], year: +match[3] };
        }
        if (f === formats[3]) {
            return { year: +match[1], month: +match[2], day: +match[3] };
        }
        if (f === formats[4]) {
            return { day: +match[1], month: monthToNumber(match[2]), year: +match[3] };
        }
        if (f === formats[5]) {
            return { month: monthToNumber(match[1]), day: +match[2], year: +match[3] };
        }
    }

    return null;
}


/** Convert "Jan", "January" → 1 */
function monthToNumber(m) {
    const months = {
        jan: 1, january: 1,
        feb: 2, february: 2,
        mar: 3, march: 3,
        apr: 4, april: 4,
        may: 5,
        jun: 6, june: 6,
        jul: 7, july: 7,
        aug: 8, august: 8,
        sep: 9, sept: 9, september: 9,
        oct: 10, october: 10,
        nov: 11, november: 11,
        dec: 12, december: 12,
    };
    return months[m.toLowerCase()] || null;
}


/** -------------------------------
 * UPI TIME PARSER (ALL FORMATS)
 * Supports:
 *  - 10:42 AM
 *  - 10:42AM
 *  - 22:30
 *  - 10.42 PM
 *  - 10-42 am
 *  - 10:42:10
 ----------------------------------*/
function parseUPITime(timeStr) {
    let str = timeStr.toLowerCase();

    // Replace separators
    str = str.replace(/-/g, ":").replace(/\./g, ":");

    // Format 1: HH:MM AM/PM
    let m = str.match(/^(\d{1,2}):(\d{2})(?:\:(\d{2}))?\s?(am|pm)$/);
    if (m) {
        let h = +m[1];
        let min = +m[2];
        let sec = m[3] ? +m[3] : 0;

        if (m[4] === "pm" && h !== 12) h += 12;
        if (m[4] === "am" && h === 12) h = 0;

        return { hour: h, minute: min, second: sec };
    }

    // Format 2: 24-hour HH:MM(:SS)
    m = str.match(/^(\d{1,2}):(\d{2})(?:\:(\d{2}))?$/);
    if (m) {
        return { hour: +m[1], minute: +m[2], second: m[3] ? +m[3] : 0 };
    }

    return null;
}
