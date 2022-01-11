import { pathToRegexp, match, compile } from 'path-to-regexp';
// @ts-ignore
import { history } from 'umi';
import { LocationDescriptor, HistoryLocation, isPlainObject } from 'handie-react-starter-antd';

let allRoutes: Record<string, any>[] = [];
let routeMap: Record<string, any> = {};

function resolveRouteMap(routes: any[], map: Record<string, any>): Record<string, any> {
  return routes.reduce((prev, cur) => {
    const acc = { ...prev, [cur.name || cur.path]: cur };

    return (cur.routes || []).length > 0 ? resolveRouteMap(cur.routes, acc) : acc;
  }, map);
}

function setRoutes(routes: Record<string, any>[]): void {
  allRoutes = routes;
  routeMap = resolveRouteMap(allRoutes, {});
}

function findRouteDeeply(pathname: string, routes: any[] = allRoutes) {
  let route;

  for (let i = 0; i < routes.length; i++) {
    const r = routes[i];
    const dynamicMatched = pathToRegexp(r.path).exec(pathname);

    if (dynamicMatched || r.path === pathname) {
      route = r;
      break;
    }

    if ((r.routes || []).length === 0) {
      continue;
    }

    route = findRouteDeeply(pathname, r.routes);

    if (route) {
      break;
    }
  }

  return route;
}

function getLocation(): LocationDescriptor {
  const {
    location: { pathname, hash, query = {} },
  } = history;

  const route = findRouteDeeply(pathname);
  const { params = {} } = match(route.path, { decode: decodeURIComponent })(pathname) || {};

  return {
    name: route.name,
    path: pathname,
    rawPath: route.path,
    hash,
    query,
    params,
  };
}

function resolveHistoryParams(location: HistoryLocation): any {
  let resolved: any;

  if (isPlainObject(location)) {
    const { name, path, query, params = {} } = location as LocationDescriptor;

    resolved = {
      pathname: compile(name ? routeMap[name].path : path)(params),
      query,
      state: params,
    };
  } else {
    resolved = { pathname: location as string };
  }

  return resolved;
}

export { setRoutes, findRouteDeeply, getLocation, resolveHistoryParams };
