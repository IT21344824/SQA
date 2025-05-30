import {
  ClerkProvider,

} from '@clerk/nextjs'
import '../globals.css'
import Header from '@/components/Header';
import { SanityLive } from '@/sanity/lib/live';

import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from '@/components/DisableDraftMode';
import HeaderBottom from '@/components/HeaderBottom';


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body>
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
          <main>
            <Header />
            <HeaderBottom />
            {children}
          </main>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
