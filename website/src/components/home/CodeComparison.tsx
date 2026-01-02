import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Check, Copy } from 'lucide-react';

type Framework = 'vanilla' | 'react' | 'vue';
type Mode = 'custom' | 'skulldom';

// VS Code Dark+ Theme Colors
const C = {
  keyword: "text-[#569cd6]",      // blue (import, function, const)
  control: "text-[#c586c0]",      // purple (from, return, if)
  string: "text-[#ce9178]",       // orange/brown
  function: "text-[#dcdcaa]",     // yellow
  component: "text-[#4ec9b0]",    // teal
  variable: "text-[#9cdcfe]",     // light blue
  property: "text-[#9cdcfe]",     // light blue (object keys)
  comment: "text-[#6a9955]",      // green
  tag: "text-[#569cd6]",          // blue (html tags)
  attr: "text-[#9cdcfe]",         // light blue (attributes)
  number: "text-[#b5cea8]",       // light green
  white: "text-[#d4d4d4]",        // standard text
  punctuation: "text-[#ffd700]",  // yellow (brackets)
};

// Helper for indentation
const Indent = ({ level = 1 }: { level?: number }) => <span style={{ display: 'inline-block', width: `${level * 1.5}rem` }} />;

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-[13px] leading-6 whitespace-pre">
    {children}
  </div>
);

const Line = ({ children, num }: { children: React.ReactNode; num: number }) => (
  <div className="table-row">
    <span className="table-cell text-right w-8 pr-4 text-[#6e7681] select-none text-xs align-top pt-[2px]">{num}</span>
    <span className="table-cell">{children}</span>
  </div>
);

