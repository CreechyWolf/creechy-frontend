export async function trackVisitor(apiUrl: string) {
  try {
    await fetch(`${apiUrl}/visitor/track`, {
      method: "POST",
      credentials: "include",
    });
  } catch (e) {
    console.warn("Visitor tracking failed:", e);
  }
}