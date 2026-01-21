export async function fetcher<T = any>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // send cookies for auth
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Network response was not ok");
  }

  return res.json();
}