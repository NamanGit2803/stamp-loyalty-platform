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

  const date = new Date(utcDateInput);
  const now = new Date();

  const diffMs = now - date;

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffDay = Math.floor((startOfToday - startOfDate) / (1000 * 60 * 60 * 24));

  if (diffSec < 60) return "Just now";

  if (diffMin < 60) return diffMin + " min ago";

  if (diffHour < 24 && diffDay === 0)
    return diffHour + " hour" + (diffHour > 1 ? "s" : "") + " ago";

  if (diffDay === 1) {
    const time = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `Yesterday at ${time}`;
  }

  const datePart = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div>{datePart}</div>
      <div>{timePart}</div>
    </>
  );
}



