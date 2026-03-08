import type { PortfolioItem } from "../types/gallery";

export function InfoView({ data }: { data: PortfolioItem }) {
  return (
    <div className="relative flex flex-col h-full bg-zinc-900 text-white overflow-hidden p-8">
      <div className="mt-8 mb-6">
        <h2 className="text-3xl font-black tracking-tighter uppercase text-white drop-shadow-sm mb-4">
          {data.descriptionTitle}
        </h2>
        <div className="h-1 w-12 bg-white/20 mb-6 rounded-full" />
        <p className="text-zinc-300 text-[15px] leading-relaxed mb-8">
          {data.descriptionText}
        </p>
      </div>

      <div className="mt-auto">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {data.technologies.map(tech => (
            <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-zinc-200 backdrop-blur-sm border border-white/5">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