const snippets = {
  vanilla: {
    custom: (
      <CodeBlock>
        <Line num={1}><span className={C.comment}>/* CSS */</span></Line>
        <Line num={2}><span className={C.keyword}>.skeleton</span> <span className={C.punctuation}>{'{'}</span></Line>
        <Line num={3}><Indent /><span className={C.property}>background</span>: <span className={C.number}>#eee</span>;</Line>
        <Line num={4}><Indent /><span className={C.property}>background</span>: <span className={C.function}>linear-gradient</span>(</Line>
        <Line num={5}><Indent level={2} /><span className={C.number}>110deg</span>, <span className={C.number}>#ececec</span> <span className={C.number}>8%</span>, <span className={C.number}>#f5f5f5</span> <span className={C.number}>18%</span>, <span className={C.number}>#ececec</span> <span className={C.number}>33%</span></Line>
        <Line num={6}><Indent />);</Line>
        <Line num={7}><Indent /><span className={C.property}>background-size</span>: <span className={C.number}>200%</span> <span className={C.number}>100%</span>;</Line>
        <Line num={8}><Indent /><span className={C.property}>animation</span>: <span className={C.variable}>shine</span> <span className={C.number}>1.5s</span> <span className={C.variable}>linear</span> <span className={C.variable}>infinite</span>;</Line>
        <Line num={9}><span className={C.punctuation}>{'}'}</span></Line>
        <Line num={10}>&nbsp;</Line>
        <Line num={11}><span className={C.comment}>/* HTML */</span></Line>
        <Line num={12}><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>class</span>=<span className={C.string}>"card"</span><span className={C.white}>&gt;</span></Line>
        <Line num={13}><Indent /><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>class</span>=<span className={C.string}>"skeleton h-8 w-3/4 mb-4"</span><span className={C.white}>&gt;&lt;/</span><span className={C.tag}>div</span><span className={C.white}>&gt;</span></Line>
        <Line num={14}><Indent /><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>class</span>=<span className={C.string}>"skeleton h-4 w-full mb-2"</span><span className={C.white}>&gt;&lt;/</span><span className={C.tag}>div</span><span className={C.white}>&gt;</span></Line>
        <Line num={15}><Indent /><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>class</span>=<span className={C.string}>"skeleton h-4 w-5/6"</span><span className={C.white}>&gt;&lt;/</span><span className={C.tag}>div</span><span className={C.white}>&gt;</span></Line>
        <Line num={16}><span className={C.white}>&lt;/</span><span className={C.tag}>div</span><span className={C.white}>&gt;</span></Line>
      </CodeBlock>
    ),
    skulldom: (
      <CodeBlock>
        <Line num={1}><span className={C.comment}>&lt;!-- Just add data-skeleton attribute --&gt;</span></Line>
        <Line num={2}><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>class</span>=<span className={C.string}>"card"</span> <span className={C.variable}>data-skeleton</span><span className={C.white}>&gt;</span></Line>
        <Line num={3}><Indent /><span className={C.white}>&lt;</span><span className={C.tag}>h1</span><span className={C.white}>&gt;</span><span className={C.white}>Title</span><span className={C.white}>&lt;/</span><span className={C.tag}>h1</span><span className={C.white}>&gt;</span></Line>
        <Line num={4}><Indent /><span className={C.white}>&lt;</span><span className={C.tag}>p</span><span className={C.white}>&gt;</span><span className={C.white}>Description text...</span><span className={C.white}>&lt;/</span><span className={C.tag}>p</span><span className={C.white}>&gt;</span></Line>
        <Line num={5}><span className={C.white}>&lt;/</span><span className={C.tag}>div</span><span className={C.white}>&gt;</span></Line>
        <Line num={6}>&nbsp;</Line>
        <Line num={7}><span className={C.comment}>&lt;!-- That's it! SkullDOM handles the rest --&gt;</span></Line>
      </CodeBlock>
    )
  },
  react: {
    custom: (
      <CodeBlock>
        <Line num={1}><span className={C.keyword}>function</span> <span className={C.function}>Card</span>(<span className={C.punctuation}>{'{'}</span> <span className={C.variable}>loading</span> <span className={C.punctuation}>{'}'}</span>) <span className={C.punctuation}>{'{'}</span></Line>
        <Line num={2}><Indent /><span className={C.control}>if</span> (<span className={C.variable}>loading</span>) <span className={C.punctuation}>{'{'}</span></Line>
        <Line num={3}><Indent level={2} /><span className={C.control}>return</span> (</Line>
        <Line num={4}><Indent level={3} /><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>className</span>=<span className={C.string}>"card"</span><span className={C.white}>&gt;</span></Line>
        <Line num={5}><Indent level={4} /><span className={C.white}>&lt;</span><span className={C.component}>Skeleton</span> <span className={C.attr}>className</span>=<span className={C.string}>"h-8 w-3/4 mb-4"</span> <span className={C.white}>/&gt;</span></Line>
        <Line num={6}><Indent level={4} /><span className={C.white}>&lt;</span><span className={C.component}>Skeleton</span> <span className={C.attr}>className</span>=<span className={C.string}>"h-4 w-full mb-2"</span> <span className={C.white}>/&gt;</span></Line>
        <Line num={7}><Indent level={4} /><span className={C.white}>&lt;</span><span className={C.component}>Skeleton</span> <span className={C.attr}>className</span>=<span className={C.string}>"h-4 w-5/6"</span> <span className={C.white}>/&gt;</span></Line>
        <Line num={8}><Indent level={3} /><span className={C.white}>&lt;/</span><span className={C.tag}>div</span><span className={C.white}>&gt;</span></Line>
        <Line num={9}><Indent level={2} />);</Line>
        <Line num={10}><Indent /><span className={C.punctuation}>{'}'}</span></Line>
        <Line num={11}>&nbsp;</Line>
        <Line num={12}><Indent /><span className={C.control}>return</span> (</Line>
        <Line num={13}><Indent level={2} /><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>className</span>=<span className={C.string}>"card"</span><span className={C.white}>&gt;</span></Line>
        <Line num={14}><Indent level={3} /><span className={C.white}>&lt;</span><span className={C.tag}>h1</span><span className={C.white}>&gt;</span><span className={C.punctuation}>{'{'}</span><span className={C.variable}>data</span>.<span className={C.property}>title</span><span className={C.punctuation}>{'}'}</span><span className={C.white}>&lt;/</span><span className={C.tag}>h1</span><span className={C.white}>&gt;</span></Line>
        <Line num={15}><Indent level={3} /><span className={C.white}>&lt;</span><span className={C.tag}>p</span><span className={C.white}>&gt;</span><span className={C.punctuation}>{'{'}</span><span className={C.variable}>data</span>.<span className={C.property}>desc</span><span className={C.punctuation}>{'}'}</span><span className={C.white}>&lt;/</span><span className={C.tag}>p</span><span className={C.white}>&gt;</span></Line>
        <Line num={16}><Indent level={2} /><span className={C.white}>&lt;/</span><span className={C.tag}>div</span><span className={C.white}>&gt;</span></Line>
        <Line num={17}><Indent />);</Line>
        <Line num={18}><span className={C.punctuation}>{'}'}</span></Line>
      </CodeBlock>
    ),
    skulldom: (
      <CodeBlock>
        <Line num={1}><span className={C.control}>import</span> <span className={C.punctuation}>{'{'}</span> <span className={C.variable}>useSkeleton</span> <span className={C.punctuation}>{'}'}</span> <span className={C.control}>from</span> <span className={C.string}>'skull-dom/react'</span>;</Line>
        <Line num={2}>&nbsp;</Line>
        <Line num={3}><span className={C.keyword}>function</span> <span className={C.function}>Card</span>(<span className={C.punctuation}>{'{'}</span> <span className={C.variable}>loading</span> <span className={C.punctuation}>{'}'}</span>) <span className={C.punctuation}>{'{'}</span></Line>
        <Line num={4}><Indent /><span className={C.keyword}>const</span> <span className={C.variable}>ref</span> = <span className={C.function}>useRef</span>(<span className={C.keyword}>null</span>);</Line>
        <Line num={5}><Indent /><span className={C.comment}>// One hook to rule them all</span></Line>
        <Line num={6}><Indent /><span className={C.function}>useSkeleton</span>(<span className={C.variable}>ref</span>, <span className={C.variable}>loading</span>);</Line>
        <Line num={7}>&nbsp;</Line>
        <Line num={8}><Indent /><span className={C.control}>return</span> (</Line>
        <Line num={9}><Indent level={2} /><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>ref</span>=<span className={C.punctuation}>{'{'}</span><span className={C.variable}>ref</span><span className={C.punctuation}>{'}'}</span> <span className={C.attr}>className</span>=<span className={C.string}>"card"</span><span className={C.white}>&gt;</span></Line>
        <Line num={10}><Indent level={3} /><span className={C.white}>&lt;</span><span className={C.tag}>h1</span><span className={C.white}>&gt;</span><span className={C.punctuation}>{'{'}</span><span className={C.variable}>data</span>.<span className={C.property}>title</span><span className={C.punctuation}>{'}'}</span><span className={C.white}>&lt;/</span><span className={C.tag}>h1</span><span className={C.white}>&gt;</span></Line>
        <Line num={11}><Indent level={3} /><span className={C.white}>&lt;</span><span className={C.tag}>p</span><span className={C.white}>&gt;</span><span className={C.punctuation}>{'{'}</span><span className={C.variable}>data</span>.<span className={C.property}>desc</span><span className={C.punctuation}>{'}'}</span><span className={C.white}>&lt;/</span><span className={C.tag}>p</span><span className={C.white}>&gt;</span></Line>
        <Line num={12}><Indent level={2} /><span className={C.white}>&lt;/</span><span className={C.tag}>div</span><span className={C.white}>&gt;</span></Line>
        <Line num={13}><Indent />);</Line>
        <Line num={14}><span className={C.punctuation}>{'}'}</span></Line>
      </CodeBlock>
    )
  },
  vue: {
    custom: (
      <CodeBlock>
        <Line num={1}><span className={C.white}>&lt;</span><span className={C.tag}>template</span><span className={C.white}>&gt;</span></Line>
        <Line num={2}><Indent /><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>v-if</span>=<span className={C.string}>"loading"</span> <span className={C.attr}>class</span>=<span className={C.string}>"card"</span><span className={C.white}>&gt;</span></Line>
        <Line num={3}><Indent level={2} /><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>class</span>=<span className={C.string}>"skeleton h-8 w-3/4 mb-4"</span> <span className={C.white}>/&gt;</span></Line>
        <Line num={4}><Indent level={2} /><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>class</span>=<span className={C.string}>"skeleton h-4 w-full mb-2"</span> <span className={C.white}>/&gt;</span></Line>
        <Line num={5}><Indent level={2} /><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>class</span>=<span className={C.string}>"skeleton h-4 w-5/6"</span> <span className={C.white}>/&gt;</span></Line>
        <Line num={6}><Indent /><span className={C.white}>&lt;/</span><span className={C.tag}>div</span><span className={C.white}>&gt;</span></Line>
        <Line num={7}>&nbsp;</Line>
        <Line num={8}><Indent /><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>v-else</span> <span className={C.attr}>class</span>=<span className={C.string}>"card"</span><span className={C.white}>&gt;</span></Line>
        <Line num={9}><Indent level={2} /><span className={C.white}>&lt;</span><span className={C.tag}>h1</span><span className={C.white}>&gt;</span><span className={C.punctuation}>{'{'}</span><span className={C.punctuation}>{'{'}</span> <span className={C.variable}>title</span> <span className={C.punctuation}>{'}'}</span><span className={C.punctuation}>{'}'}</span><span className={C.white}>&lt;/</span><span className={C.tag}>h1</span><span className={C.white}>&gt;</span></Line>
        <Line num={10}><Indent level={2} /><span className={C.white}>&lt;</span><span className={C.tag}>p</span><span className={C.white}>&gt;</span><span className={C.punctuation}>{'{'}</span><span className={C.punctuation}>{'{'}</span> <span className={C.variable}>desc</span> <span className={C.punctuation}>{'}'}</span><span className={C.punctuation}>{'}'}</span><span className={C.white}>&lt;/</span><span className={C.tag}>p</span><span className={C.white}>&gt;</span></Line>
        <Line num={11}><Indent /><span className={C.white}>&lt;/</span><span className={C.tag}>div</span><span className={C.white}>&gt;</span></Line>
        <Line num={12}><span className={C.white}>&lt;/</span><span className={C.tag}>template</span><span className={C.white}>&gt;</span></Line>
      </CodeBlock>
    ),
    skulldom: (
      <CodeBlock>
        <Line num={1}><span className={C.white}>&lt;</span><span className={C.tag}>template</span><span className={C.white}>&gt;</span></Line>
        <Line num={2}><Indent /><span className={C.comment}>&lt;!-- Use v-skeleton directive --&gt;</span></Line>
        <Line num={3}><Indent /><span className={C.white}>&lt;</span><span className={C.tag}>div</span> <span className={C.attr}>v-skeleton</span>=<span className={C.string}>"loading"</span> <span className={C.attr}>class</span>=<span className={C.string}>"card"</span><span className={C.white}>&gt;</span></Line>
        <Line num={4}><Indent level={2} /><span className={C.white}>&lt;</span><span className={C.tag}>h1</span><span className={C.white}>&gt;</span><span className={C.punctuation}>{'{'}</span><span className={C.punctuation}>{'{'}</span> <span className={C.variable}>title</span> <span className={C.punctuation}>{'}'}</span><span className={C.punctuation}>{'}'}</span><span className={C.white}>&lt;/</span><span className={C.tag}>h1</span><span className={C.white}>&gt;</span></Line>
        <Line num={5}><Indent level={2} /><span className={C.white}>&lt;</span><span className={C.tag}>p</span><span className={C.white}>&gt;</span><span className={C.punctuation}>{'{'}</span><span className={C.punctuation}>{'{'}</span> <span className={C.variable}>desc</span> <span className={C.punctuation}>{'}'}</span><span className={C.punctuation}>{'}'}</span><span className={C.white}>&lt;/</span><span className={C.tag}>p</span><span className={C.white}>&gt;</span></Line>
        <Line num={6}><Indent /><span className={C.white}>&lt;/</span><span className={C.tag}>div</span><span className={C.white}>&gt;</span></Line>
        <Line num={7}><span className={C.white}>&lt;/</span><span className={C.tag}>template</span><span className={C.white}>&gt;</span></Line>
        <Line num={8}>&nbsp;</Line>
        <Line num={9}><span className={C.white}>&lt;</span><span className={C.tag}>script</span> <span className={C.attr}>setup</span><span className={C.white}>&gt;</span></Line>
        <Line num={10}><span className={C.control}>import</span> <span className={C.punctuation}>{'{'}</span> <span className={C.variable}>vSkeleton</span> <span className={C.punctuation}>{'}'}</span> <span className={C.control}>from</span> <span className={C.string}>'skull-dom/vue'</span>;</Line>
        <Line num={11}><span className={C.white}>&lt;/</span><span className={C.tag}>script</span><span className={C.white}>&gt;</span></Line>
      </CodeBlock>
    )
  }
};

