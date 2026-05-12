import React, { useState, useEffect, useRef } from 'react';
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
  Database, 
  Settings, 
  Smartphone,
  Layers,
  CheckCircle2,
  XCircle,
  TrendingDown,
  Wind,
  ArrowRight,
  Target,
  BarChart3,
  Clock,
  ShieldCheck,
  Zap,
  Info,
  Quote,
  Timer,
  ZapOff,
  Scale,
  Brain,
  Expand,
  Search
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
  | 'split-right' 
  | 'split-left' 
  | 'comparison' 
  | 'flow' 
  | 'bento' 
  | 'data-heavy' 
  | 'persona-card' 
  | 'quote' 
  | 'end';

type ThemeColor = 'blue' | 'emerald' | 'amber' | 'indigo' | 'cyan' | 'rose';

interface SlideData {
  id: number;
  section: string;
  title: string;
  subtitle?: string;
  layout: LayoutType;
  theme: ThemeColor;
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
    theme: "blue",
    content: [
      "物理结构的重量置换：减重与功能重组",
      "数字界面的情境干预：基于BYOD的引导式交互",
      "核心方案：窄体客机专属的张力腿部支撑系统"
    ],
    visualDesc: "全机舱三维爆炸透视图",
    footer: "交互设计 / 工业设计 | 毕业设计答辩",
  },
  {
    id: 2,
    section: "CONTEXT",
    title: "窄体客机中长途飞行的常态化",
    layout: "section",
    theme: "blue",
    content: [
      "A321LR/XLR 使得单通道飞机能够跨越大洋。",
      "由于物理体积限制，座椅排距与舒适度的矛盾被无限放大。",
      "“Narrow-body, Long-haul” 成为客舱设计的新战场。"
    ],
    visualDesc: "全球航线蓝图与窄体机航程覆盖",
    footer: "01 项目背景"
  },
  {
    id: 3,
    section: "MARKET TREND",
    title: "超级经济舱的崛起与 IFE 边际效应递减",
    layout: "bento",
    theme: "blue",
    content: [
      "旅客需求：物理舒适度提升 > 电子娱乐升级",
      "使用习惯：80% 旅客在飞行中首选手机/平板",
      "减重需求：移除旧式背挂屏幕可直接节省单座约 3kg 重量"
    ],
    visualDesc: "IFE 与 BYOD 使用频率对比",
    footer: "01 项目背景"
  },
  {
    id: 4,
    section: "PROBLEM DEFINITION",
    title: "错配：过时的座椅遇到进化的旅客",
    layout: "split-left",
    theme: "amber",
    content: [
      "硬件入口错配：座椅仍围绕背挂屏幕设计，而用户在低头看手机。",
      "腿部支撑错配：长途飞行最大的疲劳源是下肢悬空，而空间不允许物理脚板。",
      "安全管控错配：旅客自发使用行李垫脚，存在严重的起降安全隐患。"
    ],
    visualDesc: "错配姿态受力示意图",
    footer: "01 问题定义"
  },
  {
    id: 5,
    section: "USER RESEARCH",
    title: "研究方法：从行为观察到体压分布",
    layout: "section",
    theme: "emerald",
    content: [
      "半结构化访谈与行为观察",
      "用户旅程图 (User Journey Map)",
      "人机工学体压模拟数据"
    ],
    visualDesc: "研究方法矩阵图",
    footer: "02 用户研究"
  },
  {
    id: 6,
    section: "JOURNEY MAP",
    title: "长途飞行的身心疲劳演变曲线",
    layout: "data-heavy",
    theme: "emerald",
    content: [
      "【0-2h】探索期：心率平稳，肢体动作少。",
      "【2-4h】倦怠期：开始频繁调整坐姿，寻找垫脚物。",
      "【4h+】爆发期：核心痛点——双腿悬空导致的酸胀感成为首要不满。"
    ],
    visualDesc: "情绪与生理疲劳波形图",
    footer: "02 用户研究"
  },
  {
    id: 7,
    section: "USER PERSONA",
    title: "跨洲际飞行的典型旅客画像",
    layout: "persona-card",
    theme: "emerald",
    content: [
      "【业务型】需要高效补眠、快速办公、极简交互。",
      "【休闲型】需要沉浸观影、多种姿态切换、长时间支撑。"
    ],
    visualDesc: "典型旅客行为特征对比",
    footer: "02 用户研究"
  },
  {
    id: 8,
    section: "VOICE OF USERS",
    title: "旅客的直觉呼唤：“我只想抬起腿来”",
    layout: "quote",
    theme: "emerald",
    content: [
      "“如果前排能有一块支撑让我把腿垫高，哪怕只有 10 厘米，体验也会天差地别。”",
      "“我总是偷偷把行李挪过来自创脚垫，虽然会被空乘提醒，但真的很舒服。”"
    ],
    visualDesc: "高频关键词聚合统计",
    footer: "02 用户研究"
  },
  {
    id: 9,
    section: "ERGONOMICS DATA",
    title: "医学证据：抬腿 15° 对循环系统的改善",
    layout: "data-heavy",
    theme: "emerald",
    content: [
      "实验组数据显示：腿部微抬可使下肢静脉返流速度提升 22%。",
      "EMG 选肌电测试：腓肠肌在张力承载状态下放电量降低 18%。",
      "结论：窄体机不需要‘平躺’，只需要‘有效的非侵入支撑’。"
    ],
    visualDesc: "下肢血管压力分布红外图",
    footer: "02 用户研究"
  },
  {
    id: 10,
    section: "EXISTING SOLUTIONS",
    title: "现状调研：低效且有风险的自发尝试",
    layout: "bento",
    theme: "amber",
    content: [
      "行李垫脚：易滑动、占空间、有隐患。",
      "踩踏骨架：损坏结构、高度不适。",
      "盘腿蜷缩：对脊柱产生二次伤害。"
    ],
    visualDesc: "旅客自评舒适度分布雷达图",
    footer: "03 现状调研"
  },
  {
    id: 11,
    section: "ABANDONED PATHS",
    title: "弃用方案 A：硬质铝合金折叠脚踏",
    layout: "comparison",
    theme: "amber",
    content: [
      "【优势】结构坚固，传动直接。",
      "【劣势】重量过大（>1.2kg）；转动关节易卡异物；收纳后侵占后方空隙。"
    ],
    visualDesc: "硬质零件的适航冲突点",
    footer: "04 方案迭代"
  },
  {
    id: 12,
    section: "ABANDONED PATHS",
    title: "弃用方案 B：充气悬挂托袋",
    layout: "comparison",
    theme: "amber",
    content: [
      "【优势】质量虚无感，折叠极致化。",
      "【劣势】晃动干扰过大；气囊耐用性极差；充气过程噪音影响邻座。"
    ],
    visualDesc: "充气方案的维护成本预估",
    footer: "04 方案迭代"
  },
  {
    id: 13,
    section: "ITERATION LOGIC",
    title: "进化路径：从“独立组件”向“系统重构”",
    layout: "flow",
    theme: "indigo",
    content: [
      "1. 外挂式：单纯为了支撑而支撑（失败）。",
      "2. 结构式：尝试修改骨架（太重）。",
      "3. 整合式：去除 IFE 屏幕，利用多出的重量与空间打造全系统抗疲劳解决方案。"
    ],
    visualDesc: "方案演进的时间之树",
    footer: "04 方案迭代"
  },
  {
    id: 14,
    section: "FINAL SYSTEM",
    title: "重设计：基于重量置换的抗疲劳客舱系统",
    layout: "section",
    theme: "cyan",
    content: [
      "物理层：自适应张力腿部支撑面",
      "交互层：BYOD 引导式 W-IFE 系统",
      "环境层：情境自适应的动态管理"
    ],
    visualDesc: "系统全架构三维透视图",
    footer: "05 最终方案"
  },
  {
    id: 15,
    section: "CORE HARDWARE",
    title: "张力腿部支撑面：半柔性力的极致应用",
    layout: "split-right",
    theme: "cyan",
    content: [
      "材料：高强碳纤维编织面 + 仿生张弦结构。",
      "性能：仅重 380g，受压时表面呈流体感张力支撑。",
      "安全：无硬质边缘，碰撞时可提供织物吸能缓冲。"
    ],
    visualDesc: "张力件微观结构与力学模拟",
    footer: "05 方案详情"
  },
  {
    id: 16,
    section: "SPACE COMPATIBILITY",
    title: "兼容窄体机极窄排距的收纳逻辑",
    layout: "split-left",
    theme: "cyan",
    content: [
      "空间节约：展开厚度小于 8mm，完全折叠后藏于骨架凹槽。",
      "无感收放：磁吸引导系统，起降前可一秒复位。",
      "材料：全抗菌涂层，支持高频率客舱保洁。"
    ],
    visualDesc: "侧面排距空间动态演示",
    footer: "05 方案详情"
  },
  {
    id: 17,
    section: "INTERACTION DESIGN",
    title: "BYOD 岛：重定义的椅背“行为窗口”",
    layout: "split-right",
    theme: "indigo",
    content: [
      "物理支架：支持手机、平板、Kindle 的多视角组合。",
      "感知模块：集成无线快充与 NFC 一触即连技术。",
      "状态联动：座椅展开腿托时，手机端自动开启‘极致抗疲劳’观影模式。"
    ],
    visualDesc: "椅背功能岛细节实拍效果",
    footer: "06 交互系统"
  },
  {
    id: 18,
    section: "SCENARIO SERVICE",
    title: "场景引导：发餐与休憩的逻辑链条",
    layout: "flow",
    theme: "indigo",
    content: [
      "【预备】连接 BYOD，点餐推送。",
      "【执行】点餐触发桌板建议开展提醒。",
      "【补偿】餐后进入观影，引导开启张力腿托以平衡消化期的疲劳感。"
    ],
    visualDesc: "三段式服务场景流程",
    footer: "06 交互系统"
  },
  {
    id: 19,
    section: "SAFETY LOGIC",
    title: "极端安全：基于情境的强制干预机制",
    layout: "data-heavy",
    theme: "rose",
    content: [
      "起降安全：W-IFE 强制置顶‘立刻收回腿托’提示。",
      "感知闭环：若物理传感器显示未收回，空乘终端实时预警。",
      "抗震设计：腿托连接点采用断开保护机制，不干扰救生衣取用。"
    ],
    visualDesc: "安全报警 UI 与 硬件传感器联动逻辑",
    footer: "06 交互系统"
  },
  {
    id: 20,
    section: "USER VALUE",
    title: "用户侧价值：长途飞行的“姿态自由”",
    layout: "bento",
    theme: "cyan",
    content: [
      "循环改善：下肢肿胀感预期降低 60%。",
      "心理放松：消除被迫坐姿带来的空间压迫感。",
      "习惯对齐：手机就是遥控器，交互无学习成本。"
    ],
    visualDesc: "用户体验多维度提升雷达图",
    footer: "07 价值总结"
  },
  {
    id: 21,
    section: "AIRLINE VALUE",
    title: "航司侧价值：不仅仅是舒适度",
    layout: "bento",
    theme: "indigo",
    content: [
      "燃油节省：整机减重 420kg 以上，换取卓越燃油效率。",
      "维护极简：零活动机械关节，减少 75% 地勤检修时间。",
      "品牌力：在窄体机中长途竞争中打造标志性体验。"
    ],
    visualDesc: "重量流向与 ROI 回报分析",
    footer: "07 价值总结"
  },
  {
    id: 22,
    section: "TECHNICAL SPECS",
    title: "附录：材料与适航参数表",
    layout: "data-heavy",
    theme: "blue",
    content: [
      "材料：Aramid 芳纶 + ABS/PC 阻燃外壳。",
      "频率：5GHz W-IFE 频段，支持 200 人并发。",
      "强度：最高承重 25kg（脚部静载荷），符合 TSO 标准。"
    ],
    visualDesc: "材料物理性能检测表",
    footer: "07 技术参数"
  },
  {
    id: 23,
    section: "FUTURE VISION",
    title: "展望：座椅从“物理骨架”向“行为容器”演进",
    layout: "split-left",
    theme: "cyan",
    content: [
      "基于实时体压数据的形态自适应调节。",
      "与智能穿戴设备联动的个性化睡眠干预方案。",
      "愿景：客舱座椅将通过数字引导消除物理边际。"
    ],
    visualDesc: "未来智能自适应客舱概念图",
    footer: "08 展望"
  },
  {
    id: 24,
    section: "SUMMARY",
    title: "设计是解决真实问题的过程",
    layout: "end",
    theme: "blue",
    content: [
      "通过‘重量置换’对抗‘空间诅咒’",
      "以‘BYOD 引导’重塑‘客舱秩序’",
      "汇报完毕，感谢聆听"
    ],
    visualDesc: "全机舱全景渲染",
    footer: "汇报结束"
  },
  {
    id: 25,
    section: "THANK YOU",
    title: "谢谢，欢迎交流",
    subtitle: "Q & A",
    layout: "end",
    theme: "blue",
    content: [
      "窄体客机长途化座椅系统研究",
      "汇报人：[您的名字]",
      "交互设计 / 工业设计"
    ],
    visualDesc: "致谢谢幕背景",
    footer: "END"
  }
];

