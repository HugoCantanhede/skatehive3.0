import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        default: 'Skatehive - The Future of Skateboarding',
        template: '%s | Skatehive',
    },
    description: 'Skatehive is the decentralized skateboarding community where skaters share and store content forever.',
    keywords: ['Skateboarding', 'Web3', 'Decentralization', 'Community', 'Skatehive'],
    metadataBase: new URL('https://skatehive.app'),
    authors: [{ name: 'Skatehive' }],
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Skatehive - The Future of Skateboarding',
        description: 'Join the decentralized skateboarding community and start earning for your content.',
        url: 'https://skatehive.app',
        siteName: 'Skatehive',
        images: [
            {
                url: 'https://www.skatehive.app/skatehive-preview.jpg',
                width: 1200,
                height: 630,
                alt: 'Skatehive Preview',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Skatehive - The Future of Skateboarding',
        description: 'Skatehive is the decentralized skateboarding community where skaters share content and get rewarded.',
        images: ['https://www.skatehive.app/skatehive-preview.jpg'],
        creator: '@skatehive',
    },
    viewport: 'width=device-width, initial-scale=1.0',
    icons: {
        icon: '/favicon.ico',
    },
};
