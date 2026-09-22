import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/location')({
  component: LocationRoute,
})

function LocationRoute() {
  return <Outlet />
}


