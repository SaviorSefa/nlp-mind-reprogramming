import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>NLP Mind Reprogramming</title>
        <meta name="description" content="Transform limiting beliefs and develop personal power" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-primary-700 mb-8">
          NLP Mind Reprogramming
        </h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Transform Your Limiting Beliefs & Develop Personal Power
        </p>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
          <p className="text-gray-600 mb-6">
            Begin your journey to transform limiting beliefs and develop personal power.
          </p>
          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
            Start Assessment
          </button>
        </div>
      </main>

      <footer className="mt-12 py-6 bg-gray-800 text-white text-center">
        <p>© 2025 NLP Mind Reprogramming</p>
      </footer>
    </div>
  )
}
