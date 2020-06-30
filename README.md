## Bó Front End Programming Challenge

So we can see how you’d fit in as our new front end developer,  we’d like to see how you tackle new challenges.

*Note: This task should take approximately 2 - 4 hours. However, you have up to 24hrs after you fork the repo to submit your work.*

### Preparation

Before getting started we recommend that you have:

- Your favourite computer and development tools / IDE to hand;
- A few hours of uninterrupted time ahead of you;
- Access to the internet;
- A mug of hot coffee (or tea, if you prefer!).

### For this challenge, you can use:

- React or React Native;
- Any other combination of tools and techniques you like;
- The internet, including Google, Stackoverflow etc.

And do feel free to ask us any general questions you might have.

## The Challenge

Good news! - you've been asked to develop a prototype for a new digital banking app.

The app will ultimately allow users to trade "Bócoin"; a new crypto-currency (Currency Symbol: Bø) developed by an innovate FinTech startup.

The backend team have already developed a simple API to build your app against. Your remit is to create a simple app that will:

1. Demonstrate to internal stakeholders what a UI for the new app might look like; and
2. Provide a starting-point technical foundation upon which the full-scale app could potentially develop.

#### Requirements:

The must-have feature requirements of the app are:

1. To display an account homepage which includes:
   a. The Bócoin transaction list; and
   b. Total Bócoin balance
2. The ability to "add Bócoin" to the account

#### Setup:

1. Install Docker (unless you have it already!)
2. Install Postman (unless you have it already!)
3. Get a locally running copy of the API:

`docker run -it -p 8080:8081 bochallenges/bocoin-api`

4. Check the API is running on your machine using Postman to submit a `GET` request to:

`http://localhost:8080/transactions`

5. You should receive a list of transactions back from the API
6. To add a transaction, send a matching single transaction payload to the API transactions end point using `POST`

#### Doing your work:

1. Fork this repository on Github;
2. Create a simple app to fulfil the requirements described above within your forked repo;
3. Commit and Push your code to your new repository;
4. Send a pull request to this repo;
5. Your code will be reviewed by one of our senior technical front end team and we will get back to you.

If you wish to supply instructions on how to run or understand the construction of your app, then please provide those in a new README.md file within a docs folder.

If you can provide a link to view or download a demo of your app to go along with your code, then all the better.

### For bonus points:

If you find the task above easy, then feel free to improve your app. Here are some ideas:

- Allow funds to be withdrawn as well as added;
- Add categorisation / re-categorisation of transactions;
- Allow the user to search or filter their transactions.

### Any questions or issues?

Please just ask us. A curious and questioning mind is a good one!

Good luck and thanks for taking on this challenge!

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

Enhancements:
=============
* (DONE) SVGs
* (DONE) React hooks
* (DONE) WalletScreen refactor interaction 
* (DONE) Extract functions out of scope to prevent rerenders
* Alphabetize
* Redux hooks
* Hooks typescript
* Update npm
* Thunks
* UTs
* Integration tests
* Test hooks
* Test sagas
* Test selectors
* Test sagas