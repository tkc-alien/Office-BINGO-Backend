import { NestFactory } from "@nestjs/core";
import admin from "firebase-admin";

import { AppModule } from "@/app.module";

async function bootstrap() {
  // Firebase初期化
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });

  // App初期化
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
