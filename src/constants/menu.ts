import { routeNames, routePaths } from '@/constants/routesData';

export interface MenuLink {
  text: string;
  path: string;
  name: string;
}

export const mainMenu: MenuLink[] = [
  { text: 'Главная', path: routePaths.home, name: routeNames.home },
  { text: 'Фильмы', path: routePaths.movies, name: routeNames.movies },
  { text: 'Сериалы', path: routePaths.tv, name: routeNames.tv },
  { text: 'Подборки', path: routePaths.collections, name: routeNames.collections },
];