// --- Helper Functions ---

const getThemeClasses = (theme: ThemeColor) => {
  switch (theme) {
    case 'blue': return { accent: 'text-blue-500', bg: 'bg-blue-600', border: 'border-blue-500/20', light: 'bg-blue-500/10' };
    case 'emerald': return { accent: 'text-emerald-500', bg: 'bg-emerald-600', border: 'border-emerald-500/20', light: 'bg-emerald-500/10' };
    case 'amber': return { accent: 'text-amber-500', bg: 'bg-amber-600', border: 'border-amber-500/20', light: 'bg-amber-500/10' };
    case 'indigo': return { accent: 'text-indigo-500', bg: 'bg-indigo-600', border: 'border-indigo-500/20', light: 'bg-indigo-500/10' };
    case 'cyan': return { accent: 'text-cyan-500', bg: 'bg-cyan-600', border: 'border-cyan-500/20', light: 'bg-cyan-500/10' };
    case 'rose': return { accent: 'text-rose-500', bg: 'bg-rose-600', border: 'border-rose-500/20', light: 'bg-rose-500/10' };
  }
};

// --- Layout Components ---

const LayoutCover = ({ slide, theme }: { slide: SlideData, theme: any }) => (
  <div className="flex flex-col justify-center items-center h-full text-center relative px-12">
    <motion.div 
      initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      className={cn("mb-10 w-24 h-24 rounded-3xl flex items-center justify-center border shadow-2xl", theme.border, theme.light)}
    >
      <Plane className={cn("w-12 h-12", theme.accent)} />
    </motion.div>
    <motion.h1 
      className="text-6xl font-black mb-8 leading-[1.1] tracking-tighter"
      initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
    >
      {slide.title}
    </motion.h1>
    <motion.p 
      className={cn("text-2xl font-semibold mb-16", theme.accent)}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
    >
      {slide.subtitle}
    </motion.p>
    <div className="flex gap-4">
      {slide.content.map((c, i) => (
        <span key={i} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 font-mono text-sm uppercase tracking-widest">
          {c}
        </span>
      ))}
    </div>
  </div>
);

