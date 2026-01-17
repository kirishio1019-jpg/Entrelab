'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'

export default function InAppBrowserGuide() {
  const [isInApp, setIsInApp] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Detect in-app browsers (LINE, Instagram, Facebook, Twitter)
    const userAgent = window.navigator.userAgent.toLowerCase()
    const inAppKeywords = ['line', 'instagram', 'fbav', 'fban', 'twitter']
    
    if (inAppKeywords.some(keyword => userAgent.includes(keyword))) {
      setIsInApp(true)
      setIsVisible(true)
    }
  }, [])

  if (!isInApp) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-[100] px-4 pt-4 pb-2"
        >
          <div className="bg-blue-600 text-white rounded-lg shadow-lg p-4 relative border border-white/20 backdrop-blur-md">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-start gap-4 pr-6">
              <div className="bg-white/20 p-2 rounded-full shrink-0">
                <ExternalLink className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">ブラウザで開いてください</h3>
                <p className="text-sm text-white/90 leading-relaxed mb-3">
                  LINEやInstagramのアプリ内ブラウザでは、Googleログインが制限されています。
                </p>
                <div className="text-sm bg-black/20 rounded p-3 border border-white/10">
                  <p className="font-medium mb-1">【開き方】</p>
                  <ol className="list-decimal list-inside space-y-1 text-white/80">
                    <li>右上のメニューアイコン（<span className="inline-block align-middle text-lg">⋮</span> または <span className="inline-block align-middle">sharing</span>）をタップ</li>
                    <li><strong>「ブラウザで開く」</strong>または<strong>「Safari/Chromeで開く」</strong>を選択</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
