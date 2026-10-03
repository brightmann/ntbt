import Image from 'next/image'
import { mdxComponents } from '@/src/content/compiled/index.js'

const sharedComponents = {
  Image
}

// Precompiled at build time by scripts/compile-mdx.mjs.
// No `new Function()` — Cloudflare Workers forbids dynamic code generation.
const MDXContent = ({ slug, components, ...props }) => {
  const Component = mdxComponents[slug]
  if (!Component) {
    console.warn(`No precompiled MDX component for slug: ${slug}`)
    return null
  }
  return <Component components={{ ...sharedComponents, ...components }} {...props} />
}

export default MDXContent
