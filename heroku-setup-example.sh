# 1. Login to Heroku (if not already)
heroku login

# 2. Create a new Heroku app (replace with your desired app name)
heroku create your-app-name

# 3. Set the remote explicitly (optional, but good practice)
heroku git:remote -a your-app-name

# 4. Set Heroku buildpack to Node.js (important if it's not auto-detected)
heroku buildpacks:set heroku/nodejs

# 5. Create a Procfile to tell Heroku how to run your app
## optional in ssome cases
echo "web: npm run start:prod" > Procfile

# 6. Commit any pending changes
git add .
git commit -m "Prepare for Heroku deployment"

# 7. Push to Heroku (this builds and deploys your app)
git push heroku main

# 8. Set required environment variables (from .env.production)
heroku config:set ENV=production
heroku config:set BASE_URL=https://your-app-name.herokuapp.com
heroku config:set DATABASE_URL="file:./prod.db"

# 9. Remove PORT if previously set (Heroku provides it automatically)
heroku config:unset PORT

# 10. Generate Prisma client
npx prisma generate

# 11. Push schema to SQLite database (ensure schema is in place)
npx prisma db push

# 12. Open the deployed app in browser
heroku open
