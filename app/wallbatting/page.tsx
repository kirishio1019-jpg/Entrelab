import Link from 'next/link'
import { ArrowRight, Sliders, ListChecks, MessageSquare, LayoutTemplate, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: '壁打ちツール一覧：起業アイデアを整理・検証する | Entrelab',
  description: 'Entrelabが提供する無料の壁打ちツール集。スライダー評価、ステップ分解、AIチャットなど、あなたのアイデアを「言語化」し「検証」するための4つのツール。',
}

export default function WallbattingHub() {
  const tools = [
    {
      id: 'slider',
      title: 'スライダー評価',
      description: '「情熱」「市場」「実現性」を直感的に動かして、アイデアの現在地を可視化します。',
      icon: <Sliders className="w-8 h-8 text-blue-400" />,
      href: '/wallbatting/slider',
      color: 'blue',
      tag: '思考整理'
    },
    {
      id: 'step',
      title: 'ステップ分解ウィザード',
      description: '一問一答形式で質問に答えるだけで、ぼんやりしたアイデアが具体的な事業構想に変わります。',
      icon: <ListChecks className="w-8 h-8 text-green-400" />,
      href: '/wallbatting/step',
      color: 'green',
      tag: '言語化'
    },
    {
      id: 'log',
      title: 'AIチャット壁打ち',
      description: '24時間365日、あなたのアイデアに対してAIが容赦ないフィードバックと改善案を即答します。',
      icon: <MessageSquare className="w-8 h-8 text-purple-400" />,
      href: '#', // Not implemented yet
      color: 'purple',
      tag: 'Coming Soon',
      disabled: true
    },
    {
      id: 'canvas',
      title: 'リーンキャンバス作成',
      description: 'ビジネスモデルの全体像を1枚の図に。埋めるだけでピッチ資料の骨子が完成します。',
      icon: <LayoutTemplate className="w-8 h-8 text-pink-400" />,
      href: '#', // Not implemented yet
      color: 'pink',
      tag: 'Coming Soon',
      disabled: true
    }
  ]

  return (
    <div className="min-h-screen bg-[#070612] text-[#F5F5F7] font-serif">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          トップに戻る
        </Link>

        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            起業アイデアの<br className="md:hidden" />「壁打ち」ツール
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            アイデアは、誰かに話すことで初めて形になります。<br />
            まずはEntrelabのツールを使って、あなたの頭の中を整理・言語化してみましょう。
            ログイン不要で、今すぐ試せます。
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {tools.map((tool) => (
            <Link 
              key={tool.id} 
              href={tool.href}
              className={`group relative bg-white/5 border border-white/10 rounded-3xl p-8 transition-all overflow-hidden ${
                tool.disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]'
              }`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-${tool.color}-500/50`} />
              
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl bg-${tool.color}-500/10`}>
                  {tool.icon}
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 ${tool.disabled ? 'text-white/40' : 'text-white/80'}`}>
                  {tool.tag}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                {tool.title}
                {!tool.disabled && <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white/60" />}
              </h2>
              <p className="text-white/60 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>

        {/* SEO Content */}
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">なぜ「壁打ち」が重要なのか？</h2>
          <div className="grid md:grid-cols-3 gap-8 text-white/80">
            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-300">1. 客観視できる</h3>
              <p className="text-sm leading-relaxed">
                頭の中だけで考えていると、都合の良い妄想になりがちです。ツールに入力することで、論理の穴や不足している視点に気づくことができます。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-300">2. 言語化される</h3>
              <p className="text-sm leading-relaxed">
                「なんとなく」のアイデアを、他人に伝わる言葉に変換します。これができれば、仲間集めやピッチ資料作成のスピードが劇的に上がります。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-300">3. 心理的ハードルを下げる</h3>
              <p className="text-sm leading-relaxed">
                いきなり人に話すのは怖いもの。まずはAIやツール相手に壁打ちすることで、自信を持ってアウトプットできるようになります。
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
