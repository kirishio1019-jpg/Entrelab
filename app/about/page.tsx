import Link from 'next/link'
import { ArrowLeft, Sparkles, Users, Lightbulb, Rocket } from 'lucide-react'

export const metadata = {
  title: 'Entrelabについて | Entrelab',
  description: 'Entrelabは、未完成のアイデアを共有し、フィードバックを通じて共に育て上げる、新しい形の起業プラットフォームです。',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#070612] text-[#F5F5F7] font-serif">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-16"
        >
          <ArrowLeft className="w-4 h-4" />
          トップに戻る
        </Link>

        {/* Hero Section */}
        <section className="mb-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
            未完成のままでいい。<br />
            ここから始めよう。
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            Entrelab（アントレラボ）は、起業家のための「実験室」です。
            完璧なビジネスプランは必要ありません。あなたの頭の中にあるラフなアイデアを、
            世界に解き放つ場所です。
          </p>
        </section>

        {/* Mission */}
        <section className="mb-24">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
              <Sparkles className="text-yellow-400" />
              私たちのミッション
            </h2>
            <div className="space-y-6 text-white/80 text-lg leading-relaxed">
              <p>
                「起業」という言葉には、まだ高いハードルがあります。
                失敗への恐怖、資金の不足、仲間の不在。
                多くの素晴らしいアイデアが、誰にも知られることなく消えていきます。
              </p>
              <p>
                私たちは、そのハードルを極限まで下げたいと考えました。
                思いついた瞬間に投稿し、誰かからの「いいね」や「コメント」に励まされ、
                少しずつ形になっていく。そんな優しいエコシステムを作ることが目標です。
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Entrelabでできること</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <Lightbulb className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">アイデアの共有</h3>
              <p className="text-white/60">
                まだ形になっていない思いつきでもOK。タグをつけて投稿するだけで、同じ志を持つ人々に届きます。
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <Users className="w-10 h-10 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">仲間の募集</h3>
              <p className="text-white/60">
                エンジニア、デザイナー、壁打ち相手。「募集する役割」を設定して、未来の共同創業者を見つけましょう。
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <Rocket className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">ノウハウの学習</h3>
              <p className="text-white/60">
                アイデアの出し方から資金調達まで。起業に必要な実践的な知識を、記事コンテンツで学べます。
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 border-t border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">さあ、実験を始めましょう</h2>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#070612] font-bold hover:bg-white/90 transition-all hover:scale-105"
          >
            トップページへ戻る
          </Link>
        </section>
      </div>
    </div>
  )
}
