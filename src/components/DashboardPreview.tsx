import React, { useMemo, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from "recharts";
import { BarChart3, TrendingUp, Clock, Wallet, Bell, Search, Moon, Sun, MoreVertical, LayoutGrid, FolderKanban, Users, Receipt, Activity as ActivityIcon } from "lucide-react";

const revenueData = [
  { label: "2025-05", value: 3200000 },
  { label: "2025-06", value: 2800000 },
  { label: "2025-07", value: 4100000 },
  { label: "2025-08", value: 3600000 },
];

const statusData = [
  { label: "Todo", value: 8 },
  { label: "In Progress", value: 12 },
  { label: "Review", value: 4 },
  { label: "Done", value: 20 },
];

const upcomingDue = [
  { project: "브랜드 웹사이트 구축", client: "홍길동", due: "2025-08-20", priority: "High", assignee: "유민" },
  { project: "쇼핑몰 리디자인", client: "김동현", due: "2025-08-22", priority: "Medium", assignee: "유민" },
  { project: "랜딩 페이지 제작", client: "박찬호", due: "2025-08-28", priority: "High", assignee: "유민" },
  { project: "App 디자인 시안", client: "이수근", due: "2025-08-29", priority: "Low", assignee: "유민" },
  { project: "웹 템플릿 제작", client: "한혜진", due: "2025-08-29", priority: "Low", assignee: "유민" },
  { project: "SNS 콘텐츠 제작", client: "이서준", due: "2025-09-02", priority: "Medium", assignee: "유민" },
];

const activities = [
  { id: 1, text: "App 디자인 시안 → In Progress", time: "오늘 10:15" },
  { id: 2, text: "홍길동 송장 전송", time: "어제 18:02" },
  { id: 3, text: "@유민 댓글 추가", time: "어제 16:20" },
  { id: 4, text: "랜딩페이지 제작 → 시안 완료", time: "어제 11:44" },
  { id: 5, text: "랜딩 페이지 마감 변경 8/28", time: "2일 전" },
  { id: 6, text: "브랜드 웹사이트 구축 → 마감 작업", time: "2일 전" },
  { id: 7, text: "클라이언트 '이서준'생성", time: "2일 전" },
];

// ————————————————————————————————————————————
// UI helpers
// ————————————————————————————————————————————
function cn(...args: Array<string | false | undefined>) {
  return args.filter(Boolean).join(" ");
}

function Card({ className = "", children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn(
      "rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-card)] shadow-[0_2px_12px_rgba(0,0,0,.25)]",
      "dark:border-[#1F2937] dark:bg-[#0F172A]",
      className
    )}>
      {children}
    </div>
  );
}

function KPI({ icon, title, value, delta }: { icon: React.ReactNode; title: string; value: string; delta?: { dir: "up" | "down" | "flat"; text: string } }) {
  const deltaColor = delta?.dir === "up" ? "text-[#10B981]" : delta?.dir === "down" ? "text-[#EF4444]" : "text-gray-400";
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-[var(--text-muted)] dark:text-gray-400">{title}</div>
          <div className="mt-1 text-2xl font-bold tracking-tight tabular-nums text-[var(--text-primary)] dark:text-gray-100">{value}</div>
          {delta && (
            <div className={cn("mt-1 text-xs tabular-nums", deltaColor)}>{delta.text}</div>
          )}
        </div>
        <div className="opacity-70">{icon}</div>
      </div>
    </Card>
  );
}

function ChartCard({ title, toolbar, children }: React.PropsWithChildren<{ title: string; toolbar?: React.ReactNode }>) {
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] dark:text-gray-100">{title}</h3>
        <div>{toolbar}</div>
      </div>
      <div className="h-[280px]">
        {children}
      </div>
    </Card>
  );
}

function Badge({ kind, children }: { kind: "Low" | "Medium" | "High" | string; children: React.ReactNode }) {
  const color = kind === "High" ? "bg-[#FEE2E2] text-[#B91C1C] dark:bg-[#3b1e1e] dark:text-[#FCA5A5]" : kind === "Medium" ? "bg-[#FEF3C7] text-[#92400E] dark:bg-[#3a2e1a] dark:text-[#FCD34D]" : "bg-[#DCFCE7] text-[#065F46] dark:bg-[#173a33] dark:text-[#86efac]";
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium", color)}>{children}</span>;
}

const formatWon = (v: number | string) => {
  const n = typeof v === "number" ? v : Number(v);
  return `${new Intl.NumberFormat("ko-KR").format(n)}원`;
};

