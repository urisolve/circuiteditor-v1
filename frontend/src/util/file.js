export function readJsonFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      const json = JSON.parse(text);

      resolve(json);
    };

    reader.onerror = reject;

    reader.readAsText(file);
  });
}
