import LocationList from '@/features/location'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/location/')({
  component: LocationList,
})
