import Link from 'next/link'
import { ArrowLeft, Zap, Target, Users2 } from 'lucide-react'

export const metadata = {
  title: 'コンセプト：未完成のアイデアを世界に解き放て | Entrelab',
  description: 'Entrelabの思想と世界観。私たちはなぜ「未完成」に価値があると信じるのか。失敗を恐れず、挑戦するすべての学生・若手起業家へのメッセージ。',
}

export default function ConceptPage() {
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

        {/* Hero Concept */}
        <section className="mb-32 text-center">
          <span className="inline-block text-blue-400 font-medium tracking-widest mb-6">OUR PHILOSOPHY</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-12 leading-tight">
            未完成のアイデアを<br />
            世界に解き放て。
          </h1>
          <div className="max-w-2xl mx-auto space-y-8 text-lg md:text-xl text-white/80 leading-relaxed text-left md:text-center">
            <p>
              「完璧になってから出そう」<br />
              その躊躇が、世界を変えるチャンスを殺しているとしたら？
            </p>
            <p>
              Entrelabは信じています。<br />
              世界を変えるのは、洗練されたビジネスプランではなく、<br />
              誰かの「これ、おかしくない？」という違和感や、<br />
              「もっとこうしたい」という純粋な衝動だと。
            </p>
          </div>
        </section>

        {/* 3 Core Values */}
        <section className="mb-32 grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Rough is Tough</h2>
            <p className="text-white/60 leading-relaxed">
              荒削りなままでいい。むしろ、荒削りだからこそ、可能性は無限大です。
              体裁を整えることに時間を使うより、まずは熱量をぶつけましょう。
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Feedback is Gift</h2>
            <p className="text-white/60 leading-relaxed">
              否定的な意見も、賞賛も、すべてが贈り物です。
              フィードバックを恐れず、むしろそれを燃料にして、アイデアを磨き上げましょう。
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
              <Users2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Co-Create Future</h2>
            <p className="text-white/60 leading-relaxed">
              一人の天才が世界を変える時代は終わりました。
              異なる視点を持つ仲間と出会い、共に未来を創る。それがEntrelabの目指す場所です。
            </p>
          </div>
        </section>

        {/* Manifesto */}
        <section className="mb-24 py-16 px-8 border-y border-white/10 bg-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <h2 className="text-3xl font-bold mb-8 text-center">Entrelab Manifesto</h2>
          <div className="max-w-xl mx-auto space-y-4 font-bold text-lg md:text-xl text-center">
            <p>失敗を恐れるな。何もしないことを恐れよ。</p>
            <p>批判を恐れるな。無視されることを恐れよ。</p>
            <p>未完成を恐れるな。終わってしまうことを恐れよ。</p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="text-white/60 mb-8">あなたの頭の中にあるそのアイデア、今日ここから始めませんか？</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            アイデアを投稿する
          </Link>
        </section>
      </div>
    </div>
  )
}
