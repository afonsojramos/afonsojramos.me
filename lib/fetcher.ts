export default async function Fetcher(url: string) {
  const res = await fetch(url);

  return res.json();
}
