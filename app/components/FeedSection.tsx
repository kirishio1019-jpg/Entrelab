'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ThumbsUp, UserPlus, Send, Sparkles, ArrowRight } from 'lucide-react'

// Mock Data for Feeds
const MOCK_IDEAS = [
  {
    id: 1,
    author: "佐藤 健太",
    role: "エンジニア",
    title: "AIを活用したパーソナル学習アシスタント",
    description: "学生一人ひとりの学習進度に合わせて、最適な教材と問題を自動生成するAIアプリを作りたいです。教育格差をなくすのが目標です。",
    tags: ["EdTech", "AI", "Mobile App"],
    likes: 24,
    comments: 8,
    lookingFor: ["デザイナー", "マーケター"],
    timestamp: "2時間前"
  },
  {
    id: 2,
    author: "田中 美咲",
    role: "プロダクトマネージャー",
    title: "地産地消を促進するローカルマーケットプレイス",
    description: "地域の農家と消費者を直接つなぐプラットフォーム。規格外野菜の販売などでフードロス削減も目指します。",
    tags: ["Sustainability", "E-commerce", "Local"],
    likes: 156,
    comments: 32,
    lookingFor: ["エンジニア", "営業"],
    timestamp: "5時間前"
  },
  {
    id: 3,
    author: "鈴木 一郎",
    role: "デザイナー",
    title: "クリエイターのためのポートフォリオSNS",
    description: "作品の背景や制作過程（ストーリー）に焦点を当てた、新しい形のポートフォリオサイト。マッチング機能も。",
    tags: ["Design", "SNS", "Career"],
    likes: 89,
    comments: 12,
    lookingFor: ["エンジニア"],
    timestamp: "1日前"
  }
]

interface FeedSectionProps {
  onPostClick: () => void
}

export default function FeedSection({ onPostClick }: FeedSectionProps) {
  const [activeTab, setActiveTab] = useState('trending')

  return (
    <section id="feed" className="relative w-full py-20 bg-[#070612] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              注目のアイデア
            </h2>
            <p className="text-white/60 text-lg max-w-2xl">
              世界中から投稿された、磨けば光る原石たち。あなたのスキルで、これらのアイデアを実現に近づけませんか？
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex bg-white/5 rounded-full p-1 backdrop-blur-sm border border-white/10">
            {['trending', 'newest', 'following'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-[#070612] shadow-lg' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'trending' ? 'トレンド' : tab === 'newest' ? '新着' : 'フォロー中'}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_IDEAS.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all hover:bg-white/10 flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                    {idea.author[0]}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{idea.author}</h4>
                    <span className="text-xs text-white/50">{idea.role} • {idea.timestamp}</span>
                  </div>
                </div>
                <button className="text-white/40 hover:text-white transition-colors">
                  <UserPlus className="w-4 h-4" />
                </button>
              </div>

              {/* Card Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-300 transition-colors">
                  {idea.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                  {idea.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {idea.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/60">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Looking For */}
              <div className="mb-6 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <span className="text-xs text-blue-300 font-medium block mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> 募集中
                </span>
                <div className="flex flex-wrap gap-2">
                  {idea.lookingFor.map(role => (
                    <span key={role} className="text-xs font-medium text-blue-200">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-white/60">
                <div className="flex gap-4">
                  <button className="flex items-center gap-1.5 hover:text-pink-400 transition-colors text-sm">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{idea.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors text-sm">
                    <MessageSquare className="w-4 h-4" />
                    <span>{idea.comments}</span>
                  </button>
                </div>
                <button className="text-xs font-medium hover:text-white transition-colors flex items-center gap-1">
                  詳細を見る <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* New Idea Card Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            onClick={onPostClick}
            className="group relative border border-dashed border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all hover:bg-white/5 flex flex-col items-center justify-center text-center h-full min-h-[300px] cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Send className="w-6 h-6 text-white/60" />
            </div>
            <h3 className="text-xl font-semibold mb-2">あなたのアイデアも<br/>投稿してみませんか？</h3>
            <p className="text-white/50 text-sm mb-6 max-w-xs">
              まだ形になっていなくても大丈夫。ここから全てが始まります。
            </p>
            <button className="px-6 py-2 rounded-full bg-white text-[#070612] font-medium text-sm hover:bg-white/90 transition-colors">
              投稿を作成する
            </button>
          </motion.div>
        </div>
        
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">
            すべてのアイデアを見る <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  )
}
