# Skylens - How To Run

## Step 1 - Add your MongoDB URI
Go to: skylens-final/server/
Create a file called: .env
Paste this inside it (replace with your actual URI):
MONGO_URI=mongodb://misbamehmood3:misbahdatabase4@ac-dchqg6r-shard-00-00.j2itwyh.mongodb.net:27017,ac-dchqg6r-shard-00-01.j2itwyh.mongodb.net:27017,ac-dchqg6r-shard-00-02.j2itwyh.mongodb.net:27017/?ssl=true&replicaSet=atlas-4yemf8-shard-0&authSource=admin&appName=Cluster0

## Step 2 - Open TWO terminals in VS Code

### Terminal 1 (Backend):
cd skylens-final/server
npm run dev

You should see:
MongoDB connected successfully!
Server running on http://localhost:5000

### Terminal 2 (Frontend):
cd skylens-final
npm run dev

You should see:
VITE ready on http://localhost:8080

## Step 3 - Open browser
Go to: http://localhost:8080
Upload any night sky image and it will detect the constellation!
