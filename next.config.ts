import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // A stray package-lock.json higher up the tree would otherwise be picked as the root.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
