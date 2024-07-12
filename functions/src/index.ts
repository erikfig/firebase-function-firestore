/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

export * from "./services/users/onCreate";

export * from "./routes/users/setUser";
export * from "./routes/users/getUser";
export * from "./routes/users/getUsers";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
