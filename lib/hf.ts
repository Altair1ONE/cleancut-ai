export function getHfHostFromSpace(space: string) {
  const [owner, repo] = space.split("/");
  if (!owner || !repo) return null;
  return `https://${owner.toLowerCase()}-${repo.toLowerCase()}.hf.space`;
}

export function getBgApiUrl() {
  const space = process.env.NEXT_PUBLIC_BG_SPACE;
  if (!space) return null;
  const host = getHfHostFromSpace(space);
  if (!host) return null;
  return `${host}/run/predict`;
}
