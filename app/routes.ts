import { index, layout, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  layout('./routes/auth/layout.tsx', [
    route('login', './routes/auth/login.tsx'),
    route('register', './routes/auth/register.tsx'),
  ]),
  layout('./routes/dashboard/layout.tsx', [
    route(':orgid', './routes/dashboard/dashboard.tsx', [route(':channelid', './routes/dashboard/channel.tsx')]),
  ]),
] satisfies RouteConfig;
