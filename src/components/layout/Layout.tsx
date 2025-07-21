import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

const Layout = ({
  children,
  title = 'Naman Pathak | Full-Stack Developer',
  description = 'Portfolio of Naman Pathak - Full-Stack Developer with expertise in React, React Native, and Node.js',
}: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://namanpathak.dev/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/images/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://namanpathak.dev/" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="/images/og-image.jpg" />
      </Head>
      
      <Header />
      
      <main className={styles.main}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
