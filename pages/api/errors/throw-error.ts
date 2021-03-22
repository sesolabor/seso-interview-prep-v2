function throwError() {
  throw new Error("throw error in handler");
}
export default async function handler(req, res) {
  throwError();
  res.status(200).json({ message: "Should not see this" });
}
