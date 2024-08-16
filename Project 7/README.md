1. To run the project, first download or git clone
2. `cd 'Project 7'`
3. `npm install` to install all dependencies
4. create a .env file by copying the exact .env.example file informations and replacing with your own informations
4. # `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` to generate the session secret
5. `npm start` to start the project
6. visit http://localhost:4000/products on your browser to see the products
7. if you want to add a new product, visit http://localhost:4000/products/add to add your new product and its image before referring back to step 6 to view the product

NOTE: No CSS was used as this is a very simple Shopping Cart project, as i was solely focused on the backend.

If you must host it on vercel, you'd need to add `vercel.json` and also an empty `.gitkeep` inside the public folder and also create an app folder and inside the app folder you create an `app.js` in order for vercel to recognise and use them. 

for more information on vercel setup, kinldy refer to their product documentation.