<div align='center'>

# You-space dashboard

![you-space](https://github.com/you-space/docs/blob/main/docs/.vuepress/public/logo-circle-200x200.png?raw=true)

Vue app used to manage a you-space instance

[npm](https://www.npmjs.com/package/@you-space/dashboard) - [you-space](https://github.com/you-space/you-space) - [twitter](https://twitter.com/you_space_cms)

</div>

## Getting started

1 - Install the dependencies with `npm install`

2 - Start a development server with `npm run dev`

3 - Check the app in http://localhost:3000

## Proxy mode

By default in development mode the app will run a fake api server using miragejs package, but you can change this and use a proxy to a real you-space instance.

To use the proxy you only need to define theses variables

```bash
API_PROXY_URL=http://localhost:3333 # url for api
VITE_USE_PROXY=true # tell the app to use a proxy url
```

## You-space link

1 - Make sure to build the static files with `npm run build`

2 - And in you-space instance import and connect the dashboard to a route

```js
import Route from "@ioc:Adonis/Core/Route";
import { createDashboard } from "@you-space/dashboard";

// create a spa with base-path = ys-admin
const dashboard = createDashboard("ys-admin");

Route.get("ys-admin", dashboard.render);
Route.get("ys-admin/*", dashboard.render);
```

This will render the spa in `/ys-admin` route
