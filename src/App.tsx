import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Plane, 
  User, 
  Activity, 
  AlertCircle, 
  Layers,
  CheckCircle2,
  XCircle,
  TrendingDown,
  Wind,
  ArrowRight,
  BarChart3,
  Smartphone,
  Quote,
  Target,
  Scale,
  Zap,
  Info,
  Search,
  MessageSquare
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type LayoutType = 
  | 'cover' 
  | 'section' 
  | 'split' 
  | 'comparison' 
  | 'bento' 
  | 'data' 
  | 'medical-data'
  | 'quote' 
  | 'flow' 
  | 'grid'
  | 'end';

type ThemeBg = 'light' | 'dark' | 'accent' | 'split' | 'soft' | 'sky';

interface SlideData {
  id: number;
  section: string;
  title: string;
  subtitle?: string;
  layout: LayoutType;
  bgType: ThemeBg;
  content: string[];
  visualDesc: string;
  footer: string;
}

// --- Content Data ---
const slides: SlideData[] = [
  {
    id: 1,
    section: "PROJECT START",
    title: "窄体客机中长途航线：客舱座椅抗疲劳交互系统设计优化",
    subtitle: "A321LR/XLR 中长途化背景下的客座体验重塑",
    layout: "cover",
    bgType: "accent",
    content: ["重量置换", "物理干预", "BYOD 引导"],
    visualDesc: "全景渲染大图",
    footer: "交互设计 / 工业设计"
  },
  {
    id: 2,
    section: "CONTEXT",
    title: "窄体客机中长途飞行的常态化",
    layout: "split",
    bgType: "light",
    content: [
      "A321LR/XLR 使得单通道飞机跨洋航行成为主流。",
      "窄体空间与长航时疲劳的尖锐矛盾。",
      "极致轻量化是设计的唯一出路。"
    ],
    visualDesc: "航线网络覆盖图",
    footer: "01 项目背景"
  },
  {
    id: 3,
    section: "MARKET TREND",
    title: "超级经济舱崛起与 IFE 冗余化",
    layout: "bento",
    bgType: "soft",
    content: [
      "物理舒适度需求远超电子娱乐。",
      "BYOD (自带设备) 占据 85% 以上航时。",
      "移除冗余屏幕，释放 3-5kg 载荷。"
    ],
    visualDesc: "使用习惯对比图",
    footer: "01 项目背景"
  },
  {
    id: 4,
    section: "PROBLEM",
    title: "系统性错配：旧载体与新习惯",
    layout: "split",
    bgType: "dark",
    content: [
      "入口错配：座椅支持屏幕，用户手持设备。",
      "支撑错配：长途需要抬腿，物理空间禁止硬踏。",
      "安全错配：旅客自发补偿行为干扰撤离空间。"
    ],
    visualDesc: "受力与姿态错位图",
    footer: "01 问题定义"
  },
  {
    id: 5,
    section: "RESEARCH",
    title: "研究方法：从行为切片到生理反馈",
    layout: "section",
    bgType: "sky",
    content: ["深度访谈", "观察实验", "生理采样"],
    visualDesc: "研究框架图",
    footer: "02 用户研究"
  },
  {
    id: 6,
    section: "JOURNEY",
    title: "用户旅程：疲劳度的指数演变",
    layout: "data",
    bgType: "light",
    content: [
      "2h-4h：由于血液回流减慢，下肢开始出现隐痛。",
      "4h+：核心负面情绪爆发，极度渴望改变腿部夹角。"
    ],
    visualDesc: "疲劳曲线与生理拐点",
    footer: "02 用户研究"
  },
  {
    id: 7,
    section: "VOICE",
    title: "用户原声：对“抬腿”动作的本能渴求",
    layout: "quote",
    bgType: "split",
    content: [
      "“如果能把脚垫高一点点，哪怕只是踩在包上也会舒服很多。”",
      "“现有的脚踏太硬了，反而在顶着我的脚踝。”"
    ],
    visualDesc: "关键词提取卡片",
    footer: "02 用户研究"
  },
  {
    id: 8,
    section: "DATA",
    title: "医学证据：微抬 15° 的循环价值",
    layout: "data",
    bgType: "dark",
    content: [
      "静脉返流速度显著提升 20% 以上。",
      "腓肠肌 EMG 活跃度降低 18%。",
      "结论：微抬支撑面是最高效的疲劳解决方案。"
    ],
    visualDesc: "肌电与血压热力图",
    footer: "02 用户研究"
  },
  {
    id: 9,
    section: "MEDICAL EVIDENCE",
    title: "临床数据：久坐对下肢循环的生理损害",
    layout: "medical-data",
    bgType: "soft",
    content: [
      "连续静坐会降低下肢血流剪切率与血管舒张功能。",
      "即使轻微活动也能明显减少腿部肿胀。",
      "飞行时间超过 4-8 小时，VTE 风险显著上升。"
    ],
    visualDesc: "生理循环与血栓风险分析",
    footer: "02 用户研究"
  },
  {
    id: 10,
    section: "EXPLORATION",
    title: "迭代过程：被弃用的硬性路径",
    layout: "comparison",
    bgType: "soft",
    content: [
      "硬质翻转架：太重且有碰撞安全隐患。",
      "充气气囊：维护繁琐，稳定性极差。"
    ],
    visualDesc: "方案权衡矩阵",
    footer: "03 方案探索"
  },
  {
    id: 11,
    section: "STRATEGY",
    title: "路径切换：从独立构件到系统置换",
    layout: "flow",
    bgType: "sky",
    content: [
      "移除 IFE 核心硬件重量",
      "引入张力物理支撑系统",
      "建立 BYOD 交互连接"
    ],
    visualDesc: "重量流向转换图",
    footer: "03 方案探索"
  },
  {
    id: 12,
    section: "SYSTEM",
    title: "最终方案：窄体机抗疲劳交互系统",
    layout: "section",
    bgType: "accent",
    content: ["张理结构", "动态引导", "无感收纳"],
    visualDesc: "产品全视图渲染",
    footer: "04 最终方案"
  },
  {
    id: 13,
    section: "HARDWARE",
    title: "核心构件：张力腿部支撑面",
    layout: "split",
    bgType: "light",
    content: [
      "材料：全抗菌芳纶复合织物。",
      "原理：利用结构张力产生曲面承托。",
      "安全：无硬质边缘，符合 HIC 头部碰撞指标。"
    ],
    visualDesc: "结构拆解与受力图",
    footer: "04 方案详情"
  },
  {
    id: 14,
    section: "STORAGE",
    title: "空间极致：零入侵的收纳逻辑",
    layout: "split",
    bgType: "soft",
    content: [
      "折叠厚度 < 10mm，完全收纳于前排凹槽。",
      "磁吸式复位机制，确保撤离通道通畅。"
    ],
    visualDesc: "收纳状态剖视图",
    footer: "04 方案详情"
  },
  {
    id: 15,
    section: "INTERACTION",
    title: "BYOD 岛：重定义的椅背界面",
    layout: "bento",
    bgType: "dark",
    content: [
      "磁吸充电模组整合。",
      "NFC 快速配对局域网。",
      "多位移设备支架。"
    ],
    visualDesc: "交互模块细部图",
    footer: "05 交互逻辑"
  },
  {
    id: 16,
    section: "SCENARIO",
    title: "情境管理：发餐与休憩的引导",
    layout: "flow",
    bgType: "sky",
    content: [
      "点餐推送触发提醒",
      "饭后自动进入观影引导",
      "疲劳值感知推送腿托提醒"
    ],
    visualDesc: "场景状态流转图",
    footer: "05 交互逻辑"
  },
  {
    id: 17,
    section: "SAFETY",
    title: "安全第一：情境驱动的复位干预",
    layout: "grid",
    bgType: "dark",
    content: [
      "起降阶段：强制提醒收纳。",
      "视觉反馈：手机端高亮警示。",
      "状态感知：传感器硬联动管控。"
    ],
    visualDesc: "安全 UI 与传感器逻辑",
    footer: "05 交互逻辑"
  },
  {
    id: 18,
    section: "VALUE",
    title: "系统价值：多方共赢的平衡",
    layout: "grid",
    bgType: "light",
    content: [
      "用户：体感与姿态的极大解放。",
      "航司：数百公斤减重带动的节油效应。",
      "运维：零机械关节带来的低故障率。"
    ],
    visualDesc: "价值模型雷达图",
    footer: "06 价值总结"
  },
  {
    id: 19,
    section: "SUMMARY",
    title: "变革：从座椅硬件到行为接口",
    layout: "end",
    bgType: "accent",
    content: [
      "汇报人：[您的名字]",
      "专业：工业设计",
      "谢谢聆听与指导"
    ],
    visualDesc: "全舱氛围大图",
    footer: "FINISH"
  }
];

