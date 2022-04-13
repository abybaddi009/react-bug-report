# React 18 - Bug showcase

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) to showcase bugs.

## Available Scripts

In the project directory, you can run:
### `npm install`

Installs all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Bug reports

### 1. Cannot add child "foo" to parent "bar" because parent node was not found in the Store.

#### Steps to reproduce

1. Install all dependencies
2. Run the project with `npm start`
3. Navigate to http://localhost:3000/login
4. Enter any number into 'phone number' and click on 'GET OTP'.
5. Enter any number into the text boxes and click on 'SIGN IN'.
6. Allow access to location.
7. Check the Dev Tools for the error

### 2. Cannot remove node "foo" because no matching node was found in the Store.

#### Steps to reproduce

1. Install all dependencies
2. Run the project with `npm start`
3. Navigate to http://localhost:3000/login
4. Enter any number into 'phone number' and click on 'GET OTP'.
5. Enter any number into the text boxes and click on 'SIGN IN'.
6. Allow access to location.
7. Check the Dev Tools for the error
8. Dismiss the error on the Dev Tools and now click on the avatar cirle on the top right corner.
9. Click on 'Profile'. The browser should navigate to http://localhost:3000/profile
10. Check the Dev Tools for the error.
