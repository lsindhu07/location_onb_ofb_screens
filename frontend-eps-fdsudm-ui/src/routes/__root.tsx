import * as React from 'react'
import { Outlet, createRootRoute, useMatches } from '@tanstack/react-router'
import { NavList, RouteMap, type RouteData } from '@/models/nav-item';
import { ContainerLayout, PageHeader } from '@emorg-prd/standard-react';
import { HeaderWrapper, FooterWrapper } from '@/components/common/header-wrapper/header-wrapper';
import { AppProviders } from '@/components/common/provide-composer/provide-composer';

export const Route = createRootRoute({
    component: RootComponent,
})
function RootComponent() {
    const matches = useMatches();
    const activeRouteParam = matches[matches.length - 1]?.fullPath ?? "/";
    return (
        <React.Fragment>
            <AppProviders>
                <div className="app-shell">
                    {activeRouteParam !== "/" && (
                        <HeaderWrapper navItems={NavList} />
                    )}
                    <div className={activeRouteParam === "/" ? undefined : "layout-body"}>
                        <div className="main-content">
                            <Outlet />
                        </div>
                    </div>
                    <div className="layout-footer">
                        <FooterWrapper />
                    </div>
                </div>
            </AppProviders>
        </React.Fragment>
    )
}
