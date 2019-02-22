process.env.PORT = process.env.PORT || 3000;

process.env.TOKEN_EXPIRES = 60 * 60 * 24 * 30;
process.env.TOKEN_SECRET = process.env.TOKEN_SECRET || 'this-is-dev-secret';

process.env.GOOGLE_CLIENT_ID = '224936269276-cdl43i379ijvlv9nr9p2r7l06gqbirbu.apps.googleusercontent.com';