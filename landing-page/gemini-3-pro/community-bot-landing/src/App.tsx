

function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] text-gray-900 font-sans selection:bg-yellow-300 selection:text-black">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        {/* Header / Nav */}
        <header className="mb-16 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tight">🤖 CommunityBot</div>
          <nav>
            <a href="#features" className="mr-6 hover:underline underline-offset-4 decoration-2">Features</a>
            <a href="#pricing" className="hover:underline underline-offset-4 decoration-2">Pricing</a>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="mb-24">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
            Make your community <span className="bg-yellow-300 px-2">sane</span> again.
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-800 mb-8">
            The AI moderator that doesn't just ban bots—it encourages the humans. 
            Smart summaries, toxicity filters, and a karma system that actually works.
          </p>
          <button className="bg-black text-white text-lg font-bold py-4 px-8 rounded-full hover:bg-gray-800 transition transform hover:-translate-y-1 shadow-lg">
            Add to Telegram
          </button>
        </section>

        {/* The Problem (Storytelling) */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-6 border-b-4 border-black inline-block pb-1">The Problem</h2>
          <div className="prose prose-lg text-gray-800">
            <p className="mb-6">
              You start a chat. It's great. 10 people discussing retro consoles.
            </p>
            <p className="mb-6">
              Then it becomes 100 people. Still good, but noisy.
            </p>
            <p className="mb-6">
              Then 1,000. <strong>Now it's chaos.</strong>
            </p>
            <p className="mb-6">
              You have spam, you have "crypto-bros" selling signals, and you have that one guy who won't stop arguing about politics in the #memes channel. You spend your life clicking "Ban".
            </p>
            <div className="bg-white p-6 border-l-4 border-red-500 my-8 italic">
              "I just wanted to talk about games, not police a digital kindergarten." — You, probably.
            </div>
          </div>
        </section>

        {/* The Solution (Dark Section) */}
        <section className="mb-24 -mx-6 md:-mx-12 px-6 md:px-12 py-16 bg-gray-900 text-gray-100 rounded-3xl shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-300">How we fix it</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">1. The " Chill " Filter</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Most bots ban based on keywords. We use LLMs to understand <em>context</em>. 
                Passive-aggressive comments? Trolling? We detect the <strong>vibe</strong>, not just the words.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">2. Weekly Digests</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Nobody reads 5,000 messages. Our bot summarizes the best discussions of the day/week and posts a digest. 
                <strong>FOMO is cured.</strong>
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">3. Social Credit (The Good Kind)</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Users can tip each other "Kudos". High Kudos score = more privileges (like posting links). 
                The community regulates itself.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">4. Onboarding that works</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                New users get a personalized welcome and a summary of current active topics. 
                They jump straight into the conversation, not the rules page.
              </p>
            </div>
          </div>
        </section>

        {/* Features List */}
        <section id="features" className="mb-24">
          <h2 className="text-3xl font-bold mb-10">Everything else inside</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🛡️", title: "Anti-Spam", desc: "Blocks crypto-spam before you see it." },
              { icon: "📊", title: "Analytics", desc: "See who is actually active." },
              { icon: "🌙", title: "Quiet Mode", desc: "Slows down chat during sleeping hours." },
              { icon: "🧠", title: "Context Aware", desc: "Remembers previous conversations." },
              { icon: "🎨", title: "Custom Personality", desc: "Make the bot sassy or polite." },
              { icon: "🔗", title: "Web Dashboard", desc: "Manage everything from a UI." },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-black transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing / CTA */}
        <section id="pricing" className="mb-20 text-center">
          <div className="bg-yellow-300 rounded-3xl p-12 md:p-20 relative overflow-hidden">
             {/* Decorative circle */}
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
             
             <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10">Start building better communities.</h2>
             <p className="text-xl mb-10 relative z-10">Free for small groups. $10/mo for power users.</p>
             <button className="bg-black text-white text-xl font-bold py-5 px-10 rounded-full hover:bg-gray-800 transition transform hover:scale-105 shadow-xl relative z-10">
               Get Started Now
             </button>
             <p className="mt-6 text-sm opacity-60 relative z-10">No credit card required for free tier.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-300 pt-12 pb-20 text-center text-gray-500">
          <p className="mb-4">
            Made with 🖤 by <a href="#" className="underline text-black">Paul</a> & <a href="#" className="underline text-black">Gemini</a>.
          </p>
          <p className="text-sm">
            © 2025 CommunityBot. All rights reserved. <br/>
            (This is a demo page).
          </p>
        </footer>

      </div>
    </div>
  )
}

export default App