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



