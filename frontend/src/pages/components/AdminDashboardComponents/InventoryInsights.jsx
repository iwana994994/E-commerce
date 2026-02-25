import { useEffect } from "react";
import { useProduct } from "../../../store/useProduct";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const PrettyTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/90 px-3 py-2 shadow-lg">
      <p className="text-sm text-white/70">{label}</p>
      <p className="text-lg font-semibold text-white">
        {payload[0].value}{" "}
        <span className="text-sm font-normal text-white/60">sold</span>
      </p>
    </div>
  );
};

const InventoryInsights = () => {
  const {
    totalProduct,
    productsOnSale,
    lowStockButNotZero,
    outOfStockTotal,
    getInsights,
    top5Products,
    top5,
  } = useProduct();

  useEffect(() => {
    getInsights();
    top5Products();
  }, []);

  return (
    <>
      {/* CARDS */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
            <p className="text-sm text-white/60">Total Products</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-bold">{totalProduct}</p>
              <span className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white/70">
                All
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
            <p className="text-sm text-white/60">Products on sale</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-bold">{productsOnSale}</p>
              <span className="text-xs px-2 py-1 rounded-full border border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
                SALE
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
            <p className="text-sm text-white/60">Low stock</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-bold">{lowStockButNotZero}</p>
              <span className="text-xs px-2 py-1 rounded-full border border-amber-400/20 bg-amber-500/10 text-amber-300">
                LOW
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
            <p className="text-sm text-white/60">Out of stock</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-bold">{outOfStockTotal}</p>
              <span className="text-xs px-2 py-1 rounded-full border border-red-400/20 bg-red-500/10 text-red-300">
                OUT
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BAR CHART TOP 5 */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Top 5 best-selling products</h2>
          <span className="text-xs text-white/60">This month</span>
        </div>

        {!top5 || top5.length === 0 ? (
          <p className="text-sm text-white/60">No data yet.</p>
        ) : (
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <BarChart
                data={top5}
                layout="vertical"
                margin={{ left: 24, right: 16, top: 8, bottom: 8 }}
                barCategoryGap={16}
              >
                {/* diskretna grid pozadina */}
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.12} />

                {/* ose + lepši tickovi */}
                <XAxis
                  type="number"
                  tick={{ fill: "#E5E7EB" }}
                  axisLine={{ strokeOpacity: 0.2 }}
                  tickLine={{ strokeOpacity: 0.2 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={170} // da se ne seku imena
                  tick={{ fill: "#E5E7EB" }}
                  axisLine={{ strokeOpacity: 0.2 }}
                  tickLine={{ strokeOpacity: 0.2 }}
                />

                {/* custom tooltip + hover highlight */}
                <Tooltip
                  content={<PrettyTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.06)" }}
                />

                {/* gradijent za bar */}
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>

                {/* bar: tanji, rounded, gradijent */}
                <Bar
                  dataKey="totalQuantity"
                  fill="url(#barGradient)"
                  barSize={12}
                  radius={[10, 10, 10, 10]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </>
  );
};

export default InventoryInsights;