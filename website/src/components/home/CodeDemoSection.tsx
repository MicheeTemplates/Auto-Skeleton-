import { Code2, Zap, Boxes } from 'lucide-react';
import CodeComparison from './CodeComparison';

export default function CodeDemoSection() {
  return (
    <section className="code-section py-24 bg-neutral-950">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Description */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">Simple Integration</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Just Add Attributes
            </h2>
            
            <p className="text-lg text-neutral-400 leading-relaxed">
              No need to create separate skeleton components. SkullDOM analyzes your existing 
              HTML structure and overlays a matching skeleton automatically.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="card-modern p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Instant Setup</h3>
                  <p className="text-sm text-neutral-400">Add <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs text-gray-900">data-skeleton</code> or use the React hook.</p>
                </div>
              </div>
              
              <div className="card-modern p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                  <Boxes className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Layout Inference</h3>
                  <p className="text-sm text-neutral-400">Automatically detects text size, margins, padding, and flex gaps.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Code Block */}
          <div className="w-full">
            <CodeComparison />
          </div>
        </div>
      </div>
    </section>
  );
}
