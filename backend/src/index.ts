import 'dotenv/config';
import express, { type Express } from 'express'
import cors from 'cors';



import { clerkMiddleware } from '@clerk/express';
import { clerkWebhookHandler } from './webhooks/clerk';
// import { getEnv } from './lib/env';


const app: Express = express();
// const env = getEnv();

const rawJson = express.raw({ type: 'application/json', limit: '1mb' })

// Add this BEFORE all routes
app.use((req, _, next) => {
   console.log('📨', req.method, req.path);
   next();
});


app.post("/webhooks/clerk", rawJson, async (req, res) => {
   console.log('clerk handler done')
   try {
      await clerkWebhookHandler(req, res)
   } catch (err) {
      console.log(err)
   }
})

app.use(clerkMiddleware());
app.use(express.json());
app.use(cors());



// const publicDir = path.join(process.cwd(), 'public');
// if (fs.existsSync(publicDir)) {
//    app.use(express.static(publicDir));

//    app.get('/{*any}', (req, res, next) => {
//       if (req.method !== 'GET' && req.method !== 'HEAD') {
//          next();
//          return;
//       }
//       if (req.path.startsWith('/api') || req.path.startsWith('/webhooks')) {
//          next();
//          return;
//       }

//       res.sendFile(path.join(publicDir, 'index.html'), (err) => next(err));

//    });
// }

// app.listen(env.PORT, () => console.log('listening on port:', env.PORT))

export default app