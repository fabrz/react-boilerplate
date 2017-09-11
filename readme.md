# A Boilerplate for React & Redux projects

# Installation & Prerequisites

Make sure you have `yarn` installed globally and your version of `node` is at least `6.9.1` and you `npm` version at least `4.0.2`.

### Configure the app using ExpressJS:

* Run make install
* Run make start. A list of available servers will appear in your terminal. Visit one of those to see the app.

### Configure the app using vagrant:

* Update your Homestead yaml file.
* Update your hosts.
* Provision you homestead.
* Run `make install` and visit the url you've setup in your yaml file.

### Watching your app:

Run `make webpack-watch`

## Assets

The `assets` folder will contain the following:

* css
* fonts
* img
* react

### Css

The `css` within the `assets` folder will contain global css. Note that React discourages the usage of global css but I found useful to have a global configuration for `typography & fonts`, `normalize` and `breakpoints`.

### React CSS Modules

The Boilerplate uses `React CSS Modules` all of the CSS you will write in a specific component will apply to that compoennt only. The global css won't be able to override or interfer with the component's css because we also make use of `classnames`.

`classnames` will append a prefix to each class name React uses. This way the global css won't override or interfer with the component's css.

### Fonts

The `fonts` folder will contain all of the fonts used across the website and they will be compiled from webpack and then modularized in our `bundle.js`.

### Images

The `images` folder will contain both, images and SVGs. Webpack will take care of the compilation.

#### Images usage

Note an SVG sprite won't be generated, please refer to the `SVG` section below to know more about it.

Import the helper in the file you wish to display the SVG:

```
import { getImage } from '../../helpers/general';
```

Use your image in the React Component:

```
<img src={getImage('./root/logo.png')} />
```

#### SVGs usage

Webpack will modularize the SVGs for you in the `bundle.js`. I wrote an helper that you can find at `./assets/react/helpers/general.js` which will get the resolved path to a specific image. In order to use an image you can use the syntax below.

Import the helper in the file you wish to display the SVG:

```
import { getImage } from '../../helpers/general';
```

Import `react-svg-inline` from the node modules:

```
import SVGInline from 'react-svg-inline';
```

Use your image in the React Component:

```
<SVGInline svg={getImage('./svg/logo.svg')} />
```

### React

In the React folder there is a lot (a lot) going on. You will find the following:

* components
* constants
* helpers
* redux
* strings
* app.js

#### Components

In here you can write your components plus `App` and `Main` folders. In `App` all of the Redux actions will be created and dispatched to the child component (Main).

`Main` includes the `Navigation` and the `Footer` components (I feel like these 2 components should stay rather than import them everytime in each component, essentially this way prevent code dusplications).

#### Creating a component

I will update the boilerplate, ideally I'd like to create a sort of component generator, `Yeoman` seems nice but I haven't had time to crack on with it.
For the time being please follow this structure:

```
ComponentName --
                |
                |--ComponentNameContainer.js
                |--ComponentName.js
                |--ComponentName.scss
```

The `ComponentNameContainer` will contain the logic of your component (if applicable), for instance the container you would make API calls, updating props.

The `ComponentName.js` will be the view of your component and won't contain strong logic; it'll receive props, data from API response (All of the data already manipulated from its container).

#### Constants

Constants will contain mainly exportable/importable variables.

#### Helpers

Helpers will contain exportable/importable methods and configurations, as in:

* API Configuration
* API methods
* Auth methods
* Mapped API responses
* Generic helpers (String manipulations, Analytics)

### Redux

The Redux folder is pretty complicated. Redux is a state container for JS Application. Why we use it? Because it's very helpful when you want 2 separate components to communicate; think at Redux like a huge container of React states, usable from any component at any level.

3 folders and 1 file here:

* actions
* data
* reducers
* store.js

The `action` is the method you call to update a React state.

The `data` the React state that the `action` will change.

The `reducer` calculates the next state based on the previous state and the dispatched action.


Example of `action`:

```
export function toggleNavigationState(status) {
  return {
    status,
    type: 'TOGGLE_NAVIGATION',
  };
}
```

Here `status` is the value of the next state. Let's say status is `false` by default. If you `this.props.toggleNavigationStatus(true)`, `true` will be the new state.

`Type` is the action type being used from the reducer.

Example of `data`:

```
export default {
  status: false,
};
```

Here `status` is the default state, when the application start, the React status will be `false`.

Example of `reducer`:

```
import update from 'immutability-helper';

export default function toggleNavigationReducer(state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_NAVIGATION':
      return update(state, {
        status: { $set: action.status },
      });
    default:
      return state;
  }
}
```

As you can see, this `switch` returns an object based on the action type (TOGGLE_NAVIGATION).

### Strings

The string system will allow you to write some copy (used in the website) in JSON files. There is an helper function that will take care of abstracting the strings from the JSON files for you. You can reference the string in your component so there won't be any `hardcoded` strings.

Example:

This is the string you want to pull thru the fron-end.
```
{
    "string": "translated string"
}
```

Head to `./assets/react/helpers/strings.js` and import the json file at the top like this:

```
import general from '../strings/general.json';
```

Set the string, in the same file, right at the bottom like this:

```
setString('general', general);
```

Use the string somewhere in your component using the helper function (rembember to import the helper function in your React component)

```
import { getString } from '../helpers/strings';
```

```
{getString('general.string')}
```

The above code will output some text:

```
translated string
```

### React i18n Internationalisation

You can translate your App making use of `react-intl`. All you need to do is:

* Add a new locale in `assets/react/i18n.js`
* Add a new JSON file in `assets/react/translations`
* Create a `messages/index.js` within the component you wish to translate and reference the strings you want to translate like so:

```
import { defineMessages } from 'react-intl';

export default defineMessages({
  page: {
    id: 'boilerplate.components.Navigation.item.page',
    defaultMessage: 'Page',
  },
});
```
* Translate the strings in the component:

```
import { FormattedMessage } from 'react-intl';
import messages from './messages';

<FormattedMessage {...messages.page} />
```

Note: If you do not need this plugin you can remove the `<IntlProvider>` component from the React Router Tree in `assets/react/app.js`

### Router

Routing our App is fairly easy. All the magic happens in `./assets/react/app.js`.

```
render((
  <Provider store={store}>
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingPageContainer} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
```

The Provider will host the Redux Store.

#### Adding a new route

```
<Route path="/" component={ComponentNameContainer} />
```

All of your new routes will be placed within the main Route (`App`).

### ESlint, SASSlint and generic configurations

In order to keep our project tidy and well readable I'd use:

* .editorcofig (it defines some basic rules for sass, php, js, json etc etc)
* .eslintrc (it uses the AirBnb rules, it throws errors when writing ES6 code in your sublime file and when compiling with webpack)
* .stylelintrc (it uses the AirBnb rules, it throws errors when writing sass in your sublime file and when compiling with webpack)

# Contribute

Please create a PR towards `master` if you wish to contribute and improving the boilerplate.

# Testing your app

More to come ...
