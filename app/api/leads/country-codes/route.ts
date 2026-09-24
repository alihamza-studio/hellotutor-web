/** Fetch public dialling codes server-side so previews do not depend on API CORS. */
export async function GET() {
  try {
    const response = await fetch('https://api.hellotutor.me/api/leads/country-codes', {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error('Country codes unavailable');
    const result = await response.json();
    if (!result.success || !Array.isArray(result.data) || !result.data.length) {
      throw new Error('Invalid country codes');
    }
    return Response.json({ success: true, data: result.data });
  } catch {
    return Response.json({ success: false }, { status: 502 });
  }
}
