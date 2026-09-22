import { createFileRoute } from '@tanstack/react-router'
import { LocationCreate } from '@/features/location/location-new/location-new'

export const Route = createFileRoute('/location/$locationId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { locationId } = Route.useParams()

  return <LocationCreate locationId={locationId} />
}
