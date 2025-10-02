This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
📌 Endpoints

Categories

GET /categories → Lấy tất cả categories

POST /categories → Tạo category mới

GET /categories/{id} → Lấy thông tin category theo ID

PUT /categories/{id} → Cập nhật category

DELETE /categories/{id} → Xóa category

Lessons

GET /lessons → Lấy tất cả lessons

POST /lessons → Tạo lesson mới

GET /lessons/category/{categoryId} → Lấy danh sách lessons theo category

GET /lessons/{id} → Lấy thông tin lesson

PUT /lessons/{id} → Cập nhật lesson

DELETE /lessons/{id} → Xóa lesson

Uploads

GET /midi/list → Danh sách file MIDI

POST /upload/midi → Upload file MIDI

POST /upload/thumbnail → Upload thumbnail

GET /thumbnails/list → Danh sách file thumbnail

Read Files

GET /read/midi?path={filePath} → Đọc file MIDI

GET /read/sound?path={filePath} → Đọc file âm thanh (mp3)

GET /read/thumbnail?path={filePath} → Đọc file thumbnail
```
