import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Entrelab - 未来を共創する場所',
    short_name: 'Entrelab',
    description: 'ラフな起業アイデアを共有し、フィードバックを集め、共同創業者を見つけよう。',
    start_url: '/',
    display: 'standalone',
    background_color: '#070612',
    theme_color: '#070612',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // You can add more icons like android-chrome-192x192.png here later
    ],
  }
}
