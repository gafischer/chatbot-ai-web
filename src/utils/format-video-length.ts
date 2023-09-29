export function formatVideoLength(durationInSeconds: number): string {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  const formattedHours = hours > 0 ? hours.toString().padStart(2, "0") : "";
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  const result = `${formattedMinutes}:${formattedSeconds}`;

  return formattedHours.length > 0 ? `${formattedHours}:${result}` : result;
}
