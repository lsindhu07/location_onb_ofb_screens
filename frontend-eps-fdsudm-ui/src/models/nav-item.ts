export interface RouteData {
  //Is text to display in Nav Bar
  label: string;
  // Page Title
  title: string;
  key: string;
  // If Page Title should have underline
  underlined: boolean;
}
export interface NavItem extends RouteData {
  url: string;
}

export const RouteMap: Record<string, RouteData> = {
  "/": {
    label: "Home",
    title: "Home",
    underlined: false,
    key: crypto.randomUUID(),
  },
  "/location": {
    label: "Location",
    title: "Location Landing",
    underlined: false,
    key: crypto.randomUUID(),
  },
  "/site": {
    label: "Site",
    title: "Site",
    underlined: false,
    key: crypto.randomUUID(),
  },
  "/source-system": {
    label: "Source System",
    title: "Source System",
    underlined: false,
    key: crypto.randomUUID(),
  },
    "/master-data": {
    label: "Master Data",
    title: "Master Data",
    underlined: false,
    key: crypto.randomUUID(),
  },
} as const;
export type RouteParam = Record<string, RouteData>;

export const NavList: NavItem[] = Object.entries(RouteMap).map(
  ([key, value]) => {
    return { ...value, url: key };
  },
);
