# quick-devtools-for-react

> [Document] (https://lamborui.github.io/quick-devtools-for-react/#/README)

> Refactored from [quick-website-4rantd](https://github.com/BigerFront/quick-website-4rantd)

> This boilerplate can be used for single-page or multi-page app development can also be used for plug-in development

#### This boilerplate Integrate libraries

> This boilerplate Integrate the following dependent libraries

- React: react >=17.x & redux >= 4.1.x
- Router: react-router>= 6.2.x (not support v5 withRouter)
- Internationalization : i18next
- UI: antd-mobile >= 5

## The boilerplate Usage

> Clone project into your workspace

```bash
git clone  https://github.com/lamborui/quick-devtools-for-react.git <your project name> && cd <your project name>
yarn install
```

**Notice**

- For plug-in development: Make sure the manifest.json file at src/ or Modify webpack config file [ci/webpack/manifest-transform.js]

#### Local env config

> Ensure your local configuration is more secure,you can set variables into config/.env.\*

---

## Quick DevTools Commands Usage

> Required Dependencies:

- yargs
- yarn
- dot-env
- webpack5

### Quick DevTools Settings

> Configration file: ci/quickdev/qk-setting.js

- addonMode: false [single page App];true [multi-page app or extension]
- i18nextEnabled: Whether to integrate i18next international configuration
- allPages: when addonMode =true , check sub module list

---

## Quickly generate source code

> yarn gen-view <options> : Generate `traditional class` react module source code

![](https://github.com/lamborui/quick-devtools-for-react/blob/main/docs/assets/img/gen-view-commands.png)

> yarn gen-func <options> : Generate `hook function` react module source code <recommend>

![](https://github.com/lamborui/quick-devtools-for-react/blob/main/docs/assets/img/gen-func-commands.png)

> yarn gen-store <options> : create an redux state module

![](https://github.com/lamborui/quick-devtools-for-react/blob/main/docs/assets/img/gen-store-commands.png)
