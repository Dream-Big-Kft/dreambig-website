export function HeroCodePanel() {
  return (
    <div className="relative mx-auto mt-8 w-full max-w-sm lg:mt-0 lg:ml-auto lg:mr-0 lg:max-w-xl">
      <div className="relative mx-auto rounded-xl border border-border bg-slate-900 p-1 shadow-2xl">
        {/* Top bar */}
        <div className="hidden items-center gap-2 border-b border-slate-700 px-3 py-2 lg:flex lg:px-4 lg:py-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[11px] font-mono text-slate-400 lg:text-xs">
              api-service.ts
            </span>
          </div>
        </div>

        {/* Code content */}
        <div className="overflow-hidden p-3 font-mono text-[11px] lg:p-4 lg:text-sm">
          <pre className="overflow-hidden text-slate-300">
            <code>
              <span className="text-pink-400">import</span>
              {" { "}
              <span className="text-sky-400">createServer</span>
              {" } "}
              <span className="text-pink-400">from</span>{" "}
              <span className="text-green-400">{`'@api/core'`}</span>
              {"\n"}
              <span className="text-pink-400">import</span>
              {" { "}
              <span className="text-sky-400">auth</span>
              {", "}
              <span className="text-sky-400">rateLimit</span>
              {" } "}
              <span className="text-pink-400">from</span>{" "}
              <span className="text-green-400">{`'@middleware'`}</span>
              {"\n\n"}
              <span className="text-pink-400">const</span>{" "}
              <span className="text-sky-400">app</span>
              {" = "}
              <span className="text-yellow-400">createServer</span>
              {"({\n"}
              {"  "}
              <span className="text-slate-100">port</span>
              {": "}
              <span className="text-orange-400">3000</span>
              {",\n"}
              {"  "}
              <span className="text-slate-100">middleware</span>
              {": ["}
              <span className="text-sky-400">auth</span>
              {", "}
              <span className="text-sky-400">rateLimit</span>
              {"],\n"}
              {"  "}
              <span className="text-slate-100">cors</span>
              {": "}
              <span className="text-orange-400">true</span>
              {",\n"}
              {"})\n\n"}
              <span className="text-sky-400">app</span>
              {"."}
              <span className="text-yellow-400">get</span>
              {"("}
              <span className="text-green-400">{`'/api/health'`}</span>
              {", () => ({\n"}
              {"  "}
              <span className="text-slate-100">status</span>
              {": "}
              <span className="text-green-400">{`'healthy'`}</span>
              {",\n"}
              {"  "}
              <span className="text-slate-100">uptime</span>
              {": "}
              <span className="text-sky-400">process</span>
              {"."}
              <span className="text-yellow-400">uptime</span>
              {"()\n"}
              {"}))\n\n"}
              <span className="text-slate-500">{"// Production ready"}</span>
            </code>
          </pre>
        </div>
      </div>

      {/* Floating stats card */}
      <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 rounded-lg border border-border bg-card p-3 shadow-xl lg:-bottom-8 lg:left-auto lg:-left-8 lg:translate-x-0 lg:p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10 lg:h-10 lg:w-10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm lg:text-base">
              99.9% Uptime
            </p>
            <p className="text-muted-foreground text-sm text-sm lg:text-base">
              Production Systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
