# auth-api
- first Changes

## Database setup

Create a `.env` file in the project root and set `MONGO_URI` to your MongoDB
connection string. For a local MongoDB server, you can use:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/auth-api
```

Start MongoDB before running `npm run dev` or `npm start`. The API waits for a
successful database connection before it starts listening and logs the MongoDB
host when connected. If the connection fails, startup reports the error and
does not start the API.