const LayoutSection = ({ slide, theme }: { slide: SlideData, theme: any }) => (
  <div className="flex flex-col justify-center items-center h-full text-center p-16">
    <div className={cn("h-1.5 w-24 rounded-full mb-12", theme.bg)} />
    <h2 className="text-7xl font-black leading-tight max-w-5xl mb-12">{slide.title}</h2>
    <div className="space-y-6">
      {slide.content.map((c, i) => (
        <p key={i} className="text-zinc-500 text-2xl font-medium">{c}</p>
      ))}
    </div>
  </div>
);

const LayoutSplit = ({ slide, theme, side = 'right' }: { slide: SlideData, theme: any, side?: 'left' | 'right' }) => (
  <div className={cn("flex h-full p-20 gap-20 items-center", side === 'left' ? "flex-row-reverse" : "flex-row")}>
    <div className="flex-1 space-y-12">
      <h2 className="text-5xl font-black leading-tight">{slide.title}</h2>
      <div className="space-y-8">
        {slide.content.map((c, i) => (
          <div key={i} className="flex gap-6 group">
            <div className={cn("mt-2.5 w-2 h-2 rounded-full shrink-0 transition-transform group-hover:scale-150", theme.bg)} />
            <p className="text-zinc-400 text-xl leading-relaxed">{c}</p>
          </div>
        ))}
      </div>
    </div>
    <div className={cn("flex-1 h-full rounded-[4rem] border shadow-2xl flex flex-col items-center justify-center p-12 text-center", theme.border, "bg-zinc-900/40")}>
       <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center mb-10 shadow-lg", theme.light)}>
          {getVisualIcon(slide.id, theme.accent)}
       </div>
       <p className={cn("text-sm font-black mb-6 uppercase tracking-widest", theme.accent)}>{slide.visualDesc}</p>
       <div className="w-full h-2/3 border border-dashed border-zinc-800 rounded-3xl flex items-center justify-center p-8 bg-black/20">
          <span className="text-zinc-700 italic text-base">可视化建议：{slide.visualDesc}</span>
       </div>
    </div>
  </div>
);