// Raw text versions for copying
const rawSnippets = {
  vanilla: {
    custom: `/* CSS */
.skeleton {
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: shine 1.5s linear infinite;
}

/* HTML */
<div class="card">
  <div class="skeleton h-8 w-3/4 mb-4"></div>
  <div class="skeleton h-4 w-full mb-2"></div>
  <div class="skeleton h-4 w-5/6"></div>
</div>`,
    skulldom: `<!-- Just add data-skeleton attribute -->
<div class="card" data-skeleton>
  <h1>Title</h1>
  <p>Description text...</p>
</div>

<!-- That's it! SkullDOM handles the rest -->`
  },
  react: {
    custom: `function Card({ loading }) {
  if (loading) {
    return (
      <div className="card">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  return (
    <div className="card">
      <h1>{data.title}</h1>
      <p>{data.desc}</p>
    </div>
  );
}`,
    skulldom: `import { useSkeleton } from 'skull-dom/react';

function Card({ loading }) {
  const ref = useRef(null);
  // One hook to rule them all
  useSkeleton(ref, loading);

  return (
    <div ref={ref} className="card">
      <h1>{data.title}</h1>
      <p>{data.desc}</p>
    </div>
  );
}`
  },
  vue: {
    custom: `<template>
  <div v-if="loading" class="card">
    <div class="skeleton h-8 w-3/4 mb-4" />
    <div class="skeleton h-4 w-full mb-2" />
    <div class="skeleton h-4 w-5/6" />
  </div>
  
  <div v-else class="card">
    <h1>{{ title }}</h1>
    <p>{{ desc }}</p>
  </div>
</template>`,
    skulldom: `<template>
  <!-- Use v-skeleton directive -->
  <div v-skeleton="loading" class="card">
    <h1>{{ title }}</h1>
    <p>{{ desc }}</p>
  </div>
</template>

<script setup>
import { vSkeleton } from 'skull-dom/vue';
</script>`
  }
};

