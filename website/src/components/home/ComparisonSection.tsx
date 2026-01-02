import { X, Check, Sparkles } from 'lucide-react';

const comparisons = [
  {
    feature: "Component Creation",
    custom: "Build separate skeleton components for every UI element",
    skulldom: "Automatic skeleton generation from existing DOM"
  },
  {
    feature: "Styling Maintenance",
    custom: "Duplicate and sync styles between real and skeleton components",
    skulldom: "Zero style duplication - uses your existing styles"
  },
  {
    feature: "Layout Shifts",
    custom: "Constant tweaking to prevent content jumping",
    skulldom: "Pixel-perfect overlays with zero layout shift"
  },
  {
    feature: "Updates & Changes",
    custom: "Every UI change requires updating skeleton counterparts",
    skulldom: "Skeletons auto-update when you change your UI"
  },
  {
    feature: "Integration Time",
    custom: "Hours of setup and configuration per component",
    skulldom: "One-line integration - add attribute or hook"
  },
  {
    feature: "Bundle Size",
    custom: "Grows with every new skeleton component",
    skulldom: "Tiny footprint - zero dependencies"
  }
];

const futureFeatures = [
  {
    title: "AI-Powered Optimization",
    description: "Smart skeleton patterns based on content type detection",
    status: "Planned"
  },
  {
    title: "Theme Customization",
    description: "Built-in themes and custom animation presets",
    status: "Planned"
  },
  {
    title: "DevTools Extension",
    description: "Visual skeleton editor and performance profiler",
    status: "In Development"
  },
  {
    title: "SSR Optimization",
    description: "Server-side skeleton generation for instant FCP",
    status: "Planned"
  }
];

export default function ComparisonSection() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-neutral-900 rounded-full">
            <Sparkles className="w-4 h-4 text-neutral-300" />
            <span className="text-sm font-semibold text-neutral-300">The Smart Choice</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Why SkullDOM?
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Stop wasting time on manual skeleton screens. SkullDOM automates everything.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mb-20 rounded-xl border border-neutral-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Feature</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white border-l border-neutral-800">
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4 text-neutral-400" />
                    Custom Skeleton Pattern
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white border-l border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-neutral-400" />
                    SkullDOM
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-black">
              {comparisons.map((item, i) => (
                <tr key={i} className="border-b border-neutral-800 last:border-0 hover:bg-neutral-950 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap">
                    {item.feature}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-400 border-l border-neutral-800">
                    {item.custom}
                  </td>
                  <td className="px-6 py-4 text-sm text-white border-l border-neutral-800 font-medium">
                    {item.skulldom}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Future Features */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Professional Features
            </h3>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              We're building the most advanced skeleton loading library. Here's what's coming.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureFeatures.map((feature, i) => (
              <div
                key={i}
                className="card-modern p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-neutral-900 text-neutral-300 rounded-full mb-3">
                    {feature.status}
                  </span>
                  <h4 className="text-lg font-bold text-white">{feature.title}</h4>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
