import { Sparkles, Layers, Zap } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-6 h-6 text-blue-600" />,
    title: "Framework Agnostic",
    desc: "Works with React, Vue, Svelte, Solid, and Vanilla JS. One library to rule them all."
  },
  {
    icon: <Layers className="w-6 h-6 text-purple-600" />,
    title: "Zero Layout Shift",
    desc: "The skeleton overlays perfectly on top of your existing elements. No jumping content."
  },
  {
    icon: <Zap className="w-6 h-6 text-green-600" />,
    title: "Performance First",
    desc: "Uses WeakMaps for memory safety and CSS transformations for 60fps animations."
  }
];

export default function FeaturesGrid() {
  return (
    <section className="features-section py-24 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="feature-card card-modern p-8 group">
              <div className="mb-4 w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
