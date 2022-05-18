# Exporting to URIsolve

> **Note:** This feature is currently pending on URIsolve.

To export the circuit, this app sends a POST request to `https://urisolve.pt/app/circuit/load` with the following data structure:

```ts
interface ExportData {
  email: string;
  image: string;
  netlist: string;
  schematic: Schematic;
}
```

Where:

- `email` is the email of the user;
- `image` is a **base64** URL of the circuit image;
- `netlist` is the **string** that represents that netlist fo the circuit;
- `schematic` is a **JSON object** that represents the circuit itself - structure defined in [Schematic.md](./Schematic.md) file.
