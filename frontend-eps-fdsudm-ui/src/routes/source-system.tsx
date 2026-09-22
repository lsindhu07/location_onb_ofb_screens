import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/source-system')({
  component: SourceSystemPage,
})

function SourceSystemPage() {
  return <div>Source System page - coming soon.</div>
}
