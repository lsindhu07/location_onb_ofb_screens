import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/site')({
  component: SitePage,
})

function SitePage() {
  return <div>Site page - coming soon.</div>
}