// ————————————————————————————————————————————
// Main App Shell
// ————————————————————————————————————————————
export default function DashboardPreview() {
  const [dark, setDark] = useState(true);
  const brand = "#6366F1"; // brand/500

  const gradientId = useMemo(() => `grad-${Math.random().toString(36).slice(2)}`, []);

  return (
    <div className={cn("min-h-screen text-[var(--text-primary)]", dark && "dark")}
      style={{
        "--bg-page": dark ? "#0B1220" : "#F8FAFC",
        "--bg-card": dark ? "#0F172A" : "#FFFFFF",
        "--text-primary": dark ? "#E5E7EB" : "#111827",
        "--text-muted": dark ? "#9CA3AF" : "#6B7280",
        "--stroke-soft": dark ? "#1F2937" : "#E5E7EB",
      } as React.CSSProperties}
    >
      {/* App Shell */}
      <div className="grid min-h-screen grid-cols-[240px_1fr] bg-[var(--bg-page)] transition-colors">
        {/* Sidebar */}
        <aside className="hidden border-r border-[var(--stroke-soft)] bg-[var(--bg-card)] md:block">
          <div className="p-4 text-lg font-semibold">FreelanceOps</div>
          <nav className="px-2 py-2 text-sm">
            <NavItem active icon={<LayoutGrid className="h-4 w-4" />}>Dashboard</NavItem>
            <NavItem icon={<FolderKanban className="h-4 w-4" />}>Projects</NavItem>
            <NavItem icon={<Users className="h-4 w-4" />}>Clients</NavItem>
            <NavItem icon={<Receipt className="h-4 w-4" />}>Invoices</NavItem>
            <NavItem icon={<ActivityIcon className="h-4 w-4" />}>Activities</NavItem>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex min-h-screen flex-col">
          {/* Header */}
          <header className="flex h-14 items-center justify-between border-b border-[var(--stroke-soft)] bg-[var(--bg-card)] px-4">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <Search className="h-4 w-4" />
              <input className="w-[260px] bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none" placeholder="검색 (⌘K)" />
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="알림 열기" title="알림 열기" className="rounded-xl border border-[var(--stroke-soft)] px-2 py-1 text-sm text-[var(--text-muted)]"><Bell className="h-4 w-4" /></button>
              <button className="rounded-xl border border-[var(--stroke-soft)] px-2 py-1 text-sm" onClick={() => setDark(v => !v)}>
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <div className="ml-2 flex items-center gap-2 rounded-xl border border-[var(--stroke-soft)] px-2 py-1">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600" />
                <span className="text-sm">yoomin</span>
                <MoreVertical className="h-4 w-4 opacity-60" />
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="mx-auto w-full flex-1 p-6">
            {/* KPI Row */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <KPI icon={<TrendingUp className="h-5 w-5" />} title="진행 중" value="24" delta={{ dir: "up", text: "▲ 12% MoM" }} />
              <KPI icon={<Clock className="h-5 w-5" />} title="지연" value="6" delta={{ dir: "down", text: "▼ 8%" }} />
              <KPI icon={<BarChart3 className="h-5 w-5" />} title="이번주 마감" value="9" />
              <KPI icon={<Wallet className="h-5 w-5" />} title="미수금" value={new Intl.NumberFormat("ko-KR").format(7500000) + "원"} />
            </div>

            {/* Charts Row */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <ChartCard title="월별 매출" toolbar={<Toolbar label="2025-05 ~ 2025-08" />}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ left: 8, right: 8, bottom: 0, top: 8 }}>
                      <defs>
                        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor={brand} stopOpacity={0.32} />
                          <stop offset="100%" stopColor={brand} stopOpacity={0.08} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                      <YAxis tickFormatter={(v) => `${Math.round(v / 10000)}만`} tick={{ fontSize: 12 }} />
                      <Tooltip
                        formatter={(value: number | string) => formatWon(value)}
                        labelFormatter={(label: string) => `기간: ${label}`}
                      />
                      <Area type="monotone" dataKey="value" stroke={brand} strokeWidth={2} fill={`url(#${gradientId})`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
              <div className="lg:col-span-4">
                <ChartCard title="상태별 프로젝트">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusData} margin={{ left: 8, right: 8, bottom: 0, top: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="개수" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            </div>

            {/* Lists Row */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Upcoming Due */}
              <Card className="lg:col-span-8">
                <div className="flex items-center justify-between border-b border-[var(--stroke-soft)] px-4 py-3">
                  <h3 className="text-sm font-semibold">이번주 마감</h3>
                  <button className="text-xs text-[var(--text-muted)]">모두 보기</button>
                </div>
                <div className="overflow-x-auto px-2 py-2">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="text-[13px] text-[var(--text-muted)]">
                        <th className="px-3 py-2">프로젝트</th>
                        <th className="px-3 py-2">클라이언트</th>
                        <th className="px-3 py-2">마감일</th>
                        <th className="px-3 py-2">우선도</th>
                        <th className="px-3 py-2">담당</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingDue.map((row, i) => (
                        <tr key={i} className="border-t border-[var(--stroke-soft)] hover:bg-white/5">
                          <td className="px-3 py-2 font-medium">{row.project}</td>
                          <td className="px-3 py-2">{row.client}</td>
                          <td className="px-3 py-2 tabular-nums">{row.due}</td>
                          <td className="px-3 py-2"><Badge kind={row.priority}>{row.priority}</Badge></td>
                          <td className="px-3 py-2">{row.assignee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Activity Feed */}
              <Card className="lg:col-span-4">
                <div className="flex items-center justify-between border-b border-[var(--stroke-soft)] px-4 py-3">
                  <h3 className="text-sm font-semibold">최근 활동</h3>
                  <button className="text-xs text-[var(--text-muted)]">모두 읽음</button>
                </div>
                <ul className="space-y-0.5 p-4">
                  {activities.map(item => (
                    <li key={item.id} className="flex items-start gap-3 rounded-xl p-2 hover:bg-white/5">
                      <div className="mt-0.5 h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                        <ActivityIcon className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="text-sm">{item.text}</div>
                        <div className="text-xs text-[var(--text-muted)]">{item.time}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, children, active = false }: { icon: React.ReactNode; children: React.ReactNode; active?: boolean }) {
  return (
    <a
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm",
        active
          ? "bg-indigo-500/15 text-indigo-300"
          : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-primary)]"
      )}
      href="#"
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}

function Toolbar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
      <span>{label}</span>
      <button className="rounded-md border border-[var(--stroke-soft)] px-2 py-1">CSV</button>
      <button className="rounded-md border border-[var(--stroke-soft)] px-2 py-1">다운로드</button>
    </div>
  );
}
