export function formatBytes(bytes: number): string {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes === 0) return "0 Byte";

  const i = parseInt(
    Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
    10
  );

  const formattedValue = (bytes / Math.pow(1024, i)).toFixed(2);

  return formattedValue + " " + sizes[i];
}
