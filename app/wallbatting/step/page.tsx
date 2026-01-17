'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Save } from 'lucide-react'
import PostIdeaModal from '@/app/components/PostIdeaModal'
import { createClient } from '@/lib/supabase/client'

export default function StepTool() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({
    who: '',
    problem: '',
    solution: '',
    why_now: ''
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalInitialData, setModalInitialData] = useState({ title: '', description: '' })
  const supabase = createClient()

  const questions = [
    {
      key: 'who',
      title: '誰の課題ですか？',
      description: 'ターゲットユーザーを具体的にイメージしてください。「大学生」ではなく「就活に悩む文系大学生」のように。',
      placeholder: '例：毎日の献立を考えるのが苦痛な共働き主婦'
    },
    {
      key: 'problem',
      title: 'どんな「痛み」がありますか？',
      description: 'その人が抱えている切実な悩みや不満は何ですか？',
      placeholder: '例：仕事で疲れているのに、栄養バランスを考えて料理するのがしんどい。Uberは高いし、コンビニ弁当は罪悪感がある。'
    },
    {
      key: 'solution',
      title: 'どうやって解決しますか？',
      description: 'あなたのプロダクトやサービスが提供する解決策を一言で。',
      placeholder: '例：管理栄養士監修の「下ごしらえ済み食材セット」が、毎日ポストに届くサブスクサービス'
    },
    {
      key: 'why_now',
      title: 'なぜ「今」やるのですか？',
      description: 'なぜ今までそのサービスはなかったのでしょう？技術の進化？法改正？価値観の変化？',
      placeholder: '例：リモートワークの普及で「家ご飯」の需要が増えたが、自炊疲れもピークに達しているから'
    }
  ]

  const currentQ = questions[step]
  const isFinished = step >= questions.length

  const handleNext = () => {
    if (step < questions.length) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleChange = (val: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.key]: val }))
  }

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
       await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/wallbatting/step`,
        },
      })
      return
    }

    const description = `
【ステップ壁打ち結果】
■ 誰の課題？
${answers.who}

■ どんな痛み？
${answers.problem}

■ 解決策
${answers.solution}

■ なぜ今？
${answers.why_now}
    `.trim()

    setModalInitialData({
      title: 'ステップ壁打ちからのアイデア投稿',
      description: description
    })
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#070612] text-[#F5F5F7] font-serif">
      <PostIdeaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={modalInitialData}
      />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link 
          href="/wallbatting"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          ツール一覧に戻る
        </Link>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full mb-12">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${(step / questions.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode='wait'>
          {!isFinished ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-sm font-bold text-blue-400 mb-4">STEP {step + 1} / {questions.length}</h2>
              <h1 className="text-3xl font-bold mb-4">{currentQ.title}</h1>
              <p className="text-white/60 mb-8 leading-relaxed">{currentQ.description}</p>

              <textarea
                value={answers[currentQ.key as keyof typeof answers]}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={currentQ.placeholder}
                className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-lg focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all mb-8 resize-none"
                autoFocus
              />

              <div className="flex justify-between items-center">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className={`text-white/60 hover:text-white transition-colors ${step === 0 ? 'opacity-0 cursor-default' : ''}`}
                >
                  戻る
                </button>
                <button
                  onClick={handleNext}
                  disabled={!answers[currentQ.key as keyof typeof answers]}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {step === questions.length - 1 ? '完了' : '次へ'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center"
            >
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4">言語化が完了しました！</h2>
              <p className="text-white/60 mb-12">
                あなたのアイデアの「原石」が形になりました。<br />
                これをEntrelabに投稿して、仲間からのフィードバックをもらいましょう。
              </p>

              <div className="text-left bg-black/20 rounded-xl p-6 mb-12 space-y-6">
                <div>
                  <label className="text-xs text-white/40 block mb-1">誰の課題？</label>
                  <p className="font-medium">{answers.who}</p>
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-1">どんな痛み？</label>
                  <p className="font-medium">{answers.problem}</p>
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-1">解決策</label>
                  <p className="font-medium text-blue-300">{answers.solution}</p>
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-1">なぜ今？</label>
                  <p className="font-medium">{answers.why_now}</p>
                </div>
              </div>

              <button 
                onClick={handleSave}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-white text-[#070612] font-bold hover:bg-white/90 transition-all hover:scale-105 shadow-lg shadow-white/10"
              >
                <Save className="w-5 h-5" />
                保存してアイデアを投稿する
              </button>
              <p className="text-xs text-white/40 mt-4">※ 投稿にはログインが必要です</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