export default function CodeComparison() {
  const [framework, setFramework] = useState<Framework>('react');
  const [mode, setMode] = useState<Mode>('skulldom');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawSnippets[framework][mode]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl max-w-[90vw] md:max-w-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-neutral-800 gap-4">
        {/* Framework Tabs */}
        <div className="flex items-center p-1 bg-black rounded-lg border border-neutral-800 w-full md:w-auto overflow-x-auto no-scrollbar">
          {(['vanilla', 'react', 'vue'] as const).map((fw) => (
            <button
              key={fw}
              onClick={() => setFramework(fw)}
              className={cn(
                'flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all capitalize whitespace-nowrap',
                framework === fw
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-300'
              )}
            >
              {fw}
            </button>
          ))}
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <span className={cn("text-[10px] md:text-xs font-medium transition-colors text-right leading-tight", mode === 'custom' ? "text-white" : "text-neutral-500")}>
            Without<br className="sm:hidden" /> SkullDOM
          </span>
          <button
            onClick={() => setMode(prev => prev === 'custom' ? 'skulldom' : 'custom')}
            className={cn(
              "relative w-10 h-5 md:w-12 md:h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shrink-0",
              mode === 'skulldom' ? "bg-blue-600" : "bg-neutral-700"
            )}
            aria-label="Toggle mode"
          >
            <span
              className={cn(
                "absolute top-1 left-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-white transition-transform duration-300 shadow-sm",
                mode === 'skulldom' ? "translate-x-5 md:translate-x-6" : "translate-x-0"
              )}
            />
          </button>
          <span className={cn("text-[10px] md:text-xs font-medium transition-colors leading-tight", mode === 'skulldom' ? "text-blue-400" : "text-neutral-500")}>
            With<br className="sm:hidden" /> SkullDOM
          </span>
        </div>
      </div>

      {/* Code Window */}
      <div className="relative group bg-[#1e1e1e]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-[#1e1e1e]">
          <div className="flex gap-2 mr-4 shrink-0">
            <div className="w-3 h-3 bg-[#ff5f56] rounded-full" />
            <div className="w-3 h-3 bg-[#ffbd2e] rounded-full" />
            <div className="w-3 h-3 bg-[#27c93f] rounded-full" />
          </div>
          <div className="text-xs font-mono text-neutral-500 flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="opacity-50">src/</span>
            <span className="text-neutral-300">{framework === 'react' ? 'App.tsx' : framework === 'vue' ? 'App.vue' : 'index.html'}</span>
          </div>
        </div>
        
        <div className="relative max-h-[400px] overflow-y-auto custom-scrollbar bg-[#1e1e1e]">
           <div className="p-4 overflow-x-auto w-full">
            <div className="min-w-max">
              {snippets[framework][mode]}
            </div>
           </div>
          
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white bg-neutral-800/50 hover:bg-neutral-800 rounded-lg opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm border border-neutral-700/50"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-3 bg-neutral-900 border-t border-neutral-800 text-xs text-neutral-500 flex items-center justify-between">
        <span>{framework === 'react' ? 'React 18+' : framework === 'vue' ? 'Vue 3+' : 'Vanilla JS'}</span>
        {mode === 'skulldom' && (
          <span className="flex items-center gap-1.5 text-blue-400/80">
            <Check className="w-3 h-3" />
            Zero layout shift
          </span>
        )}
      </div>
    </div>
  );
}
