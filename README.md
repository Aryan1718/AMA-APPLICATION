This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## About Application 
1. Next.js & TypeScript:
 1. Design and Development: Utilized Next.js with TypeScript for the frontend, enhancing both performance and scalability. TypeScript added static typing, improving code reliability and maintainability.
 2. Server-Side Rendering (SSR): Leveraged Next.js’s SSR and static site generation for optimized content loading, ensuring faster response times for users.
 3. Routing: Created dynamic, user-friendly routes that simplified navigation within the app.
2. NextAuth.js:
   1. Authentication: Integrated NextAuth.js for authentication, simplifying login processes and ensuring a smooth user experience.
   2. Security with JWT: Implemented JSON Web Tokens (JWTs) for secure, stateless session handling, keeping user data safe while reducing server load.
   3. Custom Providers: Set up custom providers for more flexible login options and seamless social sign-ins, enhancing user convenience.
3. JWT (JSON Web Token):
   1. Token-based Authentication: Used JWT for creating secure tokens, ensuring protected sessions without requiring a persistent server-side session store.
   2. User Data Protection: Ensured user privacy by encoding sensitive data within the JWT, reinforcing data protection in each user session.
   3. Efficient Session Management: Reduced load on the server by storing sessions on the client side, improving scalability and reducing backend dependency.
4. Zod:
   1. Schema Validation: Utilized Zod to define and validate schema structures for data, preventing invalid data from entering the database.
   2. Error Handling: Added real-time error handling with Zod, which catches validation errors early, streamlining debugging and improving code stability.
   3. Type Safety: Enhanced type safety with TypeScript integrations, creating a well-defined API that reduced runtime errors.
5. MongoDB:
   1. Database Management: Managed user messages with MongoDB, allowing for efficient document storage, especially for unstructured data.
   2. Aggregation Pipelines: Used optimized MongoDB aggregation pipelines to process large datasets and retrieve specific user messages efficiently.
   3. Scalability: Leveraged MongoDB’s schema-less nature, allowing flexibility as the app’s data requirements evolved, contributing to app scalability.
6. Tailwind CSS:
   1. UI Customization: Styled the application using Tailwind CSS, providing a responsive, consistent design with minimal CSS code.
   2. Performance Optimization: Reduced CSS load with Tailwind’s utility-first approach, streamlining the app’s visual performance.
   3. Custom Themes: Easily adjusted the app’s look and feel with Tailwind’s customizable themes, creating a cohesive user experience.
7. Redux-Toolkit:
   1. State Management: Managed application state with Redux-Toolkit, ensuring data consistency across components and enhancing maintainability.
   2. Simplified Code: Leveraged Redux-Toolkit’s features to minimize boilerplate code, making the codebase cleaner and more readable.
   3. Persistent Data: Maintained user sessions and messages across pages, providing a seamless experience without the need to reload data repeatedly.

# Demo

Sign-in
![image](https://github.com/user-attachments/assets/f854faa3-019d-4df9-9c54-3cda5af37159)

Sign-Up
![image](https://github.com/user-attachments/assets/d0e4bbdc-063f-4bee-b567-6a5a696aa0b6)

 



