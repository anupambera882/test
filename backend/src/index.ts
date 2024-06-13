import 'dotenv/config';
import express from 'express';
import { router } from './controller/index.controller';

const port = process.env.PORT || 3000;
const app = express();

router(app);

app.listen(port, () => {
  console.log(`Server ready at: http://localhost:${port}`);
});
