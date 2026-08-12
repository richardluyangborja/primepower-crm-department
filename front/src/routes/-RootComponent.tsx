import { Outlet } from "@tanstack/react-router"
import * as React from "react"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

export default function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </React.Fragment>
  )
}
