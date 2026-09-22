import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/master-data')({
  component: MasterDataPage,
})

function MasterDataPage() {
  return <div>Master Data page - coming soon.</div>
}
