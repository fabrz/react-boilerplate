# A Boilerplate for React & Redux projects

## Assets

The `assets` folder will contain the following:

* css
* fonts
* img
* react

### Css

The `css` within the `assets` folder will contain global css. Note that React discourages the usage of global css but I found useful to have a global configuration for `typography & fonts`, `normalize` and `breakpoints`.

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



