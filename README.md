# myGymApp

Technical Details

I made this app because I love the gym, so I mixed something useful with something I enjoy. It lets me track my workouts easily, add exercises, set reps, and see my progress. I built everything on the homepage with functional modals, except for the "Workout History" section, which is a separate page. It's mobile-friendly, so it works anywhere. It keeps things simple and intuitive while still letting users track their workouts, add exercises, and leave comments all in one place.

Backend

For the backend, I used Node.js to set everything up. I connected it with Apollo Server for GraphQL, which helps manage data requests in a flexible way.
The server runs on Express.js, making it easy to handle routes and middleware. The data is stored in MongoDB, which is a NoSQL database, i use Mongoose to make working with the database easier.
For real-time features, I added Socket.IO to ensure that when a user adds a new set with an exercise, it updates instantly on the display. This way, the user gets immediate feedback on what was added.
In short, the backend is built to be fast, flexible, and able to handle real-time communication.

Frotend

Setting up the frontend was a bit easier compared to the backend. I used React with TypeScript, which helped keep things organized and type-safe. For styling, I went with Bootstrap and some inline styling. I also added Zustand for state management, mainly to handle things like modals smoothly. Even though the app is small, I included lazy loading to optimize performance a bit.