// --- Sub-components for Layouts ---

const LayoutWrapper = ({ slide, children }: { slide: SlideData, children: React.ReactNode }) => {
  const getBgClass = () => {
    switch (slide.bgType) {
      case 'dark': return 'bg-[#1e2023] text-white';
      case 'accent': return 'bg-gradient-to-br from-[#c8def1] to-[#a8c7e0] text-[#1a2b3c]';
      case 'soft': return 'bg-[#eaeff2] text-[#4a5568]';
      case 'sky': return 'bg-[#e2edf3] text-[#2d3748]';
      case 'split': return 'bg-white text-zinc-900';
      case 'light':
      default: return 'bg-[#ffffff] text-zinc-900';
    }
  };

  return (
    <div className={cn("w-full h-full relative overflow-hidden flex flex-col transition-all duration-1000", getBgClass())}>
      {/* Organic Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Right Blob */}
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            "absolute -top-[15%] -right-[10%] w-[65%] aspect-square rounded-full blur-[140px]",
            slide.bgType === 'dark' ? 'bg-[#3b424d]/40' : 'bg-[#d8e7f1]/70'
          )} 
        />
        {/* Bottom Left Blob */}
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            "absolute -bottom-[20%] -left-[15%] w-[80%] aspect-square rounded-full blur-[160px]",
            slide.bgType === 'dark' ? 'bg-[#2d333b]/50' : 'bg-[#e8f1f8]/90'
          )} 
        />
        
        {/* Sidebar Curve Decorator (from reference) */}
        {slide.id % 3 === 0 && slide.bgType !== 'dark' && (
          <div className="absolute right-0 inset-y-0 w-1/4 pointer-events-none opacity-30">
            <div className="h-full w-full bg-gradient-to-l from-[#bed6e2] to-transparent rounded-l-[100%]" />
          </div>
        )}
      </div>

      {/* Slide Index Decorator (Floating Number) */}
      <div className={cn(
        "absolute top-8 right-24 flex flex-col items-end transition-opacity duration-1000",
        slide.bgType === 'dark' ? 'opacity-[0.03]' : 'opacity-[0.06]'
      )}>
         <span className="text-[12rem] font-black leading-none tracking-tighter select-none opacity-10">
           {slide.id.toString().padStart(2, '0')}
         </span>
         <div className="h-[2px] w-[200px] bg-current" />
      </div>
      
      <div className="flex-1 relative z-10 flex flex-col pt-24 px-28 pb-28">
         {/* Top Branding Section */}
         <div className="mb-14 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className={cn(
                "px-5 py-2 text-[9px] font-black tracking-[0.4em] uppercase rounded-full shadow-lg", 
                slide.bgType === 'dark' ? 'bg-[#4a7c92] text-white' : 'bg-[#1a2b3c] text-white'
              )}>
                 {slide.section}
              </span>
              <div className={cn("h-[1px] w-20 opacity-20", slide.bgType === 'dark' ? 'bg-white' : 'bg-black')} />
            </div>
            {/* Minimal Logo (Reference Style) */}
            <div className="flex items-center gap-2 opacity-30">
               <Plane size={14} className="rotate-45" />
               <span className="text-[10px] font-bold tracking-[0.3em]">AIR CABIN SYSTEM INTERVENTION</span>
            </div>
         </div>
         {children}
      </div>

      {/* Footer Branded Bar */}
      <div className={cn(
        "absolute bottom-12 left-28 right-28 flex justify-between items-center text-[10px] font-mono tracking-[0.3em] uppercase transition-all duration-1000",
        slide.bgType === 'dark' ? 'text-white/20' : 'text-[#4a7c92]/60'
      )}>
         <div className="flex items-center gap-6">
            <div className="flex gap-1.5">
               {[1, 2, 3].map(v => <div key={v} className="w-1 h-1 rounded-full bg-current opacity-40" />)}
            </div>
            <span>{slide.footer}</span>
         </div>
         <div className="flex gap-20 items-center">
            <div className="flex flex-col items-end gap-1">
               <span className="font-bold">2026</span>
               <div className="h-[1px] w-12 bg-current opacity-30" />
            </div>
            <span className="opacity-40">{slide.id.toString().padStart(2, '0')} / {slides.length}</span>
         </div>
      </div>
    </div>
  );
};

