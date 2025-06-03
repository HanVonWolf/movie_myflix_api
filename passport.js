const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

/**
 * Passport Local Strategy for user login
 * @param {string} username - input field for request body
 * @param {string} password - input field for request body
 * @returns @function callback - validated user or text response for failed validation
 */  
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username', // Ensure this matches the field name in your request body
      passwordField: 'password', // Ensure this matches the field name in your request body
    },
    async (username, password, callback) => {
      // --- Add Logs Here ---

      // Log 1: Confirm the strategy function is entered and show received credentials
      console.log('LocalStrategy: Attempting authentication for username:', username);
      // console.log('LocalStrategy: Received password:', password); // <-- Be cautious logging passwords in production!

      // Log 2: Indicate that we are about to search for the user
      console.log('LocalStrategy: Searching for user:', username);

      await Users.findOne({ Username: username }) // <-- Ensure 'Username' matches your schema field name exactly
      .then((user) => {
        // Log 3: Show the result of the findOne query
        console.log('LocalStrategy: FindOne result:', user ? 'User found' : 'User not found');

        if (!user) {
          // Log 4: User not found path
          console.log('LocalStrategy: User not found. Calling callback(null, false).');
          return callback(null, false, {
            message: 'Incorrect username or password.',
          });
        }

        // Log 5: User found, attempting password validation
        console.log('LocalStrategy: User found. Validating password...');
        const isMatch = user.validatePassword(password); // Call your instance method

        // Log 6: Show the result of the password validation
        console.log('LocalStrategy: Password validation result:', isMatch);

        if (!isMatch) {
          // Log 7: Password mismatch path
          console.log('LocalStrategy: Password mismatch. Calling callback(null, false).');
          return callback(null, false, { message: 'Incorrect password.' });
        }

        // Log 8: Success path
        console.log('LocalStrategy: Authentication successful. Calling callback(null, user).');
        return callback(null, user); // Success! Pass the user object to the next middleware/route handler
      })
      .catch((error) => {
        // Log 9: Any error that occurred during findOne or validatePassword
        console.error('LocalStrategy: Error during authentication process:', error); // Use console.error for errors
        return callback(error); // Pass the error to Passport
      })
    }
  )
);


/**
 * Passport JWT Strategy for user login
 * @param {object} - users data from HTTP header
 * @param {object} - users JWT key
 * @returns @function user data or error response
 */
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret' // Make sure this matches the one used for signing tokens
}, async (jwtPayload, callback) => {
    // Log 10: Confirm JWT strategy is entered and show payload
    console.log('JWTStrategy: Verifying JWT payload:', jwtPayload);

  return await Users.findById(jwtPayload._id) // Assuming your JWT payload contains the user's _id
    .then((user) => {
        // Log 11: Show result of findById
        console.log('JWTStrategy: FindById result:', user ? 'User found' : 'User not found');

        if (!user) {
             // Log 12: User not found for this JWT
             console.log('JWTStrategy: User not found for JWT. Calling callback(null, false).');
             return callback(null, false); // User not found for this token
        }
        // Log 13: User found for this JWT
        console.log('JWTStrategy: User found for JWT. Calling callback(null, user).');
        return callback(null, user); // Success
    })
    .catch((error) => {
        // Log 14: Error during findById in JWT strategy
        console.error('JWTStrategy: Error during findById:', error); // Use console.error
        return callback(error);
    });
}));