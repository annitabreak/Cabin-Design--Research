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
  Database, 
  Settings, 
  Smartphone,
  Layers,
  CheckCircle2,
  XCircle,
  TrendingDown,
  Wind
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Content Data ---
const slides = [
  {
    id: 1,
    section: "背景与定义",
    title: "窄体客机中长途航线：客舱座椅抗疲劳交互系统设计优化",
    subtitle: "A321LR/XLR 中长途化背景下的客座体验重塑",
    type: "cover",
    content: [
      "物理结构的重量置换：减重与功能重组",
      "数字界面的情境干预：基于BYOD的引导式交互",
      "核心方案：窄体客机专属的张力腿部支撑系统"
    ],
    visual: "核心系统三维爆炸视图（概念）",
    footer: "交互设计 / 工业设计 | 毕业设计答辩汇报"
  },
  {
    id: 2,
    section: "背景与定义",
    title: "行业背景：窄体客机中长途飞行的常态化",
    content: [
      "A321LR/XLR等机型的普及，使得4-8小时窄体机长途飞行成为主流。",
      "由于空间限制，窄体机长途飞行带来的身体压力显著高于宽体机。",
      "物理空间的绝对有限性要求更极致的轻量化与多功能整合方案。"
    ],
    visual: "不同机型航程范围对比图表 + 窄体机客舱密度剖面图",
    footer: "01 项目背景"
  },
  {
    id: 3,
    section: "背景与定义",
    title: "市场趋势：超级经济舱的崛起与IFE边际效应递减",
    content: [
      "旅客对经济舱升级版（PEY）的差异化需求集中在‘物理舒适度’而非‘电子设备’。",
      "传统重量级背板IFE（机上娱乐系统）使用率下降，BYOD（自带设备）成为娱乐首选。",
      "航司急需通过减轻IFE重量来置换物理舒适性构件。"
    ],
    visual: "IFE使用频率 VS BYOD使用频率 趋势图（2015-2025）",
    footer: "01 项目背景"
  },
  {
    id: 4,
    section: "背景与定义",
    title: "问题定义：两套系统的深度错配",
    content: [
      "娱乐入口错配：旅客仍坐在为‘背板屏幕’时代的座椅上，使用‘自有手持设备’。",
      "腿部支撑错配：长途飞行明显的支撑需求与窄体机严苛的起降收纳、重量冗余之间的矛盾。",
      "核心挑战：如何在不显著增加重量的情况下，提供合法、安全的腿部抗疲劳支持？"
    ],
    visual: "‘屏幕时代座椅’与‘移动设备用户’的姿态碰撞示意图",
    footer: "01 问题定义"
  },
  {
    id: 5,
    section: "用户研究",
    title: "研究方法：半结构化访谈与行为观察",
    content: [
      "访谈对象：20名有4小时以上窄体机飞行经验的常旅客。",
      "观察重点：飞行3小时后的肢体摆放习惯、对前排座椅下方空间的侵占行为。",
      "数据采集：通过体压分布模拟关键压力点。"
    ],
    visual: "研究样本分布图 + 典型访谈记录卡片",
    footer: "02 用户研究"
  },
  {
    id: 6,
    section: "用户研究",
    title: "用户旅程图 (User Journey Map)：长途疲劳的爆发点",
    content: [
      "起飞（好奇期） -> 餐饮（适应期） -> 观影（倦怠期） -> 入睡/补眠（爆发期）。",
      "核心痛点出现在‘观影-入睡’转换期：双腿悬空导致的下股静脉受压与脚踝酸胀。",
      "行为趋势：极度渴望将双脚垫高，哪怕仅有5-10cm。"
    ],
    visual: "用户情绪与疲劳度曲线 + 姿态演变关键节点",
    footer: "02 用户研究"
  },
  {
    id: 7,
    section: "用户研究",
    title: "典型旅客 Persona：业务出差者 vs 休闲旅游者",
    content: [
      "业务出差者：关注办公支持与短暂的高效补眠（对腿部支撑要求更隐蔽、稳定）。",
      "休闲旅游者：关注观影舒适度与放松姿态（对腿部支撑灵活性要求更高）。",
      "共性：BYOD依赖度极高，手机/平板是核心交互窗口。"
    ],
    visual: "双维度Persona对比画布",
    footer: "02 用户研究"
  },
  {
    id: 8,
    section: "用户研究",
    title: "核心发现：旅客对“抬腿”动作的高度渴望",
    content: [
      "‘我想把腿垫在行李箱上’ 是访谈中出现频率最高的话术（85%）。",
      "抬腿需求是非侵入性的，用户更倾向于‘微抬’而非‘平躺’。",
      "座椅目前的硬质构件完全阻断了这种低门槛的舒适补偿行为。"
    ],
    visual: "访谈原话词云 + 腿部姿态草图统计",
    footer: "02 用户研究"
  },
  {
    id: 9,
    section: "用户研究",
    title: "数据证明：轻微抬腿对舒适感的显著改善",
    content: [
      "医学证据：腿部微抬（15°-30°）可显著降低下肢深静脉压力，延缓水肿发生。",
      "实验数据：抬高10cm相比平放，小腿肌肉放电量（EMG）降低约18%。",
      "结论：窄体机无需平躺方案，小幅度的‘张力承载’即可解决80%的长途疲劳。"
    ],
    visual: "下肢压力分布模拟对比图 + 肌肉疲劳实验曲线",
    footer: "03 数据支持"
  },
  {
    id: 10,
    section: "现有方案",
    title: "现状调研：旅客的“自发补偿行为”分析",
    content: [
      "行李箱/背包垫脚：极易滑落，占用救生衣空间，存在隐患。",
      "盘腿/蜷缩：导致脊柱侧弯与局部供血不足。",
      "踩踏前排梁结构：破坏客舱结构，且高度不适宜。",
      "结论：补偿行为证明了功能缺失，但现有一切自发行为皆非优解。"
    ],
    visual: "乘客姿态观察摄影图集/剪影图",
    footer: "04 方案迭代"
  },
  {
    id: 11,
    section: "现有方案",
    title: "行业方案调研：腿部支撑的“不可能三角”",
    content: [
      "平躺/Recliner：窄体机排距无法容忍，显著增加运营成本。",
      "吊带式脚托：适航取证极其困难，容易绊倒旅客。",
      "地板伸缩踏板：笨重、积灰、清洁成本极高，机械寿命短。",
      "矛盾点：重量、排距兼容性、安全性无法三全。"
    ],
    visual: "现有竞品/方案分析矩阵图表",
    footer: "04 方案迭代"
  },
  {
    id: 12,
    section: "废弃方案与逻辑验证",
    title: "废弃路径 A：硬质折叠踏板 (Rigid Footrest)",
    content: [
      "方案描述：模仿火车座椅的硬质塑料/金属折叠板。",
      "弃用原因：窄体机排距过低，硬质件会撞击前排骨架；重量过大（>1kg）；存在断裂伤人的适航风险。",
      "反思：物理结构不能是‘硬的’。"
    ],
    visual: "硬质踏板受力冲突示意（红叉标识）",
    footer: "04 方案迭代"
  },
  {
    id: 13,
    section: "废弃方案与逻辑验证",
    title: "废弃路径 B：充气/软质悬挂托盘",
    content: [
      "方案描述：模仿户外吊床的柔性织物托架。",
      "弃用原因：晃动感过强，乘客缺乏安全支撑感；对前排靠背产生拉扯力，影响前排稳定性。",
      "反思：结构必须具备‘张力约束’而非‘悬浮’。"
    ],
    visual: "悬挂式方案稳定性不足演示图",
    footer: "04 方案迭代"
  },
  {
    id: 14,
    section: "迭代路径：从“构件”到“系统”的转折",
    title: "方案迭代收敛路径：抗疲劳的整体解法",
    content: [
      "不再试图在传统座椅上‘外挂’零件。",
      "核心逻辑：移除背板IFE重量（约3kg/座） -> 置换为张力腿托结构 + W-IFE交互界面。",
      "迭代树：从单一脚踏 -> 腿部支撑面 -> 张力张弦结构系统。"
    ],
    visual: "方案演变迭代树 (Evolution Tree)",
    footer: "04 方案迭代"
  },
  {
    id: 15,
    section: "最终系统",
    title: "系统概览：“物理结构置换”与“数字引导介入”",
    content: [
      "硬件：去屏幕化轻量椅背 + 自适应张力腿部支撑面。",
      "软件：基于W-IFE的BYOD服务架构，根据飞行状态实时引导。",
      "理念：座椅不再是硬件容器，而是动态的行为接口。"
    ],
    visual: "整机客舱系统架构图（物理层、通讯层、场景层）",
    footer: "05 最终方案"
  },
  {
    id: 16,
    section: "最终系统",
    title: "核心构件：张力腿部支撑面",
    content: [
      "结构形式：半柔性复合织物 + 张弦预应力模组。",
      "核心特性：受压时产生张力承托，无硬性转动死角，极致轻量（<400g）。",
      "优势：解除腿部长期悬空压力；碰撞时织物可吸收动能，更符合适航安全。"
    ],
    visual: "张力腿托结构解说剖面图 + 应变分布云图",
    footer: "05 核心研发"
  },
  {
    id: 17,
    section: "最终系统",
    title: "张力支撑面的收纳与安全性逻辑",
    content: [
      "快速收纳：一键回弹/收放逻辑，确保在起降阶段完全隐藏于椅底。",
      "低维护：采用抗菌、防污的长效抗拉复合材料，优于传统织物。",
      "空间友好：展开后厚度极薄，不侵占斜后方旅客的腿部空间。"
    ],
    visual: "展开/收纳状态对比三维图 + 安全撤离间隙演示",
    footer: "05 核心研发"
  },
  {
    id: 18,
    section: "最终系统",
    title: "BYOD 时代的椅背重构：去屏幕化逻辑",
    content: [
      "移除昂贵的嵌入式屏幕，改为集成式充电模组与多段位设备支架。",
      "物理入口：集成RFID识别，手机贴近即可连接机上局域网（W-IFE）。",
      "不仅是支架，而是具备感知功能的‘交互前置件’。"
    ],
    visual: "椅背功能模组详细图解（含USB-C、多功能支架、感应区）",
    footer: "05 核心研发"
  },
  {
    id: 19,
    section: "交互逻辑",
    title: "交互技术架构：基于 W-IFE 与网页 DRM",
    content: [
      "技术选型：无App化体验。旅客连接热点后通过浏览器直接访问控制界面。",
      "网页端职责：显示当前座椅状态、调节引导、服务点单。",
      "反馈机制：硬件状态同步至网页端，实现座椅与自带设备的协同。"
    ],
    visual: "系统信息流转图 (Data Flow Diagram)",
    footer: "06 交互系统"
  },
  {
    id: 20,
    section: "交互逻辑",
    title: "场景引导一：发餐与休闲的无缝切换",
    content: [
      "发餐预选：旅客在网页端点餐后，系统自动提示：‘餐食将在3分钟后送达，请展开餐桌’。",
      "餐后切换：感知餐桌收起后，系统推送：‘建议开展腿部支撑以缓解久坐带来的不适’。",
      "目的：通过数字介入主动管理客舱行为节奏。"
    ],
    visual: "发餐场景状态机流程图 (State machine)",
    footer: "06 交互系统"
  },
  {
    id: 21,
    section: "交互逻辑",
    title: "场景引导二：抗疲劳介入与安全强制复位",
    content: [
      "疲劳提醒：检测到旅客连续观影超过90分钟，网页端建议变换姿态并开启腿部张力面。",
      "安全管控：滑行、起降或异常天气，网页端强制置灰观影，并提示：‘安全检测中，请立即收纳腿部支撑面’。",
      "逻辑：安全性始终高于舒适性引导。"
    ],
    visual: "安全复位交互界面演示图（UI Mockups）",
    footer: "06 交互系统"
  },
  {
    id: 22,
    section: "系统价值",
    title: "用户侧价值：长途舒适度的民主化",
    content: [
      "以极低成本让经济舱旅客获得‘类商务舱’的腿部放松体验。",
      "物理姿态优化：有效改善血液循环，缓解颈椎、腰椎联动的长途损伤。",
      "交互简化：回归用户习惯（手机/平板），降低新技术学习成本。"
    ],
    visual: "用户舒适度评分提升对比矩阵（预期）",
    footer: "07 价值评估"
  },
  {
    id: 23,
    section: "系统价值",
    title: "航司侧价值：减重、降本与效率",
    content: [
      "重量收益：移除IFE换取轻量结构，单机减重可达300-500kg，显著降低碳排。",
      "维护收益：物理张力件结构简单，无复杂电路与电机，故障率降低60%。",
      "品牌差异化：窄体长途航线的核心竞争力，提升复购率。"
    ],
    visual: "重量流向图（IFE除去 vs 张力系统加入）",
    footer: "07 价值评估"
  },
  {
    id: 24,
    section: "系统总结",
    title: "总结：座椅作为“行为接口”的长途客舱未来",
    content: [
      "核心突破：跳出‘增加硬件’的死循环，通过‘结构减法’实现‘体验加法’。",
      "方案内核：物理上的‘张力支撑’与数字上的‘状态驱动’深度耦合。",
      "结语：本研究旨在为窄体客机长途化这一确定性趋势提供一套可落地的、符合适航逻辑的设计原型。"
    ],
    visual: "最终系统渲染大图（实景氛围感）",
    footer: "07 价值评估"
  },
  {
    id: 25,
    section: "致谢",
    title: "感谢各位评审老师的聆听与指导",
    subtitle: "Q&A 环节",
    type: "end",
    content: [
      "窄体客机中长途飞行客舱座椅设计优化研究",
      "汇报人：[您的名字]",
      "专业：工业设计 / 交互设计"
    ],
    visual: "客舱全景渲染背景图",
    footer: "汇报结束"
  }
];

