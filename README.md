# repository-183

# Installation and setup

Clone this repo to your local machine and install the requirements:

    npm install

Now create a database on your local server called
`quizlive`. Now create the database schema and initial data:

    ./bootstrap.sh

And now run the server app:

    node server.js

and open the client app:

    http://localhost:5000

From the home screen click "Register". Enter your name and email and click `Register`. The first user
is automatically marked as the adminstrator. Click the _Open Admin Page_ link on the quiz page.

On the admin page, use the following controls
 
`Next Question` - queue up the next quiz question
`Restart Quiz` - erase all current scores and start over

As you click `Next Question` a new question will appear automatically for anyone running
the app. Additional users can register for the app and play at the same time. Users accumulate
points by answering questions correctly, with a bonus awarded to the person who answers
correctly first.


# Deploy to Heroku

When you are ready to share the app, just create a new Heroku app, provision a Postgres
database addon for your app, and then deploy the code. After you deploy you should
bootstrap the database:

    $ heroku run ./bootstrap.sh

# Understanding the code

The components of the application are organized as follows:

| component | folder |
|------------|---------|
| client app | client |
| ..app code | client/js |
| ..html templates | client/templates |
| ..ionic/angular frameworks | client/lib | 
|            |        |
| express app | server.js, server/* |
| ..db migrations | server/migrations |    
| ..question list | server/load_question.js |
| admin app  | admin  |

## Front-end app

The front-end app is an AngularJS single page application. Thus all the HTML and Javascripted
are loaded and run in a single WebView control on the phone. Different screens and navigation
are all drawn in the browser DOM.

Angular

# Debugging

Install `node-debug` to use the Chrome debugger with Node.js:

    $ npm install node-debug

And to use, just run with `node-debugger`. After the Chrome debugger opens, make sure to click `Run`
so the server starts:

    $ node-debug server.js


# Building a native app

To bundle your client app as a native mobile app, you can use the Cordova tool. Note that to build
a native app you will need the corresponding native build tools. So for iOS apps you will need
Xcode installed, and for Android apps you will need to have the Android SDK installed.

Install Cordova:

    $ sudo npm install -g cordova

Install an application simulator:

    $ sudo npm install -g ios-sim

Initialize the wrapper:

    $ mkdir wrapper
    $ cd wrapper
    $ cordova create . QuizLive
    $ rm -rf www
    $ ln -s ../client www

Now add one or more platform targets:

    $ cordova platform add ios
    $ cordova platform add android

Now build the native app:

    $ cordova compile ios

And run in the emulator:

    $ cordova run --emulator


# Contact

Carlos Rojas <ing.carlosandresrojas@gmail.com>

# License

See LICENSE. This code is available under the MIT license.

