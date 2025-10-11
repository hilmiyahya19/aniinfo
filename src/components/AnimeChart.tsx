// src/components/AnimeChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

interface AnimeChartProps {
  data: {
    title: string;
    score: number;
  }[];
}

const COLORS = [
  "#6366F1", // indigo
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#F59E0B", // amber
  "#10B981", // emerald
  "#3B82F6", // blue
  "#F43F5E", // rose
  "#06B6D4", // cyan
  "#84CC16", // lime
  "#EAB308", // yellow
];

export default function AnimeChart({ data }: AnimeChartProps) {
  return (
    <motion.div
      className="w-full bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        🔥 Top 10 Anime Terbaik (Berdasarkan Skor)
      </h2>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#A855F7" stopOpacity={0.9} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis
              dataKey="title"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={80}
              tick={{ fill: "#555", fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 10]}
              tick={{ fill: "#555", fontSize: 12 }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                border: "none",
              }}
              labelStyle={{ color: "#6B21A8", fontWeight: 600 }}
              cursor={{ fill: "rgba(99,102,241,0.1)" }}
            />
            <Legend
              wrapperStyle={{
                bottom: 0,
                fontSize: "14px",
                color: "#374151",
              }}
            />

            <Bar
              dataKey="score"
              name="Skor"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
        Data diambil berdasarkan rating pengguna — semakin tinggi, semakin keren! 🌟
      </p>
    </motion.div>
  );
}
