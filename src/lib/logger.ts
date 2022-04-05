export function log(message: any) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  console.log(message);
}