const LayoutBento = ({ slide, theme }: { slide: SlideData, theme: any }) => (
  <div className="flex flex-col h-full p-20 gap-10">
    <h2 className="text-5xl font-black mb-4">{slide.title}</h2>
    <div className="flex-1 grid grid-cols-12 grid-rows-6 gap-6">
      <div className="col-span-8 row-span-4 bg-zinc-800/20 border border-zinc-800 rounded-3xl p-10 flex flex-col justify-end">
         <h3 className={cn("text-sm font-black mb-4 uppercase tracking-[0.3em]", theme.accent)}>Primary Data</h3>
         <p className="text-4xl font-bold text-white leading-tight">{slide.content[0]}</p>
      </div>
      <div className="col-span-4 row-span-6 bg-zinc-800/20 border border-zinc-800 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
         <div className={cn("w-16 h-16 rounded-2xl mb-8 flex items-center justify-center shadow-lg", theme.light)}>
           <Search className={cn("w-8 h-8", theme.accent)} />
         </div>
         <p className="text-zinc-400 text-lg">{slide.content[2]}</p>
      </div>
      <div className="col-span-8 row-span-2 bg-zinc-900/50 border border-zinc-800 rounded-3xl px-10 flex items-center justify-between group">
         <p className="text-2xl font-bold text-zinc-300">{slide.content[1]}</p>
         <ArrowRight className={cn("transition-transform group-hover:translate-x-3", theme.accent)} size={32} />
      </div>
    </div>
  </div>
);

