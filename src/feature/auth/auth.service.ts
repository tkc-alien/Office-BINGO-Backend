import { Injectable } from "@nestjs/common";
import admin from "firebase-admin";

@Injectable()
export class AuthService {
  /**
   * Firebase認証
   * @param token Bearerトークン
   * @returns FirebaseUID
   */
  async verify(token: string): Promise<string> {
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded.uid;
  }
}
