'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, RefreshCcw, Save } from 'lucide-react'

export default function SliderTool() {
  const [values, setValues] = useState({
    passion: 50,
    market: 50,
    feasibility: 50,
    uniqueness: 50,
  })

  const [showResult, setShowResult] = useState(false)

  const handleChange = (key: keyof typeof values, value: number) => {
    setValues(prev => ({ ...prev, [key]: value }))
    setShowResult(true)
  }

  const getFeedback = () => {
    const total = values.passion + values.market + values.feasibility + values.uniqueness
    if (total > 320) return "スーパーユニコーン級のポテンシャル！今すぐ行動しましょう。"
    if (total > 240) return "かなり有望なアイデアです。あとは「実行力」が鍵になります。"
    if (total > 160) return "バランスが良いですが、どこか一つ「突き抜けた強み」が欲しいかも。"
    return "まだ荒削りですね。でも大丈夫、ここからがスタートです。"
  }

  return (
    <div className="min-h-screen bg-[#070612] text-[#F5F5F7] font-serif">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link 
          href="/wallbatting"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          ツール一覧に戻る
        </Link>

        <h1 className="text-3xl font-bold mb-2">アイデア現在地チェッカー</h1>
        <p className="text-white/60 mb-12">直感でスライダーを動かして、あなたのアイデアの「強み」と「弱み」を可視化しましょう。</p>

        <div className="space-y-10 bg-white/5 border border-white/10 rounded-3xl p-8 mb-12">
          {/* Passion */}
          <div>
            <div className="flex justify-between mb-4">
              <label className="font-bold text-lg">1. 情熱 (Passion)</label>
              <span className="text-pink-400 font-mono text-xl">{values.passion}%</span>
            </div>
            <p className="text-sm text-white/50 mb-4">このアイデアのためなら、これからの3年間を捧げられますか？</p>
            <input 
              type="range" 
              min="0" max="100" 
              value={values.passion}
              onChange={(e) => handleChange('passion', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          {/* Market */}
          <div>
            <div className="flex justify-between mb-4">
              <label className="font-bold text-lg">2. 市場性 (Market)</label>
              <span className="text-blue-400 font-mono text-xl">{values.market}%</span>
            </div>
            <p className="text-sm text-white/50 mb-4">「お金を払ってでも解決したい」と思っている人はどれくらいいますか？</p>
            <input 
              type="range" 
              min="0" max="100" 
              value={values.market}
              onChange={(e) => handleChange('market', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Feasibility */}
          <div>
            <div className="flex justify-between mb-4">
              <label className="font-bold text-lg">3. 実現性 (Feasibility)</label>
              <span className="text-green-400 font-mono text-xl">{values.feasibility}%</span>
            </div>
            <p className="text-sm text-white/50 mb-4">今のチームと技術力で、MVP（試作品）を1ヶ月以内に作れますか？</p>
            <input 
              type="range" 
              min="0" max="100" 
              value={values.feasibility}
              onChange={(e) => handleChange('feasibility', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>

          {/* Uniqueness */}
          <div>
            <div className="flex justify-between mb-4">
              <label className="font-bold text-lg">4. 独自性 (Uniqueness)</label>
              <span className="text-purple-400 font-mono text-xl">{values.uniqueness}%</span>
            </div>
            <p className="text-sm text-white/50 mb-4">GoogleやAmazonが明日同じことを始めても、勝てる要素はありますか？</p>
            <input 
              type="range" 
              min="0" max="100" 
              value={values.uniqueness}
              onChange={(e) => handleChange('uniqueness', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        {/* Result Area */}
        {showResult && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-8 text-center"
          >
            <h3 className="text-xl font-bold mb-4">診断結果</h3>
            <p className="text-lg leading-relaxed mb-8">{getFeedback()}</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => alert('ログイン画面へ遷移（実装予定）')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white text-[#070612] font-bold hover:bg-white/90 transition-all"
              >
                <Save className="w-4 h-4" />
                この結果を保存してアイデア投稿する
              </button>
              <button 
                onClick={() => setValues({ passion: 50, market: 50, feasibility: 50, uniqueness: 50 })}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
              >
                <RefreshCcw className="w-4 h-4" />
                リセット
              </button>
            </div>
            <p className="text-xs text-white/40 mt-4">※ 結果を保存するにはログインが必要です</p>
          </motion.div>
        )}

      </div>
    </div>
  )
}