// --- App Component ---
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans overflow-hidden selection:bg-blue-500/30">
      {/* Top Header / Progress */}
      <header className="px-8 py-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Plane className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-medium tracking-wide text-zinc-400 uppercase">
              Cabin Design Thesis
            </h1>
            <p className="text-lg font-bold text-white leading-none">
              A321 Medium-Long Haul
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex gap-4 items-center bg-zinc-900/50 px-6 py-2 rounded-full border border-zinc-800">
           {slides.map((_, idx) => (
             <div 
               key={idx}
               className={cn(
                 "w-1.5 h-1.5 rounded-full transition-all duration-300",
                 idx === currentSlide ? "bg-blue-500 w-4" : (idx < currentSlide ? "bg-zinc-600" : "bg-zinc-800")
               )}
             />
           ))}
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFullscreen}
            className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </header>

      {/* Main Slide Container */}
      <main className="flex-1 relative flex items-center justify-center px-4 md:px-12 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
              "w-full max-w-6xl aspect-[16/9] bg-zinc-900/80 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden relative flex",
              slide.type === 'cover' ? "bg-gradient-to-br from-blue-900/20 via-zinc-900 to-black" : ""
            )}
          >
            {/* Background Texture/Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff05_1px,transparent_0)] bg-[size:40px_40px] pointer-events-none" />
            
            {/* Slide Content */}
            <div className="relative z-10 flex flex-col w-full h-full p-12">
              {/* Top Banner */}
              <div className="flex items-center gap-3 mb-8">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-md border border-blue-500/20">
                  SECTION {Math.floor(currentSlide / 5) + 1}
                </span>
                <span className="text-zinc-500 font-mono text-xs tracking-widest">
                  {slide.section} / PAGE {slide.id.toString().padStart(2, '0')}
                </span>
              </div>

              <div className="flex-1 flex flex-col md:flex-row gap-12">
                <div className="flex-1 flex flex-col justify-center">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={cn(
                      "font-bold leading-tight tracking-tight mb-6",
                      slide.type === 'cover' ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"
                    )}
                  >
                    {slide.title}
                  </motion.h2>
                  
                  {slide.subtitle && (
                    <p className="text-blue-400 text-xl font-medium mb-8">
                      {slide.subtitle}
                    </p>
                  )}

                  <div className="space-y-4">
                    {slide.content.map((item, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        key={i} 
                        className="flex items-start gap-4"
                      >
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        <p className="text-zinc-300 text-lg leading-relaxed">
                          {item}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Visual Area Placeholder */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full md:w-[45%] flex flex-col justify-center gap-4"
                >
                  <div className="flex-1 bg-zinc-800/50 rounded-2xl border border-zinc-700/50 flex flex-col items-center justify-center p-8 text-center group transition-all duration-500 hover:border-blue-500/30">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {getVisualIcon(slide.id)}
                    </div>
                    <p className="text-zinc-400 text-sm italic mb-2">建议图示建议：</p>
                    <p className="text-white text-lg font-medium leading-snug">
                      {slide.visual}
                    </p>
                    <div className="mt-8 flex gap-2">
                       <div className="w-12 h-1 bg-zinc-700 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-600 animate-pulse w-full" />
                       </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Footer */}
              <div className="mt-8 flex justify-between items-center text-zinc-500 text-xs font-mono border-t border-zinc-800 pt-6">
                <span>{slide.footer}</span>
                <span className="text-blue-500/50">DESIGN INTERVENTIONS IN NARROW-BODY CABINS</span>
                <span>© 2026 GRADUATION PROJECT</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Floating Buttons */}
        <div className="absolute inset-y-0 w-full flex justify-between px-4 pointer-events-none md:px-0 md:justify-center md:gap-[70rem]">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={cn(
              "w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-white pointer-events-auto transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-30",
              currentSlide === 0 && "cursor-not-allowed"
            )}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={cn(
              "w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-white pointer-events-auto transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-30",
              currentSlide === slides.length - 1 && "cursor-not-allowed"
            )}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </main>

      {/* Bottom Thumbnails Strip */}
      <footer className="h-20 bg-black/40 backdrop-blur-md border-t border-zinc-900 flex items-center px-8 gap-2 overflow-x-auto scroller-hidden z-20">
        {slides.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={cn(
              "flex-shrink-0 w-16 h-10 rounded-md border text-[10px] flex items-center justify-center transition-all",
              idx === currentSlide 
                ? "bg-blue-600 border-blue-400 text-white font-bold scale-110 shadow-[0_0_15px_-3px_rgba(37,99,235,0.6)]" 
                : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700"
            )}
          >
            {idx + 1}
          </button>
        ))}
      </footer>

      {/* Keyboard Hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 font-mono tracking-widest hidden lg:block uppercase pointer-events-none">
        Use Arrows or Space to navigate • Press F for Fullscreen
      </div>
    </div>
  );
}

function getVisualIcon(id: number) {
  if (id === 1 || id === 25) return <Plane className="text-blue-500" />;
  if (id <= 4) return <AlertCircle className="text-orange-400" />;
  if (id <= 8) return <User className="text-emerald-400" />;
  if (id === 9) return <Activity className="text-rose-400" />;
  if (id <= 11) return <Database className="text-blue-400" />;
  if (id <= 14) return <XCircle className="text-red-400" />;
  if (id <= 18) return <Layers className="text-purple-400" />;
  if (id <= 21) return <Smartphone className="text-cyan-400" />;
  return <CheckCircle2 className="text-blue-500" />;
}
