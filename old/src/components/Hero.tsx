export function Hero() {
  return (
    <div className="flex flex-col items-start text-left max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-8">
        Weaver is the best AI Chat ever made.
      </h1>
      
      <div className="space-y-6 text-white">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-300">1. We're fast.</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            We're 2x faster than ChatGPT, 10x faster than DeepSeek. You'll feel the difference - trust me.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-purple-300">2. We have every model you could want.</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-2">
            Want to use <span className="font-medium text-blue-400">Claude</span> for code? We got you. <span className="font-medium text-green-400">DeepSeek</span> r1 for math? Of course. <span className="font-medium text-orange-400">ChatGPT</span> 4o for picture analysis? Why not.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            When new models come out, we make them available within hours of release.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-300">3. We're cheap. ($8/month)</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            We're less than half the price of ChatGPT or Claude, and we're MORE generous with limits. You get over 1,500 messages per month!
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 text-yellow-300">Whatcha waiting for?</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Reply here to get started, or click the little "chat" icon up top to make a new chat. Or you can{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">check out the FAQ</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