const Cover = ({ slide }: { slide: SlideData }) => (
  <div className="flex flex-col justify-center items-start h-full max-w-4xl">
     <motion.div 
       initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
       className="mb-10 p-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50"
     >
        <Plane size={32} className="text-[#4a7c92]" />
     </motion.div>
     <motion.h1 
       initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
       className="text-6xl font-black mb-8 leading-[1.1] tracking-tight"
     >
       {slide.title}
     </motion.h1>
     <motion.p 
       initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
       className="text-2xl text-zinc-700 font-medium mb-16"
     >
       {slide.subtitle}
     </motion.p>
     <div className="flex gap-6">
        {slide.content.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span className="text-zinc-800 font-bold tracking-widest uppercase text-xs">{c}</span>
          </div>
        ))}
     </div>
  </div>
);

const Section = ({ slide }: { slide: SlideData }) => (
  <div className="flex-1 flex flex-col justify-center items-center text-center">
    <motion.div 
      initial={{ scale: 0 }} animate={{ scale: 1 }}
      className="w-16 h-1 bg-zinc-800 mb-12" 
    />
    <h2 className="text-7xl font-black mb-12 max-w-5xl leading-tight">{slide.title}</h2>
    <div className="flex gap-8">
       {slide.content.map((c, i) => (
         <p key={i} className="text-zinc-600 text-xl font-medium">{c}</p>
       ))}
    </div>
  </div>
);

