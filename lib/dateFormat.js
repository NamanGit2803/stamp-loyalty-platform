export function FormatLastVisit(dateString, normal = false) {
  if (!dateString) return "-";

  const istDate = new Date(dateString); // auto converts to IST on your system
  const now = new Date();

  // Normalize times to midnight for day comparisons
  const dateOnly = new Date(istDate.getFullYear(), istDate.getMonth(), istDate.getDate());
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = nowOnly - dateOnly;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (normal == false) {
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;
  }

  return istDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}



export function FormatToIST(dateString) {
  const date = new Date(dateString);

  const options = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formatted = date.toLocaleString("en-IN", options);

  // Replace comma with bullet "•"
  return formatted.replace(",", " •").toUpperCase();
}




export function TimeAgoUTCtoIST(utcDateInput) {
  const utcDate = new Date(utcDateInput);

  // Convert UTC → IST (+5:30)
  const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);

  const now = new Date();
  const nowIST = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);

  const diffMs = nowIST - istDate;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  // Today cases
  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return diffMin + " min ago";
  if (diffHour < 24) return diffHour + " hour" + (diffHour > 1 ? "s" : "") + " ago";

  // Yesterday with time
  if (diffDay === 1) {
    const time = istDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `Yesterday at ${time}`;
  }

  // Older than yesterday → IST date + time
  return istDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}




