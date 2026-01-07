/**
 * Validate screenshot date + time independently,
 * supporting all UPI app variations.
 */
export function validateUPIScreenshotTime(dateStr, timeStr) {
    if (!dateStr || !timeStr) {
        return { valid: false, reason: "invalid_date_or_time" };
    }

    // Normalize input
    dateStr = dateStr.trim().replace(/,/g, "");
    timeStr = timeStr.trim().replace(/\./g, ":").replace(/-/g, ":");

    const parsedTime = parseUPITime(timeStr);
    if (!parsedTime) {
        return { valid: false, reason: "invalid_time_format" };
    }

    const now = new Date();

    // ---- DATE VALIDATION (DATE ONLY) ----
    const screenshotDate = stripTime(new Date(dateStr));
    const today = stripTime(now);

    if (screenshotDate < today) {
        return { valid: false, reason: "old_screenshot_date" };
    }

    if (screenshotDate > today) {
        return { valid: false, reason: "future_screenshot_date" };
    }

    // ---- TIME VALIDATION (PAST 15 MIN ONLY) ----
    if (!isWithinLast15Minutes(parsedTime)) {
        return { valid: false, reason: "time_limit_end" };
    }

    // ---- COMBINE DATE + TIME ----
    const finalDateTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        parsedTime.hour,
        parsedTime.minute,
        parsedTime.second || 0,
        0
    );

    return {
        valid: true,
        dateTime: finalDateTime,
    };
}

/** -------------------------------
 * Remove time from date
 ----------------------------------*/
function stripTime(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** -------------------------------
 * UPI TIME PARSER (ALL FORMATS)
 ----------------------------------*/
function parseUPITime(timeStr) {
    let str = timeStr.toLowerCase();
    str = str.replace(/-/g, ":").replace(/\./g, ":");

    // HH:MM(:SS) AM/PM
    let m = str.match(/^(\d{1,2}):(\d{2})(?:\:(\d{2}))?\s?(am|pm)$/);
    if (m) {
        let h = +m[1];
        const min = +m[2];
        const sec = m[3] ? +m[3] : 0;

        if (m[4] === "pm" && h !== 12) h += 12;
        if (m[4] === "am" && h === 12) h = 0;

        return { hour: h, minute: min, second: sec };
    }

    // 24-hour HH:MM(:SS)
    m = str.match(/^(\d{1,2}):(\d{2})(?:\:(\d{2}))?$/);
    if (m) {
        return {
            hour: +m[1],
            minute: +m[2],
            second: m[3] ? +m[3] : 0,
        };
    }

    return null;
}

/** -------------------------------
 * Check past 15 minutes only
 ----------------------------------*/
function isWithinLast15Minutes(time) {
    const now = new Date();

    const nowSeconds =
        now.getHours() * 3600 +
        now.getMinutes() * 60 +
        now.getSeconds();

    const givenSeconds =
        time.hour * 3600 +
        time.minute * 60 +
        (time.second || 0);

    const secondsInDay = 24 * 3600;

    let diff = nowSeconds - givenSeconds;

    // midnight crossing
    if (diff < 0) diff += secondsInDay;

    return diff >= 0 && diff <= 15 * 60;
}
