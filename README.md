Bocoin App Prototype Description
================================

In the Bocoin app prototype I’ve created I try to provide a starting point technical foundation that can be scaled into a bigger project as well as a smooth UI design.

I’ve done the main points required, without the bonus points because I thought it could lose the focus of the technologies used.

Libraries like redux, in combination with sagas and redux-forms, and axious to perform http requests, provide a framework to handle REST calls and manage the app state management with good performance.

I’ve reused certain components I’ve already created before in other projects, like toasts for error and success messages and the master layout of the transactions list. Which use React Native Animated, LayoutAnimation and PanResponder  APIs to provide a smooth UI prototype.

Also, I’ve used redux-forms, in the add transactions screen, to provide a structure which can be totally reused in any other input forms that might exist in the future app, handling synchronous and asynchronous errors in a tidy way, using validators and redirecting the errors from the API to the screen.

All this was done using typescript, prettier and husky libraries to ensure linting and unit tests run ok on each commit and push.

There were things that could have been added if there was more time, like navigation libraries to smoothly change screens, and other functionalities like logging crash reports and control events for analytics.

On the transactions backend side, the fact that the amount has to be submitted as a string can generate a fragile point in the app, with many possible errors to consider, if the business allows it, it could be good to switch it to numbers instead with a fixed precision, like 100 to represent 1.00 bocoins. And the errors could be mapped to the field that failed so that they could be properly mapped to the specific form fields using redux forms asynchronous errors.

I’m providing a link to a video to show the UI interaction as well as the synchronous and asynchronous errors management:

* [Download Bocoin App demo video from dropbox](https://www.dropbox.com/s/7x5683a9k40rpii/BocoinApp.MP4?dl=0)

To run the app just run:
* npm install
* cd ios && pod install && cd ..
* npm run ios / npm run android

To run the tests: npm run test