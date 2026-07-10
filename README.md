# Api-Gateway — ประตูทางเข้า

เว็บยิงมาที่นี่ที่เดียว แล้ว gateway ส่งต่อให้ service อื่น

## ส่งต่อไปไหน

- `/auth/*` → Auth (port 3100)
- `/products`, `/cart`, `/orders`, `/payments` → Commerce (port 3000)
- `/notifications/*` → Notification (port 3001)

## ใช้อะไรทำ

NestJS

## วิธีรัน

```bash
yarn install
yarn start:dev
```
