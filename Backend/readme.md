# Want to add something.
 . API request → Access token checked (no DB call).

. Access token expired → Client sends refresh token → Server checks Redis/DB → Issues new access token.

. Logout → Delete refresh token from Redis/DB → Clear cookies.


Access token:
Contains user info (like userId, roles, etc.).
Used for every request to your API.
Very short expiry (e.g., 10–15 minutes).
No DB lookup needed — just verify signature and expiry.

Refresh token:
Contains only a minimal identifier (often just userId or a sessionId).
Longer expiry (days/weeks).
Stored securely in a DB or cache (SQL, Redis, etc.).
On logout → you delete/revoke it from DB/Redis.
On refresh → you check if it still exists in DB/Redis, then issue a new access token.