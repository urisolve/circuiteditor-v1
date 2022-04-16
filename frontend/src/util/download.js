export const getHref = (content, type) =>
  `data:${type};charset=utf-8,${encodeURIComponent(content)}`;

export function download(url, fileName = 'download') {
  // Create link element
  const link = document.createElement('a');

  // Convert link into a download
  link.href = url;
  link.download = fileName;

  // Append link element to html page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up
  document.body.removeChild(link);
}
