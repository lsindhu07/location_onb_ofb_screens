import { createFileRoute } from '@tanstack/react-router'
import { LocationCreate } from '@/features/location/location-new/location-new'

export const Route = createFileRoute('/location/create')({
  component: () => <LocationCreate />,
})
