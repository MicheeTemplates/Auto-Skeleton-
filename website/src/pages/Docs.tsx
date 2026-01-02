import { Link } from 'react-router-dom';
import { Book, Code, Zap } from 'lucide-react';

export default function Docs() {
  return (
    <div className="container mx-auto px-6 py-12 flex min-h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <aside className="w-64 hidden lg:block pr-8">
        <div className="sticky top-24 space-y-8">
          <div className="skeleton-box-sm p-4">
            <h4 className="font-bold mb-4 text-sm text-white">Getting Started</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/docs" className="text-white font-semibold hover:text-zinc-400 transition-colors">Introduction</Link></li>
              <li><Link to="/docs/installation" className="text-zinc-400 hover:text-white transition-colors">Installation</Link></li>
              <li><Link to="/docs/usage" className="text-zinc-400 hover:text-white transition-colors">Basic Usage</Link></li>
            </ul>
          </div>
          <div className="skeleton-box-sm p-4">
            <h4 className="font-bold mb-4 text-sm text-white">Frameworks</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/docs/react" className="text-zinc-400 hover:text-white transition-colors">React</Link></li>
              <li><Link to="/docs/vue" className="text-zinc-400 hover:text-white transition-colors">Vue</Link></li>
              <li><Link to="/docs/svelte" className="text-zinc-400 hover:text-white transition-colors">Svelte</Link></li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-12">
        <div className="max-w-3xl">
          <div className="inline-block px-6 py-3 bg-white border-2 border-white shadow-[4px_4px_0px_0px_rgba(161,161,170,0.5)] mb-8">
            <h1 className="text-4xl font-bold text-black">Documentation</h1>
          </div>
          
          <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
            Welcome to the skull-dom documentation. Here you'll learn how to integrate automated skeleton screens into your application.
          </p>

          <div className="skeleton-box p-6 mb-8 bg-zinc-900 border-zinc-600">
            <p className="text-zinc-300 font-semibold">
              ⚠️ Note: This documentation is currently being built. Check back soon for updates.
            </p>
          </div>

          {/* Quick Start Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="skeleton-box-sm p-6 hover:border-white transition-colors">
              <div className="w-12 h-12 border border-white bg-white/10 flex items-center justify-center mb-4">
                <Book className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Guides</h3>
              <p className="text-zinc-400 text-sm">Step-by-step tutorials</p>
            </div>

            <div className="skeleton-box-sm p-6 hover:border-white transition-colors">
              <div className="w-12 h-12 border border-white bg-white/10 flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">API Reference</h3>
              <p className="text-zinc-400 text-sm">Complete API docs</p>
            </div>

            <div className="skeleton-box-sm p-6 hover:border-white transition-colors">
              <div className="w-12 h-12 border border-white bg-white/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Examples</h3>
              <p className="text-zinc-400 text-sm">Live code examples</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
