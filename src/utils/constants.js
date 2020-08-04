export const ENDPOINT_BASE = `http${
  !process.env.NODE_ENV || process.env.NODE_ENV === "development" ? "" : "s"
}://api.cafci.org.ar`;
