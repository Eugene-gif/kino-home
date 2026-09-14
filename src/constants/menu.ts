import { routeNames, routePaths } from '@/constants/routesData';

export interface MenuLinkType {
  text: string;
  path: string;
  name: string;
  isAuth?: boolean;
}

const menuLink: MenuLinkType[] = [
  { text: 'Главная', path: routePaths.home, name: routeNames.home },
  { text: 'Фильмы', path: routePaths.movies, name: routeNames.movies },
  { text: 'Сериалы', path: routePaths.tv, name: routeNames.tv },
  { text: 'Избранное', path: routePaths.favorite, name: routeNames.favorite, isAuth: true },
];

export { menuLink };
