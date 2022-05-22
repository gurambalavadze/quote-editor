# Quote editor back-end project

## Environment Variables

- DATABASE_URL= mongodb url for example "mongodb://username:password@localhost:27041/quote_editor?authSource=admin"

- DATABASE_QUOTE_COLLECTION= the name of the collection which app will use to store quotes on it for example "quotes"

- DATABASE_PASS_FILE= If you want the app to read the mongodb database password from a file you should specify the address of the password file (eg. "./dbpass") and use "$password" instead of your real password in DATABASE_URL

- PORT= port of the app (eg. 4000)

- DATABASE_NAME= the name of the database which app will use to store data on mongodb (eg. "qoute_editor")

- CORS_CLIENT_HOST= url of the front-end application for cors policy for example "http://localhost:3000"

## Commands

- build: to build the app run ` yarn build` or `npm run build `
- start: to start the app run `yarn start` or `npm run start`
- debug: to start the app in debuging mode run `yarn debug` or `npm run debug`
- watch: to build the app with typescript watch mode run `yarn watch` or `npm run watch`
- startd: to start the app with nodemon run `yarn startd` or `npm startd`