const LayoutPersona = ({ slide, theme }: { slide: SlideData, theme: any }) => (
  <div className="flex flex-col h-full p-20 gap-12">
    <h2 className="text-5xl font-black">{slide.title}</h2>
    <div className="flex-1 flex gap-8">
      {slide.content.map((c, i) => (
        <div key={i} className="flex-1 bg-zinc-800/20 border border-zinc-800 rounded-3xl p-12 flex flex-col group hover:border-emerald-500/30 transition-all">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-10 overflow-hidden">
             <User className="text-zinc-600 w-8 h-8" />
          </div>
          <p className="text-2xl font-bold text-white mb-8">Persona {i+1}</p>
          <p className="text-zinc-400 text-xl leading-relaxed">{c}</p>
          <div className="mt-auto pt-8 border-t border-zinc-800">
             <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(v => <div key={v} className={cn("w-4 h-1 rounded-full", v <= 4 ? theme.bg : "bg-zinc-800")} />)}
             </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LayoutQuote = ({ slide, theme }: { slide: SlideData, theme: any }) => (
  <div className="flex flex-col justify-center h-full p-24 relative">
    <Quote className={cn("absolute top-20 left-20 w-32 h-32 opacity-[0.03]", theme.accent)} />
    <div className="space-y-20 relative z-10 max-w-5xl">
       {slide.content.map((c, i) => (
         <div key={i} className="flex gap-10">
            <div className={cn("w-1 h-24 rounded-full", theme.bg)} />
            <p className="text-4xl font-bold italic text-zinc-200 leading-tight">“{c}”</p>
         </div>
       ))}
    </div>
    <div className="absolute bottom-20 right-24 text-right">
       <p className={cn("text-sm font-black uppercase tracking-[0.4em] mb-2", theme.accent)}>{slide.visualDesc}</p>
       <p className="text-zinc-600 font-mono italic">Primary User Interviews, 2026</p>
    </div>
  </div>
);

const LayoutFlow = ({ slide, theme }: { slide: SlideData, theme: any }) => (
  <div className="flex flex-col h-full p-20 gap-16">
    <h2 className="text-5xl font-black text-center">{slide.title}</h2>
    <div className="flex items-center justify-center h-full">
      {slide.content.map((c, i) => (
        <React.Fragment key={i}>
          <div className="flex-1 max-w-[320px] group">
            <div className="aspect-square bg-zinc-800/20 border border-zinc-800 rounded-[2.5rem] p-10 flex flex-col justify-between group-hover:border-blue-500/20 transition-all">
               <span className={cn("text-6xl font-black opacity-10", theme.accent)}>0{i+1}</span>
               <p className="text-xl font-bold text-zinc-300">{c}</p>
            </div>
          </div>
          {i < slide.content.length - 1 && (
            <div className="px-6">
               <ArrowRight className="text-zinc-800" size={32} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const LayoutData = ({ slide, theme }: { slide: SlideData, theme: any }) => (
  <div className="flex h-full p-24 gap-24">
    <div className="flex-[2] flex flex-col justify-center space-y-12">
       <h2 className="text-6xl font-black tracking-tight leading-[1.1]">{slide.title}</h2>
       <div className="space-y-8">
          {slide.content.map((c, i) => (
            <p key={i} className="text-zinc-500 text-2xl font-medium tracking-tight">
              <span className={cn("font-mono mr-4", theme.accent)}>→</span> {c}
            </p>
          ))}
       </div>
    </div>
    <div className="flex-[3] bg-zinc-900/50 border border-zinc-800 rounded-[3rem] p-16 flex flex-col relative overflow-hidden group">
       <div className="absolute top-0 right-0 p-10 opacity-10">
          <Activity className={theme.accent} size={120} />
       </div>
       <div className="flex-1 flex items-end gap-6 border-b border-zinc-800 pb-12 mb-10">
          {[40, 70, 90, 60, 100].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-4">
               <motion.div 
                 initial={{ height: 0 }} animate={{ height: `${h}%` }}
                 className={cn("w-full rounded-2xl shadow-2xl", i === 4 ? theme.bg : "bg-zinc-800")}
               />
               <span className="text-zinc-600 font-mono text-[10px]">T-0{i+1}</span>
            </div>
          ))}
       </div>
       <div className="flex justify-between items-center">
          <div>
            <p className="text-3xl font-black mb-2">Impact Score</p>
            <p className={cn("text-xs font-mono tracking-widest uppercase", theme.accent)}>{slide.visualDesc}</p>
          </div>
          <div className={cn("w-16 h-16 rounded-full flex items-center justify-center border shadow-xl", theme.border)}>
             <BarChart3 className={theme.accent} />
          </div>
       </div>
    </div>
  </div>
);

const LayoutComparison = ({ slide, theme }: { slide: SlideData, theme: any }) => (
  <div className="flex flex-col h-full p-20 gap-12">
    <h2 className="text-5xl font-black">{slide.title}</h2>
    <div className="flex-1 flex gap-10">
      {[0, 1].map((idx) => (
        <div key={idx} className={cn("flex-1 p-12 rounded-[3rem] border flex flex-col transition-all", idx === 0 ? "bg-zinc-900/20 border-zinc-800" : cn("bg-zinc-800/20", theme.border))}>
           <div className="flex items-center gap-4 mb-10">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", idx === 0 ? "bg-zinc-800" : theme.light)}>
                 {idx === 0 ? <ZapOff className="text-zinc-600" /> : <Zap className={theme.accent} />}
              </div>
              <p className="text-2xl font-bold uppercase tracking-widest">{idx === 0 ? "Previous" : "Optimized"}</p>
           </div>
           <div className="flex-1 border border-dashed border-zinc-800 rounded-3xl mb-10 bg-black/20 flex flex-col items-center justify-center p-8 gap-4">
              <Scale className="text-zinc-800 w-16 h-16" />
              <p className="text-zinc-700 text-sm font-mono tracking-widest uppercase">{slide.visualDesc}</p>
           </div>
           <p className="text-zinc-400 text-xl leading-relaxed italic">{slide.content[idx]}</p>
        </div>
      ))}
    </div>
  </div>
);

const LayoutEnd = ({ slide, theme }: { slide: SlideData, theme: any }) => (
  <div className="flex flex-col justify-center items-center h-full text-center p-20 bg-gradient-to-t from-blue-900/10 to-transparent">
    <motion.div 
      initial={{ y: 0 }} 
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="mb-12 cursor-pointer"
    >
      <Plane className={cn("w-32 h-32", theme.accent)} />
    </motion.div>
    <h1 className="text-8xl font-black mb-8 tracking-tighter">{slide.title}</h1>
    <h2 className={cn("text-5xl font-medium mb-24 opacity-80", theme.accent)}>{slide.subtitle}</h2>
    <div className="flex flex-col gap-4">
      {slide.content.map((c, i) => (
        <p key={i} className="text-zinc-600 text-xl font-mono tracking-[0.5em] uppercase">{c}</p>
      ))}
    </div>
  </div>
);

function getVisualIcon(id: number, colorClass: string) {
  const iconProps = { className: cn("w-10 h-10", colorClass) };
  if (id === 1 || id >= 24) return <Plane {...iconProps} />;
  if (id <= 3) return <TrendingDown {...iconProps} />;
  if (id <= 4) return <AlertCircle {...iconProps} />;
  if (id <= 9) return <Activity {...iconProps} />;
  if (id <= 12) return <Scale {...iconProps} />;
  if (id <= 16) return <Wind {...iconProps} />;
  if (id <= 18) return <Smartphone {...iconProps} />;
  if (id <= 21) return <Zap {...iconProps} />;
  return <Info {...iconProps} />;
}

// --- Main App Component ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => { if (currentSlide < slides.length - 1) setCurrentSlide(prev => prev + 1); };
  const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(prev => prev - 1); };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const slide = slides[currentSlide];
  const theme = getThemeClasses(slide.theme);

  const renderSlideContent = () => {
    const props = { slide, theme };
    switch (slide.layout) {
      case 'cover': return <LayoutCover {...props} />;
      case 'section': return <LayoutSection {...props} />;
      case 'split-right': return <LayoutSplit {...props} side="right" />;
      case 'split-left': return <LayoutSplit {...props} side="left" />;
      case 'comparison': return <LayoutComparison {...props} />;
      case 'flow': return <LayoutFlow {...props} />;
      case 'bento': return <LayoutBento {...props} />;
      case 'data-heavy': return <LayoutData {...props} />;
      case 'persona-card': return <LayoutPersona {...props} />;
      case 'quote': return <LayoutQuote {...props} />;
      case 'end': return <LayoutEnd {...props} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050506] text-white flex flex-col font-sans selection:bg-zinc-100 selection:text-black overflow-hidden select-none">
      {/* Top Header */}
      <header className="h-20 px-12 flex justify-between items-center z-50 bg-black/40 backdrop-blur-3xl border-b border-zinc-900/50">
        <div className="flex items-center gap-5">
           <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:rotate-12", theme.bg)}>
              <Plane size={22} className="text-white" />
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">2026 Cabin Systems Thesis</span>
              <span className="text-sm font-bold tracking-tight">Design Intervention for A321LR/XLR</span>
           </div>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 px-6 py-2.5 bg-zinc-900/50 rounded-full border border-zinc-800">
           {slides.map((_, i) => (
             <button 
               key={i} 
               onClick={() => setCurrentSlide(i)}
               className={cn(
                 "h-1 rounded-full transition-all duration-500",
                 i === currentSlide ? cn("w-8", theme.bg) : (i < currentSlide ? "w-2 bg-zinc-700" : "w-1 bg-zinc-800 hover:bg-zinc-500")
               )} 
             />
           ))}
        </div>

        <div className="flex items-center gap-8">
           <span className="font-mono text-zinc-600 text-xs">{currentSlide + 1} <span className="opacity-30">/</span> {slides.length}</span>
           <button onClick={toggleFullscreen} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white transition-all">
             {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
           </button>
        </div>
      </header>

      {/* Slide Viewport */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-14 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className={cn("absolute top-1/4 -left-20 w-96 h-96 blur-[150px] opacity-10 transition-colors duration-1000", theme.bg)} />
        <div className={cn("absolute bottom-1/4 -right-20 w-96 h-96 blur-[150px] opacity-10 transition-colors duration-1000", theme.bg)} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20, rotateY: 10, filter: 'blur(20px)' }}
            animate={{ opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, rotateY: -10, filter: 'blur(20px)' }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="w-full max-w-[1550px] aspect-[16/9] bg-[#0c0c0e] rounded-[4rem] border border-zinc-800/80 shadow-[0_80px_160px_-40px_rgba(0,0,0,1)] relative overflow-hidden group perspective-1000"
          >
             {/* Dynamic Mesh Grid */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
             
             {/* Slide Content */}
             <div className="h-full relative z-10">
                {renderSlideContent()}
             </div>

             {/* Dynamic Section Label */}
             <div className="absolute top-12 left-20 flex items-center gap-4 text-[10px] font-black pointer-events-none whitespace-nowrap">
                <span className={cn("px-2 py-0.5 rounded text-white font-mono", theme.bg)}>PART 0{Math.floor(currentSlide / 5) + 1}</span>
                <span className="text-zinc-600 uppercase tracking-[0.4em]">{slide.section}</span>
             </div>

             {/* Footer Breadcrumb */}
             <div className="absolute bottom-12 left-20 right-20 flex justify-between items-center text-zinc-700 text-[10px] font-mono tracking-[0.2em] uppercase pointer-events-none pt-8 border-t border-zinc-900/30">
                <div className="flex gap-4 items-center">
                  <span className={theme.accent}>▸</span>
                  <span>{slide.footer}</span>
                </div>
                <div className="flex gap-12 text-zinc-800">
                   <span>State-Driven Interaction Module</span>
                   <span>A321LR/XLR Cabin Thesis</span>
                </div>
             </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Nav Controls */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-10 pointer-events-none">
           <button 
             onClick={prevSlide} 
             disabled={currentSlide === 0} 
             className={cn(
               "w-16 h-16 rounded-full bg-zinc-900/40 border border-zinc-800/50 flex items-center justify-center text-zinc-500 hover:text-white transition-all pointer-events-auto backdrop-blur-xl group disabled:opacity-0", 
               currentSlide > 0 && "hover:border-zinc-500 hover:scale-110 active:scale-95"
             )}
           >
             <ChevronLeft size={28} className="transition-transform group-hover:-translate-x-1" />
           </button>
           <button 
             onClick={nextSlide} 
             disabled={currentSlide === slides.length - 1} 
             className={cn(
               "w-16 h-16 rounded-full bg-zinc-900/40 border border-zinc-800/50 flex items-center justify-center text-zinc-500 hover:text-white transition-all pointer-events-auto backdrop-blur-xl group disabled:opacity-0", 
               currentSlide < slides.length - 1 && "hover:border-zinc-500 hover:scale-110 active:scale-95"
             )}
           >
             <ChevronRight size={28} className="transition-transform group-hover:translate-x-1" />
           </button>
        </div>
      </main>

      {/* Timeline Strip */}
      <footer className="h-24 flex items-center px-12 gap-3 overflow-x-auto scroller-hidden bg-black/40 border-t border-zinc-900/30 relative z-50">
         {slides.map((s, i) => (
           <button 
            key={i} 
            onClick={() => setCurrentSlide(i)}
            className={cn(
              "flex-shrink-0 w-12 h-12 rounded-xl text-[10px] flex items-center justify-center border transition-all duration-500",
              i === currentSlide 
                ? cn("bg-white text-black border-white font-black scale-125 shadow-2xl") 
                : "bg-zinc-900 border-zinc-800/50 text-zinc-700 hover:border-zinc-600 hover:text-zinc-400"
            )}
           >
             {(i + 1).toString().padStart(2, '0')}
           </button>
         ))}
      </footer>

      {/* Global CSS for PERSPECTIVE (inline injection) */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .scroller-hidden::-webkit-scrollbar { display: none; }
        .scroller-hidden { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