const Split = ({ slide }: { slide: SlideData }) => (
  <div className="flex-1 flex items-center gap-32">
    <div className="flex-1 space-y-14">
       <div className="space-y-4">
         <div className="w-12 h-1 bg-[#4a7c92] opacity-30" />
         <h2 className="text-6xl font-black leading-tight tracking-tight">{slide.title}</h2>
       </div>
       <div className="space-y-8">
          {slide.content.map((c, i) => (
            <motion.div 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="flex gap-8 group"
            >
               <div className="mt-3 w-3 h-3 rounded-full shrink-0 border-2 border-[#4a7c92]" />
               <p className="text-2xl leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity font-medium">{c}</p>
            </motion.div>
          ))}
       </div>
    </div>
    {/* Visual Container with Circular Mask Aesthetic */}
    <div className="flex-1 h-full relative flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border border-[#4a7c92]/5 rounded-full" />
      <div className="relative w-full aspect-square max-w-lg">
        {/* Large Decorative Circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-[#cbdbe6]/20 rounded-full shadow-2xl border border-white/50 overflow-hidden group">
           {/* Moving Pattern */}
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 opacity-[0.03] bg-[size:20px_20px] bg-[radial-gradient(circle,#000_1px,transparent_1px)]"
           />
           {/* Icon with Mask */}
           <div className="absolute inset-0 flex flex-col items-center justify-center p-16 text-center">
              <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-6">
                 {getVisualIcon(slide.id)}
              </div>
              <p className="text-[#4a7c92] text-[10px] font-black uppercase tracking-[0.5em] mb-4 opacity-50">Visual Context</p>
              <div className="w-full flex-1 border border-dashed border-[#4a7c92]/20 rounded-3xl flex flex-col items-center justify-center p-8 bg-[#f8fafb]">
                  <Search size={32} className="text-[#4a7c92]/20 mb-4" />
                  <span className="text-xs text-[#4a7c92]/40 font-mono italic">{slide.visualDesc}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const MedicalDataLayout = ({ slide }: { slide: SlideData }) => {
  const chart1Data = [
    { x: 0, v: 100, f: 100 },
    { x: 60, v: 89, f: 95 },
    { x: 120, v: 78, f: 88 },
    { x: 180, v: 70, f: 82 },
  ];

  const chart2Data = [
    { label: "静止不动", value: 1.32, color: "#e53e3e" },
    { label: "踝关节运动", value: 0.80, color: "#4a7c92" },
    { label: "髋部运动", value: 0.61, color: "#2d333b" },
  ];

  return (
    <div className="flex-1 flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="w-16 h-1.5 bg-[#4a7c92] rounded-full" />
          <h2 className="text-5xl font-black tracking-tight">{slide.title}</h2>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-black opacity-30 tracking-[0.2em]">
          <Activity size={16} />
          <span>PHYSIOLOGICAL STRESS ANALYSIS</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
        {/* Chart 1: Line Chart */}
        <div className="col-span-12 lg:col-span-5 bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/80 shadow-xl flex flex-col">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-sm font-black uppercase tracking-wider mb-1">图表 1 | 久坐导致下肢血流功能下降</p>
              <p className="text-[10px] text-zinc-400 font-medium">来源：Restaino et al., 2015</p>
            </div>
          </div>
          
          <div className="flex-1 relative mt-4">
            <svg viewBox="0 0 300 150" className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map(v => (
                <line key={v} x1="0" y1={150 - v*1.5} x2="300" y2={150 - v*1.5} stroke="#000" strokeOpacity="0.05" strokeWidth="1" />
              ))}
              {/* Chart Lines */}
              <motion.path 
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }}
                d={`M ${chart1Data.map((d, i) => `${(i/3)*300} ${150 - d.v*1.5}`).join(' L ')}`}
                fill="none" stroke="#4a7c92" strokeWidth="3" strokeLinecap="round"
              />
              <motion.path 
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                d={`M ${chart1Data.map((d, i) => `${(i/3)*300} ${150 - d.f*1.5}`).join(' L ')}`}
                fill="none" stroke="#e53e3e" strokeWidth="3" strokeDasharray="4 4" opacity="0.4"
              />
              {/* Dots */}
              {chart1Data.map((d, i) => (
                <circle key={i} cx={(i/3)*300} cy={150 - d.v*1.5} r="4" fill="white" stroke="#4a7c92" strokeWidth="2" />
              ))}
            </svg>
            <div className="absolute bottom-[-25px] left-0 right-0 flex justify-between text-[8px] font-bold opacity-30">
               <span>0 min</span>
               <span>60 min</span>
               <span>120 min</span>
               <span>180 min</span>
            </div>
          </div>

          <div className="mt-12 space-y-3">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4a7c92]" />
                <p className="text-[11px] font-bold opacity-60">血管舒张功能 (FMD) 每小时下降 5.6%</p>
             </div>
             <p className="text-[10px] leading-relaxed opacity-40">长时间静坐会持续降低血流剪切率与血管舒张功能，下肢血栓风险在 3 小时内持续累积。</p>
          </div>
        </div>

        {/* Chart 2: Bar Chart */}
        <div className="col-span-12 lg:col-span-4 bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/80 shadow-xl flex flex-col">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-sm font-black uppercase tracking-wider mb-1">图表 2 | 不同状态对腿部肿胀影响</p>
              <p className="text-[10px] text-zinc-400 font-medium tracking-tight">小腿围增长率 (%) | Seo et al., 2012</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8">
             {chart2Data.map((d, i) => (
               <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest opacity-60">
                    <span>{d.label}</span>
                    <span className="text-zinc-900">{d.value}%</span>
                  </div>
                  <div className="h-4 bg-zinc-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${(d.value / 1.5) * 100}%` }} 
                      transition={{ delay: i * 0.2, duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                  </div>
               </div>
             ))}
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-100 flex items-start gap-3">
             <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
               <AlertCircle size={16} className="text-orange-600" />
             </div>
             <p className="text-[10px] leading-relaxed opacity-60">即便极轻微运动也能减少约 <span className="font-bold text-zinc-900">40%-54%</span> 的液体聚集，久坐则是水肿的主因。</p>
          </div>
        </div>

        {/* Chart 3: VTE Risk */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
           <div className="flex-1 bg-[#1a2b3c] text-white rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden relative group">
              <div className="relative z-10">
                <p className="text-xs font-black tracking-[0.2em] uppercase opacity-40 mb-6">Chart 3 | VTE Risk Elevation</p>
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] opacity-40 uppercase font-bold tracking-widest">Flight Time</span>
                      <span className="text-[10px] opacity-40 uppercase font-bold tracking-widest">Risk Change</span>
                   </div>
                   <div className="h-px bg-white/10" />
                   {[
                     { t: "< 4h", r: "较低风险", pulse: false },
                     { t: "> 4h", r: "风险上升", pulse: true },
                     { t: "> 8h", r: "中等风险 (0.5%)", pulse: true, color: "#f87171" }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between">
                        <span className="text-sm font-black">{item.t}</span>
                        <div className="flex items-center gap-2">
                           {item.pulse && <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", i === 1 ? "bg-yellow-400" : "bg-red-500")} />}
                           <span className="text-xs font-bold" style={{ color: item.color || undefined, opacity: item.color ? 1 : 0.6 }}>{item.r}</span>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
              <div className="mt-8 py-4 px-6 bg-white/5 rounded-2xl border border-white/10">
                 <p className="text-[10px] leading-tight opacity-50 italic">长时间跨洲际旅行，整体血栓风险增加 <span className="text-white opacity-100 font-black">2–4</span> 倍。</p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
           </div>

           <div className="bg-[#cbdbe6] rounded-[2.5rem] p-8 flex items-center gap-6">
              <div className="w-14 h-14 bg-white/50 rounded-2xl flex items-center justify-center shrink-0">
                 <CheckCircle2 size={24} className="text-[#1a2b3c]" />
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-none">Recommendation</p>
                 <p className="text-sm font-black text-[#1a2b3c]">下肢微抬可显著加速血液流回心脏，降低末梢血管压力。</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Bento = ({ slide }: { slide: SlideData }) => (
  <div className="flex-1 grid grid-cols-12 grid-rows-6 gap-8">
    <div className="col-span-12 row-span-2 flex flex-col justify-end">
       <h2 className="text-6xl font-black tracking-tight mb-4">{slide.title}</h2>
       <div className="h-1 w-24 bg-[#4a7c92]" />
    </div>
    <div className="col-span-7 row-span-4 bg-white/60 backdrop-blur-md rounded-[3rem] p-16 border border-white/80 shadow-xl flex flex-col justify-center gap-8">
       {slide.content.map((c, i) => (
         <div key={i} className="flex items-start gap-6">
            <div className="w-8 h-8 rounded-xl bg-[#4a7c92]/10 flex items-center justify-center shrink-0">
               <div className="w-2 h-2 rounded-full bg-[#4a7c92]" />
            </div>
            <p className="text-2xl font-medium leading-relaxed opacity-80">{c}</p>
         </div>
       ))}
    </div>
    <div className="col-span-5 row-span-2 bg-[#1a2b3c] rounded-[3rem] p-10 flex flex-col items-center justify-center text-white overflow-hidden relative group">
       <div className="relative z-10 text-center">
         <BarChart3 size={40} className="mx-auto mb-4 opacity-50 group-hover:scale-125 transition-transform" />
         <p className="text-[10px] font-bold tracking-widest uppercase opacity-40">System Efficiency</p>
       </div>
       <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100%]" />
    </div>
    <div className="col-span-5 row-span-2 bg-[#cbdbe6] rounded-[3rem] p-10 flex items-center justify-center relative overflow-hidden group/item">
       <motion.div 
         animate={{ scale: [1, 1.1, 1] }} 
         transition={{ duration: 10, repeat: Infinity }}
         className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff55_0%,transparent:70%)]" 
       />
       <p className="text-[#1a2b3c] font-mono text-xs text-center leading-relaxed font-black z-10 opacity-70 group-hover/item:opacity-100 transition-opacity">
          DESIGNED FOR<br/>EXTENDED FLIGHT<br/>DYNAMICS
       </p>
    </div>
  </div>
);

const DataLayout = ({ slide }: { slide: SlideData }) => (
  <div className="flex-1 flex gap-24">
    <div className="flex-1 flex flex-col justify-center space-y-12">
       <div className="space-y-4">
         <div className="w-16 h-1.5 bg-[#4a7c92] rounded-full" />
         <h2 className="text-6xl font-black tracking-tighter leading-tight">{slide.title}</h2>
       </div>
       <div className="space-y-8">
          {slide.content.map((c, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-[#4a7c92] font-mono font-bold text-xl opacity-30 select-none">/ 0{i+1}</span>
              <p className="text-2xl font-bold opacity-60">{c}</p>
            </div>
          ))}
       </div>
    </div>
    <div className="flex-[1.4] bg-white/40 backdrop-blur-2xl rounded-[4.5rem] border border-white/60 p-20 flex flex-col gap-12 relative shadow-2xl overflow-hidden">
       {/* Decorative Gradient Background */}
       <div className="absolute inset-0 bg-gradient-to-tr from-[#f0f4f8] to-transparent opacity-50" />
       <div className="flex-1 relative flex items-end gap-8 border-b border-[#4a7c92]/5 pb-10">
          {[50, 85, 100, 70, 55].map((h, i) => (
            <motion.div 
               key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
               transition={{ delay: i * 0.1, duration: 1.5, ease: "circOut" }}
               className={cn(
                 "flex-1 rounded-t-[2rem] relative group cursor-pointer", 
                 i === 2 ? "bg-[#4a7c92]" : "bg-[#cbdbe6]"
               )}
            >
               <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1a2b3c] text-white text-[10px] font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                 {h}%
               </div>
            </motion.div>
          ))}
       </div>
       <div className="flex justify-between items-center relative">
          <div className="space-y-2">
            <p className="text-3xl font-black tracking-tight">System Impact</p>
            <p className="text-[#4a7c92] text-[10px] font-mono tracking-[0.4em] uppercase opacity-40">{slide.visualDesc}</p>
          </div>
          <div className="w-16 h-16 bg-[#1a2b3c] rounded-full flex items-center justify-center text-white shadow-xl">
            <Activity className="w-8 h-8" />
          </div>
       </div>
    </div>
  </div>
);

const QuoteLayout = ({ slide }: { slide: SlideData }) => (
  <div className="flex-1 flex gap-px items-stretch h-[110%] -mx-32 -my-32">
    <div className="flex-1 bg-[#eaeff2] flex items-center justify-center p-32 relative overflow-hidden">
       <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#4a7c92_0%,transparent_70%)]" />
       </div>
       <div className="w-full aspect-square max-w-md border-2 border-white/50 rounded-full flex items-center justify-center relative shadow-inner bg-white/20 backdrop-blur-sm">
          <Quote className="absolute top-12 left-12 w-20 h-20 text-[#4a7c92] opacity-5" />
          <div className="w-48 h-48 bg-[#1a2b3c] rounded-full flex items-center justify-center shadow-2xl">
             <User size={100} className="text-white/20" />
          </div>
          <motion.div 
            animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border border-dashed border-[#4a7c92]/10 rounded-full" 
          />
       </div>
    </div>
    <div className="flex-[1.3] bg-white flex flex-col justify-center p-32 gap-20 shadow-2xl relative z-10">
       <div className="flex items-center gap-6 opacity-20">
         <div className="w-20 h-[1px] bg-black" />
         <span className="text-xs font-black tracking-[0.5em] uppercase">{slide.title}</span>
       </div>
       <div className="space-y-16">
          {slide.content.map((c, i) => (
            <motion.p 
              initial={{ x: 30, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: i * 0.2 }}
              key={i} 
              className="text-5xl font-black leading-[1.3] tracking-tight text-[#1a2b3c] relative"
            >
              <span className="absolute -left-12 opacity-10 text-8xl -top-4 italic font-serif">“</span>
              {c}
              <span className="opacity-10 text-8xl absolute -bottom-12 italic font-serif">”</span>
            </motion.p>
          ))}
       </div>
       <div className="flex items-center gap-6 pt-12 border-t border-[#4a7c92]/5">
          <div className="w-12 h-12 rounded-xl bg-[#4a7c92]/5 flex items-center justify-center">
            <MessageSquare className="text-[#4a7c92]" />
          </div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#4a7c92]/40 tracking-[0.4em]">{slide.visualDesc}</span>
       </div>
    </div>
  </div>
);

const FlowLayout = ({ slide }: { slide: SlideData }) => (
  <div className="flex-1 flex flex-col justify-center py-10">
    <h2 className="text-5xl font-black mb-20 text-center tracking-tight">{slide.title}</h2>
    <div className="flex items-center justify-between relative max-w-6xl mx-auto w-full px-10">
       <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#4a7c92]/10 -translate-y-1/2" />
       {slide.content.map((c, i) => (
         <motion.div 
           initial={{ y: 20, opacity: 0 }} 
           animate={{ y: 0, opacity: 1 }} 
           transition={{ delay: i * 0.2 }}
           key={i} 
           className="relative z-10 flex flex-col items-center gap-8 group"
         >
            <div className="w-28 h-28 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-[#f8fafb] group-hover:scale-110 transition-transform group-hover:border-[#4a7c92]/20">
               <span className="text-[#4a7c92] font-black text-3xl">{i + 1}</span>
            </div>
            <div className="bg-white/90 backdrop-blur-lg px-8 py-5 rounded-[2rem] shadow-xl border border-white/50 text-center min-w-[220px]">
               <p className="text-xl font-black text-[#1a2b3c]">{c}</p>
            </div>
            {i < slide.content.length - 1 && (
              <div className="absolute top-14 left-full w-full -translate-x-12 opacity-10 pointer-events-none">
                 <ArrowRight size={40} className="text-[#4a7c92]" />
              </div>
            )}
         </motion.div>
       ))}
    </div>
  </div>
);

const GridLayout = ({ slide }: { slide: SlideData }) => (
  <div className="flex-1 flex flex-col gap-12">
    <h2 className="text-5xl font-black">{slide.title}</h2>
    <div className="flex-1 grid grid-cols-3 gap-10">
       {slide.content.map((c, i) => (
         <div key={i} className="bg-white rounded-[3rem] border border-zinc-100 p-12 flex flex-col group hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-[#f0f4f8] rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#4a7c92] transition-colors">
               {i === 0 ? <CheckCircle2 className="group-hover:text-white" /> : i === 1 ? <Target className="group-hover:text-white" /> : <Layers className="group-hover:text-white" />}
            </div>
            <p className="text-xl font-bold mb-6">Objective 0{i+1}</p>
            <p className="text-zinc-500 leading-relaxed">{c}</p>
         </div>
       ))}
    </div>
  </div>
);

const ComparisonLayout = ({ slide }: { slide: SlideData }) => (
  <div className="flex-1 flex flex-col gap-12">
    <h2 className="text-5xl font-black">{slide.title}</h2>
    <div className="flex-1 flex gap-px bg-zinc-200 rounded-[3rem] overflow-hidden border border-zinc-200">
       {[0, 1].map(idx => (
         <div key={idx} className="flex-1 bg-white p-16 flex flex-col">
            <div className="flex items-center gap-4 mb-12">
               <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", idx === 0 ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500")}>
                  {idx === 0 ? <XCircle /> : <CheckCircle2 />}
               </div>
               <span className="font-black tracking-[0.2em] text-xs uppercase opacity-40">{idx === 0 ? 'Abandoned' : 'Preferred'}</span>
            </div>
            <p className="text-2xl font-bold leading-relaxed flex-1">{slide.content[idx]}</p>
            <div className="mt-12 pt-12 border-t border-zinc-50 flex items-center justify-between text-zinc-300">
               <span className="text-[10px] font-mono">{slide.visualDesc}</span>
               <Scale size={24} />
            </div>
         </div>
       ))}
    </div>
  </div>
);

const EndLayout = ({ slide }: { slide: SlideData }) => (
  <div className="flex-1 flex flex-col justify-center items-center text-center">
    <motion.div 
      animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
      className="mb-16"
    >
      <Plane className="text-[#4a7c92] w-24 h-24" />
    </motion.div>
    <h1 className="text-8xl font-black mb-12 tracking-tighter">{slide.title}</h1>
    <div className="space-y-6">
       {slide.content.map((c, i) => (
         <p key={i} className="text-zinc-600 font-mono uppercase tracking-[0.6em] text-lg">{c}</p>
       ))}
    </div>
  </div>
);

function getVisualIcon(id: number) {
  const props = { className: "text-[#4a7c92]" };
  if (id === 1 || id >= 18) return <Plane {...props} />;
  if (id === 3) return <TrendingDown {...props} />;
  if (id === 4) return <AlertCircle {...props} />;
  if (id === 6 || id === 8) return <Activity {...props} />;
  if (id === 14) return <Smartphone {...props} />;
  if (id === 16) return <ShieldCheck className="text-emerald-500" />;
  return <Layers {...props} />;
}

// --- Main App Component ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev();
      if (e.key === 'f' || e.key === 'F') toggleFS();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const next = () => { if (currentSlide < slides.length - 1) setCurrentSlide(prev => prev + 1); };
  const prev = () => { if (currentSlide > 0) setCurrentSlide(prev => prev - 1); };
  const toggleFS = () => {
    if (!document.fullscreenElement) { document.documentElement.requestFullscreen(); setIsFullscreen(true); }
    else { document.exitFullscreen(); setIsFullscreen(false); }
  };

  const slide = slides[currentSlide];

  const renderContent = () => {
    switch (slide.layout) {
      case 'cover': return <Cover slide={slide} />;
      case 'section': return <Section slide={slide} />;
      case 'split': return <Split slide={slide} />;
      case 'bento': return <Bento slide={slide} />;
      case 'data': return <DataLayout slide={slide} />;
      case 'quote': return <QuoteLayout slide={slide} />;
      case 'flow': return <FlowLayout slide={slide} />;
      case 'grid': return <GridLayout slide={slide} />;
      case 'comparison': return <ComparisonLayout slide={slide} />;
      case 'medical-data': return <MedicalDataLayout slide={slide} />;
      case 'end': return <EndLayout slide={slide} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f7] text-zinc-900 flex flex-col font-sans selection:bg-[#4a7c92] selection:text-white overflow-hidden select-none">
      {/* Top Controls */}
      <header className="h-20 px-12 flex justify-between items-center z-50 bg-white/60 backdrop-blur-3xl border-b border-zinc-200/50 shadow-sm">
        <div className="flex items-center gap-6">
           <div className="w-10 h-10 bg-[#4a7c92] rounded-2xl flex items-center justify-center shadow-lg shadow-[#4a7c92]/20 transition-transform hover:rotate-6">
              <Plane size={22} className="text-white" />
           </div>
           <div className="h-8 w-px bg-zinc-200" />
           <div className="flex flex-col">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4a7c92]">Academic Presentation 2026</p>
              <p className="text-sm font-bold text-zinc-800">Narrow-Body Cabin System Optimization</p>
           </div>
        </div>

        <div className="hidden lg:flex items-center gap-3 px-6 py-2 bg-zinc-50 border border-zinc-200 rounded-full shadow-inner">
           {slides.map((_, i) => (
             <button 
               key={i} onClick={() => setCurrentSlide(i)}
               className={cn(
                 "h-1 rounded-full transition-all duration-700",
                 i === currentSlide ? "w-12 bg-[#4a7c92]" : (i < currentSlide ? "w-2 bg-zinc-300" : "w-1.5 bg-zinc-200 hover:bg-zinc-400")
               )} 
             />
           ))}
        </div>

        <div className="flex items-center gap-10">
           <span className="font-mono text-zinc-400 text-xs font-bold">{currentSlide+1} <span className="opacity-30">/</span> {slides.length}</span>
           <button onClick={toggleFS} className="p-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-800 hover:border-zinc-400 transition-all shadow-sm active:scale-95">
             {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
           </button>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 flex items-center justify-center p-8 md:p-14 relative perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.98, x: 20, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, x: -20, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[1600px] aspect-[16/9] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.15)] rounded-[5rem] overflow-hidden group border border-white/50"
          >
             <LayoutWrapper slide={slide}>
                {renderContent()}
             </LayoutWrapper>
          </motion.div>
        </AnimatePresence>

        {/* Side Nav Arrows */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-10 pointer-events-none">
           <button onClick={prev} disabled={currentSlide === 0} className={cn("w-20 h-20 rounded-full bg-white/40 backdrop-blur-xl border border-white/50 flex items-center justify-center text-zinc-400 hover:text-zinc-800 transition-all pointer-events-auto group disabled:opacity-0 hover:scale-110 shadow-xl", currentSlide > 0 && "hover:border-[#4a7c92]/40")}>
             <ChevronLeft size={32} className="transition-transform group-hover:-translate-x-1" />
           </button>
           <button onClick={next} disabled={currentSlide === slides.length - 1} className={cn("w-20 h-20 rounded-full bg-white/40 backdrop-blur-xl border border-white/50 flex items-center justify-center text-zinc-400 hover:text-zinc-800 transition-all pointer-events-auto group disabled:opacity-0 hover:scale-110 shadow-xl", currentSlide < slides.length - 1 && "hover:border-[#4a7c92]/40")}>
             <ChevronRight size={32} className="transition-transform group-hover:translate-x-1" />
           </button>
        </div>
      </main>

      {/* Thumbnails Sidebar */}
      <footer className="h-28 flex items-center px-16 gap-4 overflow-x-auto scroller-hidden bg-white/40 backdrop-blur-2xl border-t border-zinc-100 z-50">
         {slides.map((s, i) => (
           <button 
            key={i} onClick={() => setCurrentSlide(i)}
            className={cn(
              "flex-shrink-0 w-18 h-12 rounded-xl text-[10px] flex items-center justify-center border transition-all duration-500",
              i === currentSlide 
                ? "bg-[#4a7c92] border-white/20 text-white font-black scale-110 shadow-xl shadow-[#4a7c92]/20" 
                : "bg-white border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-600 shadow-sm"
            )}
           >
             {(i+1).toString().padStart(2, '0')}
           </button>
         ))}
      </footer>

      <style>{`
        .scroller-hidden::-webkit-scrollbar { display: none; }
        .scroller-hidden { -ms-overflow-style: none; scrollbar-width: none; }
        .perspective-1000 { perspective: 2500px; }
      `}</style>
    </div>
  );
}
