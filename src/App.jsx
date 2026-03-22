import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  Check, 
  X, 
  MapPin, 
  Calendar, 
  Users, 
  TrendingUp, 
  Zap,
  Target,
  MessageCircle,
  Award,
  Menu,
  Clock,
  Heart,
  Activity,
  HelpCircle,
  Gift,
  Instagram,
  Youtube,
  Facebook,
  Smartphone,
  CreditCard,
  UserCheck,
  User,
  Quote,
  ArrowRight,
  BookOpen, 
  Flame, 
  Trophy, 
  Timer, 
  ChevronDown, 
  Minus, 
  FileText, 
  Video, 
  RefreshCw, 
  ArrowDown, 
  ArrowUp,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  Star,        
  ThumbsUp,
  CheckSquare, 
  PlusCircle,
  Maximize2,
  Settings,
  Sparkles,
  Lightbulb,
  List,
  ExternalLink,
  Snowflake,
  ChevronsRight,
  Hand,
  Crown,
  Droplets,
  Flag
} from 'lucide-react';

// --- 定数設定 ---
const APPLY_URL = "https://moshicom.com/YOUR_EVENT_ID/"; 

const IMAGES = {
  HERO: 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?auto=format&fit=crop&q=80&w=1920', // 夏の青空とランナー
  COACH_HAYATE: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=400',
  COACH_SENPUKU: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=400',
};

// --- サブコンポーネント ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 text-lg font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg rounded-full active:scale-95";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/30",
    secondary: "bg-white text-blue-900 border-2 border-blue-100 hover:border-blue-600 hover:text-blue-600",
    outline: "bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    premium: "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 shadow-xl shadow-blue-600/40"
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Section = ({ children, className = "", id = "" }) => (
  <section id={id} className={`py-20 md:py-32 ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = "" }) => (
  <div className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 ${className}`}>
    {children}
  </div>
);

const CycleDetailModal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl relative animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100/80 backdrop-blur rounded-full hover:bg-slate-200 transition-colors z-20">
          <X size={24} className="text-slate-600" />
        </button>
        <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 w-full text-left">
            <span className="text-white/90 font-black tracking-widest text-sm uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Step {item.step}</span>
            <h3 className="text-2xl md:text-3xl font-black text-white mt-3">{item.title}</h3>
          </div>
        </div>
        <div className="p-8">
          <div className="mb-8">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-800">
              <CheckCircle2 className={item.colorClasses.text} size={20} /> このステップで得られること
            </h4>
            <div className="space-y-3">
              {item.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <Check size={18} className={`${item.colorClasses.text} mt-0.5 shrink-0`} strokeWidth={3} />
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={onClose} variant="primary" className="w-full py-4">閉じる</Button>
        </div>
      </div>
    </div>
  );
};

// --- メインコンポーネント ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState(null);
  const [activeCoachTab, setActiveCoachTab] = useState('hayate');

  const storyContainerRef = useRef(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [centeredCardIndex, setCenteredCardIndex] = useState(0);

  const handleStoryScroll = () => {
    if (!storyContainerRef.current) return;
    const container = storyContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
    setStoryProgress(progress);

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    const cards = container.querySelectorAll('.story-card');
    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    setCenteredCardIndex(closestIndex);
  };

  useEffect(() => {
    const container = storyContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleStoryScroll);
      handleStoryScroll();
      window.addEventListener('resize', handleStoryScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleStoryScroll);
      }
      window.removeEventListener('resize', handleStoryScroll);
    };
  }, []);

  const scrollStory = (direction) => {
    if (!storyContainerRef.current) return;
    const container = storyContainerRef.current;
    const cardElement = container.querySelector('.story-card');
    const cardWidth = cardElement ? cardElement.offsetWidth : 450;
    const gap = window.innerWidth >= 768 ? 48 : 24; 
    const scrollAmount = cardWidth + gap;

    if (direction === 'prev') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const problemData = [
    { icon: Flame, title: "想像を絶する「5月の暑さ」による消耗", desc: "口コミでも毎年「とにかく暑い」と声が上がる黒部。無駄な力みのあるフォームで走ると、この暑さによって予想以上に早くスタミナを奪われてしまいます。" },
    { icon: TrendingUp, title: "前半の緩やかな上りで削られる「脚」", desc: "前半は立山連峰に向かうなだらかな上り基調。ここで「機能」を使わず「筋力」だけで登ってしまうと、30km以降の勝負どころで完全に脚が止まってしまいます。" },
    { icon: Activity, title: "暑さとフォームの崩れによる胃腸トラブル", desc: "名物エイドが魅力の黒部ですが、体幹がブレるフォームで走っていると内臓が揺れ、後半の暑い中で水やジェルを受け付けなくなる事態に陥りやすいです。" },
  ];

  const featuresData = [
    {
      title: "意識ではなく「機能」から変える",
      subtitle: "根本の原因からアプローチ",
      desc: "一般的な「腕を振る」「前傾する」といった意識による修正は行いません。なぜ腕が振れないのか？という根本的な原因（呼吸、可動域、バランス）の機能改善からアプローチします。",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800",
      colorClass: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "走る前の「姿勢作り」とコンディショニング",
      subtitle: "正しいフォームは土台から",
      desc: "走るテクニックを学ぶ前に、まずは自分の身体を正しく扱える状態（姿勢作り）に整えます。身体の土台を作ることで、怪我を防ぎ、効率的な走りを無意識に維持できるようになります。",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800",
      colorClass: "bg-cyan-50 text-cyan-600 border-cyan-100"
    },
    {
      title: "身体×走りの「ダブルコーチ体制」",
      subtitle: "機能改善と実践の融合",
      desc: "身体の構造や機能改善を熟知したコンディショニングのプロと、黒部の道を走り込んだランニングのプロ。2つの視点から、あなたに最も適した負担のない走りを引き出します。",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800",
      colorClass: "bg-sky-50 text-sky-600 border-sky-100"
    }
  ];

  const beforeAfterData = {
    before: [
      "「腕を振る」「腰を高く」と意識してもすぐ崩れる",
      "後半になると脚が重くなり、ペースが落ちる",
      "同じ場所の痛みや怪我を繰り返してしまう",
      "気合いと根性だけで距離を走り込んでいる"
    ],
    after: [
      "意識しなくても自然な前傾×腰高の省エネフォームになる",
      "呼吸や可動域が改善し、走りが圧倒的に軽く感じる",
      "リズムが安定し、30km以降の失速が激減する",
      "負担の少ない走りで、怪我のリスクが大幅に下がる"
    ]
  };

  const storyData = [
    {
      step: "01", title: "目標設定", icon: <Flag size={20}/>,
      desc: "無料ヒアリングで現在地とゴールを明確化。漠然とした不安を、確かな目標に変えます。",
      image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=800&auto=format&fit=crop"
    },
    {
      step: "02", title: "練習メニュー＆動画", icon: <List size={20}/>,
      desc: "あなた専用のメニューと動き作り動画が届きます。「何をすればいいか」迷う時間はゼロに。",
      image: "https://images.unsplash.com/photo-1599447292180-45fd84092ef2?q=80&w=800&auto=format&fit=crop"
    },
    {
      step: "03", title: "走る＆EXで改善", icon: <Activity size={20}/>,
      desc: "フォーム改善EXで身体を整えながら実践。怪我を防ぎ、効率的に走力を積み上げます。",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop"
    },
    {
      step: "04", title: "2人のコーチと通話", icon: <Video size={20}/>,
      desc: "走力と身体、両面のプロと1on1。自分では気づけない癖や課題を修正する転換点です。",
      image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop"
    },
    {
      step: "05", title: "トライ＆エラー", icon: <RefreshCw size={20}/>,
      desc: "正しい指針があるから失敗は怖くない。修正して走る、その繰り返しが強さを作ります。",
      image: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=800&auto=format&fit=crop"
    },
    {
      step: "06", title: "仲間と交流", icon: <Users size={20}/>,
      desc: "ライブ配信やコミュニティで仲間の頑張りに触れる。それが継続の力となり、心を支えます。",
      image: "https://images.unsplash.com/photo-1576858574144-9ae133fb4562?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const voices = [
    {
      name: "40代 男性",
      timeBefore: "3:26:02",
      timeAfter: "2:58:45",
      highlight: "約27分短縮",
      comment: "自己流で月300km走っても記録が伸びず、怪我ばかり。RUNCAMPで『骨格に合ったフォーム』を学び、無駄な力が抜けました。練習量は以前より減ったのに、タイムは大幅更新。「もう伸びないかも」という不安が「まだ行ける」という確信に変わりました！",
      stars: 5,
      tag: "サブ3達成"
    },
    {
      name: "50代 男性",
      timeBefore: "3:54:20",
      timeAfter: "3:28:48",
      highlight: "約25分短縮",
      comment: "若い頃のような体力任せの走りが通用しなくなり、後半の失速が悩みでした。ここで『反力』を使う走り方を教わり、楽にスピードが出るように。50代での大幅自己ベスト。年齢は言い訳にならないと証明できました。大人の部活動のような3ヶ月でした。",
      stars: 5,
      tag: "自己ベスト更新"
    },
    {
      name: "50代 女性",
      timeBefore: "関門棄権",
      timeAfter: "6:09:42",
      highlight: "リベンジ完走",
      comment: "「これをやれば大丈夫」という安心感があり継続できました。コーチの励ましや仲間との練習日誌がやる気を引き出し、孤独な練習から脱却できました。安心感を持って練習に取り組める環境が継続の鍵だったと実感しています。",
      stars: 5,
      tag: "完走達成"
    }
  ];

  const coaches = {
    hayate: {
      name: "ハヤテ コーチ",
      title: "ランニングコーチ",
      desc: "ただがむしゃらに距離を踏むだけでは、黒部のコースは攻略できません。トレーニングの考え方や具体的な練習方法、そして『本番で絶対に失敗しないための戦略』を私がお伝えします。頭を使って、今年こそ最高のゴールテープを切りましょう！",
      image: IMAGES.COACH_HAYATE,
      points: ["目標達成のためのトレーニング思考法", "黒部特化のペース・補給戦略", "本番で失敗しないメンタルコントロール"]
    },
    senpuku: {
      name: "センプク コーチ",
      title: "コンディショニングコーチ",
      desc: "「もっと腕を振って」という意識づけだけでフォームは変わりません。大切なのは、呼吸や可動域、バランスといった『身体の機能』を改善すること。根本的な姿勢作りからアプローチし、痛みのない、効率的なランニングフォームへの進化をサポートします！",
      image: IMAGES.COACH_SENPUKU,
      points: ["意識ではなく「機能」からのフォーム改善", "呼吸と可動域の最適化で痛みを改善", "怪我を根本から防ぐ身体のバランス調整"]
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500;700;900&display=swap');
        .font-impact { font-family: 'Noto Sans JP', sans-serif; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-up { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-up { animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .blue-glow {
          color: #60a5fa; /* blue-400 */
          text-shadow: 0 0 15px rgba(96, 165, 250, 0.7), 0 0 30px rgba(59, 130, 246, 0.4);
        }
        .scrollbar-custom::-webkit-scrollbar { height: 8px; }
        .scrollbar-custom::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
        .scrollbar-custom::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 4px; }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover { background: #2563eb; }

        .story-card {
            opacity: 0.4;
            transform: scale(0.9);
            filter: blur(2px);
            transition: all 0.5s ease;
        }
        .story-card.in-view {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>

      {/* --- Modals --- */}
      <CycleDetailModal item={selectedModalItem} onClose={() => setSelectedModalItem(null)} />

      {/* --- Navigation --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-50/50 shadow-sm">
        <Container>
          <div className="flex items-center justify-between h-20">
            <div className="cursor-pointer group flex items-center gap-2" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="text-2xl font-black tracking-tighter text-slate-800 group-hover:text-blue-600 transition-colors">
                RUNCAMP
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {['黒部の壁', 'メソッド', 'ストーリー', '参加者の声', 'プラン'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {item}
                </button>
              ))}
              <Button variant="primary" className="px-6 py-2.5 text-sm" onClick={() => scrollToSection('プラン')}>
                一緒に走る
              </Button>
            </nav>

            <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </Container>
      </header>

      {/* --- Mobile Menu --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white animate-fade-in lg:hidden pt-24">
          <div className="flex flex-col items-center gap-8 p-10">
            {['黒部の壁', 'メソッド', 'ストーリー', '参加者の声', 'スケジュール', 'プラン'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-2xl font-bold text-slate-800"
              >
                {item}
              </button>
            ))}
            <Button variant="primary" className="w-full mt-4" onClick={() => scrollToSection('プラン')}>一緒に走る</Button>
          </div>
        </div>
      )}

      {/* --- Hero Section --- */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-100">
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.HERO} alt="Summer Marathon" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
        </div>
        
        <Container className="relative z-10 w-full flex justify-start">
          <div className="max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-5 py-2 rounded-full mb-8 animate-fade-in font-black tracking-widest text-sm shadow-lg">
              <Flame size={16} className="animate-pulse" />
              <span>本気でやり切る、大人の短期集中合宿プロジェクト</span>
            </div>

            <h1 className="text-white font-impact tracking-tight leading-[1.15] mb-8">
              <span className="block text-3xl md:text-5xl mb-4 font-bold text-blue-200">2ヶ月の機能改善で、走りは劇的に変わる。</span>
              <span className="block text-6xl md:text-[7rem] lg:text-[8rem] font-black drop-shadow-lg mb-2 text-white">もう絶対に、</span>
              <span className="block text-5xl md:text-[6rem] lg:text-[7rem] font-black text-blue-400 drop-shadow-lg">失速しない。</span>
            </h1>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Button variant="primary" className="px-10 py-6 text-xl w-full sm:w-auto shadow-2xl shadow-blue-500/50 bg-blue-600 hover:bg-blue-500 text-white transform hover:scale-105" onClick={() => scrollToSection('プラン')}>
                本気でプロジェクトに参加する <ChevronRight className="ml-2 font-black" size={24} />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* --- Achievement Section --- */}
      <section className="bg-slate-900 text-white border-t border-white/10 py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-700 text-center">
            <div className="pt-8 md:pt-0 flex flex-col items-center justify-center">
              <p className="text-blue-400 font-black tracking-[0.2em] text-sm mb-3 uppercase font-en">PB Achievement Rate</p>
              <h3 className="text-lg md:text-xl font-bold mb-4 tracking-wider">自己ベスト達成率</h3>
              <div className="blue-glow text-8xl md:text-9xl font-black tracking-tighter flex justify-center items-baseline gap-1 font-sans mb-4">
                93<span className="text-5xl md:text-6xl">%</span>
              </div>
              <p className="text-slate-400 text-xs font-medium tracking-wide">※6ヶ月以上在籍した会員の実績</p>
            </div>
            <div className="pt-12 md:pt-0 flex flex-col items-center justify-center">
              <p className="text-blue-400 font-black tracking-[0.2em] text-sm mb-3 uppercase font-en">Avg. Time Reduction</p>
              <h3 className="text-lg md:text-xl font-bold mb-4 tracking-wider">フルマラソン平均短縮タイム</h3>
              <div className="blue-glow text-8xl md:text-9xl font-black tracking-tighter flex justify-center items-baseline gap-1 font-sans mb-4">
                <span className="text-6xl md:text-7xl text-blue-400 mr-1">-</span>18<span className="text-5xl md:text-6xl">min</span>
              </div>
              <p className="text-slate-400 text-xs font-medium tracking-wide">※RUNCAMPメソッド実践者の平均値</p>
            </div>
          </div>
        </Container>
      </section>

      {/* --- Problem Section --- */}
      <Section id="黒部の壁" className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-blue-600 font-black mb-4 tracking-widest uppercase text-sm">Our Challenge</h2>
              <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-slate-900">
                黒部名水マラソンで直面する、<br className="hidden md:block" />
                <span className="text-blue-600">3つの壁</span>
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                景色は最高で、沿道の応援も温かい黒部名水マラソン。ですが、ランナーにとってコースは決して簡単ではありません。毎年口コミでも話題になる「特有の難所」に対して、間違った意識で走ると必ず後半に苦しみます。
              </p>
            </div>
            
            <div className="space-y-6">
              {problemData.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-5 p-8 rounded-3xl bg-blue-50/50 border border-blue-100 hover:bg-blue-50 transition-colors">
                  <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center text-blue-500 shrink-0">
                    <item.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-3 text-slate-800">{item.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Before / After Section --- */}
      <Section className="bg-slate-100 py-16 border-y border-slate-200">
        <Container>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">この短期間で手に入るもの</h3>
            <p className="text-slate-600 mt-4 font-bold">ダラダラ走る日々は終わり。機能改善にフルコミットするからこそ、圧倒的な変化が起きます。</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Before */}
            <div className="bg-white p-8 md:p-10 rounded-3xl w-full md:w-5/12 shadow-sm border-t-8 border-slate-300 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-slate-500 text-white font-black px-6 py-1.5 rounded-full text-sm">
                Before
              </div>
              <ul className="space-y-5 mt-4">
                {beforeAfterData.before.map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="text-slate-400 shrink-0 mt-0.5" size={24} strokeWidth={3} />
                    <span className="text-slate-600 font-bold text-lg">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow */}
            <div className="bg-blue-500 text-white p-4 rounded-full shadow-lg z-10 md:-mx-8 transform rotate-90 md:rotate-0 flex-shrink-0">
              <ArrowRight size={32} strokeWidth={3} />
            </div>

            {/* After */}
            <div className="bg-white p-8 md:p-10 rounded-3xl w-full md:w-5/12 shadow-xl border-t-8 border-blue-500 transform md:scale-105 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white font-black px-6 py-1.5 rounded-full text-sm shadow-md">
                After
              </div>
              <ul className="space-y-5 mt-4">
                {beforeAfterData.after.map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={24} strokeWidth={3} />
                    <span className="text-slate-800 font-black text-lg">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Method Section --- */}
      <Section id="メソッド" className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <span className="text-blue-500 font-black tracking-widest text-sm mb-2 block uppercase">Method</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 uppercase">
              THE RUNCAMP METHOD
            </h2>
            <p className="text-slate-600 font-bold text-base md:text-lg">
              身体の専門家による<span className="text-blue-600 text-xl md:text-2xl mx-1 font-black">1on1指導</span>。<br className="md:hidden"/>
              「機能」を変える根本解決のアプローチ。
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center leading-relaxed">
              なぜ、「フォームを意識」しても<br className="hidden md:block"/>走りは変わらないのか？
            </h3>
            <div className="text-slate-600 leading-loose mb-10 text-center text-sm md:text-base px-2">
              <p className="mb-4">「腕をもっと振って」「背筋を伸ばして」「腰を高く」<br />ランニングの指導でよく耳にする言葉です。</p>
              <p className="mb-6">しかし、言われた通りに意識しても、すぐに疲れたり、怪我をしてしまったりした経験はありませんか？</p>
              <p className="mb-4">それは、あなたの努力不足ではありません。</p>
              <p className="font-bold text-blue-600 border-b-2 border-blue-600 pb-1 inline-block text-base md:text-lg mt-2">
                身体の機能（可動域や筋力バランス）が、その動きに対応できていないからです。
              </p>
            </div>

            {/* Comparison Panel */}
            <div className="relative grid md:grid-cols-2 gap-8 mt-16">
              {/* VS Badge (Desktop only) */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg items-center justify-center z-20 font-black text-slate-300 border border-slate-100">
                VS
              </div>

              {/* OLD */}
              <div className="bg-slate-100 p-6 md:p-8 rounded-3xl relative overflow-hidden border border-slate-200 opacity-90 hover:opacity-100 transition-opacity">
                <div className="absolute top-2 right-4 text-7xl font-black text-slate-200/70 z-0 select-none">OLD</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="bg-slate-400 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest">一般的な指導（意識）</div>
                  </div>
                  <p className="font-black text-xl text-slate-600 mb-6 flex items-start gap-1">
                    <span className="text-slate-400">「</span>もっと腕を振って！<span className="text-slate-400">」</span>
                  </p>
                  <div className="bg-white p-5 rounded-2xl text-sm text-slate-600 shadow-inner">
                    <span className="font-bold text-slate-800 flex items-center gap-2 mb-3 border-b border-slate-100 pb-2">
                      <X size={16} className="text-red-400" strokeWidth={3} /> よくある結果
                    </span>
                    <p className="leading-relaxed">
                      無理やり動かすため、<span className="font-bold text-red-500">すぐに疲れる。</span>肩が凝る。<br/>
                      意識が切れると<span className="font-bold">元に戻る。</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* NEW */}
              <div className="bg-white p-6 md:p-8 rounded-3xl relative overflow-hidden border-4 border-blue-500 shadow-2xl shadow-blue-500/20 transform md:scale-105 z-10">
                <div className="absolute top-2 right-4 text-7xl font-black text-blue-50 z-0 select-none">NEW</div>
                <div className="absolute -right-10 -bottom-10 text-blue-500/5">
                  <Activity size={200} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md tracking-widest">RUNCAMP（機能改善）</div>
                  </div>
                  <p className="font-black text-2xl text-slate-900 mb-6 flex items-start gap-1">
                    <span className="text-blue-500">「</span>肩甲骨の可動域を広げる<span className="text-blue-500">」</span>
                  </p>
                  <div className="bg-blue-50 p-6 rounded-2xl text-sm text-slate-700 border border-blue-100 relative">
                    <span className="font-black text-blue-700 flex items-center gap-2 mb-3 border-b border-blue-200 pb-2 text-base">
                      <Check size={20} className="text-blue-600" strokeWidth={4} /> 機能改善の結果
                    </span>
                    <p className="leading-loose font-bold">
                      肩甲骨がスムーズに動くようになり、<br/>
                      <span className="text-blue-700 text-lg border-b-2 border-blue-400 inline-block bg-white px-2 py-1 rounded mt-1 mb-1 shadow-sm">
                        意識しなくても勝手に腕が振れる。
                      </span><br/>
                      無駄な力みがないから、<span className="text-blue-600 text-base">疲れない。</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* --- Voice Section --- */}
      <Section id="参加者の声" className="bg-slate-50 border-t border-slate-200">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-black mb-4 tracking-widest uppercase text-sm">Runner's Voice</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">一緒に走った皆さんの声</h3>
            <p className="text-slate-500 mt-4 font-bold">多くの方が目標達成の喜びを分かち合っています。</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {voices.map((voice, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 relative flex flex-col h-full hover:shadow-xl transition-shadow group">
                <div className="flex justify-between items-start mb-6">
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                    {voice.tag}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(voice.stars)].map((_, i) => (
                      <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                </div>

                {/* --- タイム変化の強調ブロック --- */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-4 md:p-5 mb-6 text-white shadow-lg flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex-1 text-center">
                      <span className="text-blue-200 text-[10px] font-black uppercase tracking-wider block mb-1">Before</span>
                      <span className="text-base lg:text-lg font-black text-blue-200 line-through decoration-blue-400 decoration-2">{voice.timeBefore}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center shrink-0 px-2 md:px-4">
                      <ArrowRight className="text-yellow-400" size={24} strokeWidth={3}/>
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-yellow-300 text-[10px] font-black uppercase tracking-wider block mb-1">After</span>
                      <span className="text-2xl lg:text-3xl font-black text-white drop-shadow-md">{voice.timeAfter}</span>
                    </div>
                  </div>
                  <div className="mt-3 bg-white/10 px-4 py-1 rounded-full border border-white/20">
                    <span className="text-yellow-300 text-xs font-black tracking-widest">{voice.highlight}</span>
                  </div>
                </div>
                
                <p className="font-bold text-slate-700 text-sm leading-relaxed flex-grow">
                  「{voice.comment}」
                </p>
                <div className="border-t border-slate-200 pt-6 mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm shrink-0 text-slate-400">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="font-black text-sm text-slate-800">{voice.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Features Section --- */}
      <Section id="特徴" className="bg-slate-50 border-t border-slate-200">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-black mb-4 tracking-widest uppercase text-sm">Commitment</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">最後までやり切るための3つの環境</h3>
            <p className="mt-4 font-bold text-slate-600">一人では超えられない限界も、RUNCAMPなら確実に突破できます。</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full">
              <div className="h-48 w-full relative overflow-hidden flex-shrink-0">
                <img src={featuresData[0].image} alt="機能改善" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="text-blue-600 font-black text-sm mb-2 tracking-widest">01. METHOD</div>
                <h4 className="text-2xl font-black text-slate-800 mb-4 leading-tight">意識論を捨て、<br/>「機能改善」にフルコミット</h4>
                <p className="text-slate-600 leading-relaxed text-sm flex-grow font-medium">
                  精神論や「腕を振れ」といった抽象的なアドバイスは一切しません。呼吸や可動域など、科学的根拠に基づいた身体の機能改善に集中し、短期間で「無意識でも崩れないフォーム」を作り上げます。
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full transform md:-translate-y-4">
              <div className="h-48 w-full relative overflow-hidden flex-shrink-0">
                <img src={featuresData[2].image} alt="プロの伴走" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-cyan-900/20 mix-blend-multiply"></div>
                <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 text-xs font-black px-3 py-1 rounded-full shadow-lg">徹底管理</div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="text-cyan-600 font-black text-sm mb-2 tracking-widest">02. SUPPORT</div>
                <h4 className="text-2xl font-black text-slate-800 mb-4 leading-tight">絶対に挫折させない<br/>「2人のプロ」の伴走</h4>
                <p className="text-slate-600 leading-relaxed text-sm flex-grow font-medium">
                  ランニング戦略のプロと、コンディショニングのプロ。2人の専属コーチがあなたの状態を徹底管理。怪我の不安やモチベーション低下も、いつでも相談できる環境で即座に解決へ導きます。
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full">
              <div className="h-48 w-full relative overflow-hidden flex-shrink-0">
                <img src={featuresData[1].image} alt="仲間の存在" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-sky-900/20 mix-blend-multiply"></div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="text-sky-600 font-black text-sm mb-2 tracking-widest">03. COMMUNITY</div>
                <h4 className="text-2xl font-black text-slate-800 mb-4 leading-tight">逃げ道のない、<br/>最高の「仲間の存在」</h4>
                <p className="text-slate-600 leading-relaxed text-sm flex-grow font-medium">
                  一人では心が折れそうな厳しい練習も、同じ目標に向かう仲間がいれば乗り越えられます。励まし合い、日々の成長を共有する濃密な時間は、まるで学生時代の合宿のような一生の財産になります。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Story Section --- */}
      <Section id="ストーリー" className="bg-white relative overflow-hidden py-24 border-t border-slate-200">
        <Container className="relative z-10">
          <div className="mb-8 text-center">
            <span className="text-blue-600 font-black tracking-widest text-sm mb-2 block uppercase">Story of Growth</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900">
              自分を超える、特別な物語
            </h2>
            <p className="mt-2 text-slate-500 font-bold text-sm">RUNCAMPで歩む、短期集中の軌跡</p>
          </div>
          <div className="max-w-3xl mx-auto mb-8 px-4">
            <div className="flex justify-between text-[10px] font-bold text-blue-500 mb-2 tracking-widest uppercase"><span>Start</span><span>Goal</span></div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden relative">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-100 ease-linear" style={{ width: `${storyProgress}%` }}></div>
            </div>
          </div>
          <div className="relative group/slider">
            <button onClick={() => scrollStory('prev')} className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-blue-600 text-slate-800 hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 md:opacity-100 border border-slate-200 backdrop-blur-sm hidden md:flex">
              <ChevronRight className="rotate-180" />
            </button>
            <button onClick={() => scrollStory('next')} className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-blue-600 text-slate-800 hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 md:opacity-100 border border-slate-200 backdrop-blur-sm hidden md:flex">
              <ChevronRight />
            </button>
            <div className="text-center text-[10px] text-blue-500 font-bold tracking-widest mb-4 animate-pulse md:hidden flex items-center justify-center gap-1">
              SWIPE <ArrowRight size={12} />
            </div>
            
            <div ref={storyContainerRef} className="flex gap-6 md:gap-12 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-custom px-6 md:px-[calc(50%-225px)] -mx-6 md:mx-0 py-8 items-center scroll-smooth">
              {storyData.map((story, index) => (
                <div key={index} className={`story-card flex-shrink-0 w-[85vw] md:w-[450px] snap-center bg-slate-50 rounded-3xl shadow-sm border border-slate-100 overflow-hidden group ${centeredCardIndex === index ? 'in-view' : ''}`}>
                  <div className="relative h-56 overflow-hidden">
                    <img src={story.image} alt={story.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                    <div className="absolute top-0 left-0 bg-slate-900 text-white px-4 py-2 text-xl font-black rounded-br-2xl">{story.step}</div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-black mb-3 flex items-center gap-3 text-slate-800">
                      {story.title} <span className="text-blue-500">{story.icon}</span>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{story.desc}</p>
                  </div>
                </div>
              ))}
              
              {/* GOAL Card */}
              <div className={`story-card flex-shrink-0 w-[85vw] md:w-[450px] snap-center bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl shadow-xl overflow-hidden relative group flex items-center ${centeredCardIndex === storyData.length ? 'in-view' : ''}`}>
                <div className="p-8 flex flex-col items-center justify-center text-center w-full relative z-10 h-full py-16">
                  <div className="w-20 h-20 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-2xl flex-shrink-0 animate-bounce mb-6">
                    <Trophy size={40} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-2 tracking-wider uppercase font-en">Goal</h3>
                    <h4 className="text-2xl font-bold mb-4 text-yellow-300">自分を心から誇れる瞬間</h4>
                    <p className="text-sm text-white/90 leading-relaxed font-medium">タイムという結果だけでなく、「やり切った」という圧倒的な充実感。この2ヶ月の濃密な体験が、今後のあなたの走りをより強く、楽しく変えていきます。</p>
                  </div>
                </div>
              </div>
              
              {/* NEXT Card (Restart) */}
              <div onClick={() => storyContainerRef.current?.scrollTo({ left: 0, behavior: 'smooth' })} className={`story-card flex-shrink-0 w-[85vw] md:w-[450px] snap-center bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group cursor-pointer hover:-translate-y-2 transition duration-500 ${centeredCardIndex === storyData.length + 1 ? 'in-view' : ''}`}>
                <div className="relative h-56 overflow-hidden bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition">
                  <RefreshCw className="text-slate-200 group-hover:text-blue-100 transition duration-500 transform group-hover:scale-125 absolute w-48 h-48" strokeWidth={1} />
                  <div className="absolute top-0 left-0 bg-slate-900 text-white px-4 py-2 text-xl font-black rounded-br-2xl">NEXT</div>
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md z-10 group-hover:shadow-xl transition">
                    <RefreshCw className="text-slate-700 group-hover:text-blue-600 group-hover:-rotate-180 transition duration-700 w-8 h-8" />
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-black mb-3 text-slate-800">次の目標へ</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">ゴールは、新しいスタートライン。<br/>さらなる高みを目指して、物語は続きます。</p>
                  <span className="text-xs font-bold text-blue-600 border-b border-blue-600 pb-1 group-hover:opacity-80">最初に戻る</span>
                </div>
              </div>
              <div className="w-1 flex-shrink-0"></div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Schedule Section --- */}
      <Section id="スケジュール" className="bg-white border-t border-slate-200">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-blue-600 font-black mb-4 tracking-widest uppercase text-sm">Schedule</h2>
              <h3 className="text-3xl md:text-4xl font-black mb-8 text-slate-900">
                本番までのスケジュール
              </h3>
              <p className="text-slate-600 mt-4 font-bold">全2回の実践的ランニングセミナー</p>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <span className="text-blue-600 font-bold text-sm block mb-2 flex items-center gap-2"><Clock size={16}/> 第1回：4月18日(土) 午前</span>
                  <h4 className="text-2xl font-black mb-4">足の接地を変え、ランニング効率を高める</h4>
                  <div className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base space-y-3">
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-white bg-blue-500 px-2 py-0.5 rounded text-xs mt-0.5 shrink-0">前半</span>
                      <span>省エネの土台は重心にあり。正しい重心の獲得方法</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-white bg-blue-500 px-2 py-0.5 rounded text-xs mt-0.5 shrink-0">後半</span>
                      <span>前傾の獲得と人間本来の走り方(ミッドフット走法)で走ってみる</span>
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-blue-100">
                    <p className="font-bold text-blue-800 text-sm mb-3 flex items-center gap-2"><CheckCircle2 size={18}/> 期待できる効果</p>
                    <ul className="text-sm text-blue-700 space-y-2 pl-2">
                      <li className="flex items-center gap-2"><Check size={16} className="text-blue-500 shrink-0"/> 後半の腰落ちがなくなる</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-blue-500 shrink-0"/> 疲れても姿勢が崩れにくい</li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm mt-6">
                    <MapPin size={16} /> 富山県総合運動公園 周辺
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <span className="text-blue-600 font-bold text-sm block mb-2 flex items-center gap-2"><Clock size={16}/> 第2回：5月9日(土) 午前</span>
                  <h4 className="text-2xl font-black mb-4">腕振りを変え、ランニング効率を高める</h4>
                  <div className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base space-y-3">
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-white bg-blue-500 px-2 py-0.5 rounded text-xs mt-0.5 shrink-0">前半</span>
                      <span>反発をもらうコツは位置と角度にあり。正しい反発の受け方</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-white bg-blue-500 px-2 py-0.5 rounded text-xs mt-0.5 shrink-0">後半</span>
                      <span>反発、バネを使った楽な走り方</span>
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-blue-100">
                    <p className="font-bold text-blue-800 text-sm mb-3 flex items-center gap-2"><CheckCircle2 size={18}/> 期待できる効果</p>
                    <ul className="text-sm text-blue-700 space-y-2 pl-2">
                      <li className="flex items-center gap-2"><Check size={16} className="text-blue-500 shrink-0"/> リズムが落ちにくい</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-blue-500 shrink-0"/> 足の負担が減り、30kmの壁を超えやすくなる</li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm mt-6">
                    <MapPin size={16} /> 富山県総合運動公園 周辺
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Coach Section --- */}
      <Section id="コーチ" className="bg-slate-800 text-white overflow-hidden border-t border-slate-200">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-blue-400 font-black mb-4 tracking-widest uppercase text-sm">Coaches</h2>
              <h3 className="text-4xl font-black mb-10 leading-tight">
                私たちが、<br/>あなたの目標達成をサポートします。
              </h3>
              
              <div className="flex gap-4 mb-8">
                <button 
                  onClick={() => setActiveCoachTab('hayate')}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all border-2 ${activeCoachTab === 'hayate' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-slate-600 text-slate-400 hover:text-white hover:border-slate-500'}`}
                >
                  ハヤテコーチ
                </button>
                <button 
                  onClick={() => setActiveCoachTab('senpuku')}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all border-2 ${activeCoachTab === 'senpuku' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-slate-600 text-slate-400 hover:text-white hover:border-slate-500'}`}
                >
                  センプクコーチ
                </button>
              </div>

              <div className="animate-fade-in bg-slate-900/50 p-8 rounded-3xl border border-slate-700">
                <h4 className="text-2xl font-black mb-2">{coaches[activeCoachTab].name}</h4>
                <p className="text-blue-400 font-bold text-sm mb-6">{coaches[activeCoachTab].title}</p>
                <p className="text-slate-300 leading-relaxed mb-8">
                  「{coaches[activeCoachTab].desc}」
                </p>
                <div className="space-y-3">
                  {coaches[activeCoachTab].points.map((point, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="text-blue-400 shrink-0" size={18} />
                      <span className="font-bold text-slate-200">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative px-4">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative rotate-2">
                <img 
                  src={coaches[activeCoachTab].image} 
                  alt={coaches[activeCoachTab].name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500 rounded-full -z-10 opacity-50 blur-xl"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-cyan-500 rounded-full -z-10 opacity-30 blur-2xl"></div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Plan Section --- */}
      <Section id="プラン" className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <Container className="relative z-10">
          <div className="text-center mb-16 fade-up">
            <span className="text-blue-400 font-black tracking-widest uppercase text-sm mb-2 block font-en">Plan</span>
            <h2 className="text-4xl md:text-5xl font-black font-en tracking-tighter mb-4 text-white">
              PRICE & PLANS
            </h2>
            <p className="text-slate-400 font-bold">あなたに合わせた2つのプラン</p>
          </div>

          <div className="overflow-x-auto pb-8 fade-up">
            <div className="min-w-[800px] md:min-w-full max-w-5xl mx-auto">
              <div className="grid grid-cols-3 gap-4 lg:gap-6 text-sm md:text-base items-stretch">
                
                {/* Row Headers */}
                <div className="col-span-1 py-6 pr-4 flex flex-col">
                  <div className="h-32 mb-4 flex items-end pb-4 border-b border-transparent">
                    <span className="font-bold text-blue-400 text-lg">比較項目</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="h-16 flex items-center font-bold text-slate-300 border-b border-slate-700/50">LINEグループ</div>
                    <div className="h-16 flex items-center font-bold text-slate-300 border-b border-slate-700/50">練習メニュー</div>
                    <div className="h-16 flex items-center font-bold text-slate-300 border-b border-slate-700/50">個別フィードバック</div>
                    <div className="h-16 flex items-center font-bold text-slate-300 border-b border-slate-700/50">ライブ配信</div>
                    <div className="h-16 flex items-center font-bold text-slate-300 border-b border-slate-700/50">ランニングセミナー</div>
                    <div className="h-16 flex items-center font-bold text-slate-300 border-b border-slate-700/50">個別相談会(PB戦略)</div>
                    <div className="h-16 flex items-center font-bold text-slate-300 border-b border-slate-700/50">個別フォーム改善EX</div>
                    <div className="h-24 flex items-center font-bold text-slate-300">月額料金 (税込)</div>
                    <div className="h-16"></div> {/* Button row space */}
                  </div>
                </div>

                {/* LITE */}
                <div className="col-span-1 bg-white text-slate-800 rounded-2xl p-6 border border-slate-200 flex flex-col relative shadow-xl">
                  <div className="absolute top-4 right-4 bg-slate-500 text-white text-[10px] font-black px-2 py-1 rounded">定員10名</div>
                  <div className="h-32 text-center border-b border-slate-200 mb-4 flex flex-col justify-end pb-4 pt-4">
                    <h3 className="text-2xl font-black font-en text-blue-600 mb-1">LITE</h3>
                    <p className="text-xs font-bold text-slate-600 mb-1">スタンダード</p>
                    <p className="text-[10px] text-slate-500 leading-tight">仲間と楽しく<br/>継続したい</p>
                  </div>
                  <div className="space-y-2 flex-1 text-center">
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <div className="w-5 h-5 rounded-full border-2 border-blue-500 mb-1"></div>
                      <span className="text-[10px] font-bold text-slate-600">参加</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <div className="w-5 h-5 rounded-full border-2 border-blue-500 mb-1"></div>
                      <span className="text-[10px] font-bold text-slate-600">3ヶ月分</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <div className="w-5 h-5 rounded-full border-2 border-blue-500 mb-1"></div>
                      <span className="text-[10px] font-bold text-slate-600">全6回</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <div className="w-5 h-5 rounded-full border-2 border-blue-500 mb-1"></div>
                      <span className="text-[10px] font-bold text-slate-600">無料</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-24 flex flex-col items-center justify-center">
                      <div className="flex items-end justify-center gap-1 text-slate-800">
                        <span className="text-4xl font-black font-en">¥2,200</span>
                        <span className="text-slate-500 text-xs font-bold mb-1">/月</span>
                      </div>
                    </div>
                    <div className="h-16 flex items-end justify-center">
                      <Button onClick={() => window.open(APPLY_URL, '_blank')} variant="secondary" className="w-full py-3 text-sm">LITEに申し込む</Button>
                    </div>
                  </div>
                </div>

                {/* PREMIUM */}
                <div className="col-span-1 bg-slate-800 text-white rounded-2xl p-6 border-2 border-yellow-500 flex flex-col relative shadow-2xl transform lg:scale-[1.02] z-10">
                  <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 text-[10px] font-black px-2 py-1 rounded">定員5名</div>
                  <div className="h-32 text-center border-b border-slate-600 mb-4 flex flex-col justify-end pb-4 pt-4">
                    <h3 className="text-2xl font-black font-en text-yellow-400 mb-1 drop-shadow">PREMIUM</h3>
                    <p className="text-xs font-bold text-slate-300 mb-1">徹底サポート</p>
                    <p className="text-[10px] text-slate-400 leading-tight">確実に結果を出す<br/>限界を超えたい</p>
                  </div>
                  <div className="space-y-2 text-center flex-1">
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400 mb-1" />
                      <span className="text-[10px] font-bold text-slate-300">全員参加</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400 mb-1" />
                      <span className="text-[10px] font-bold text-slate-300">個別チューニング</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400 mb-1" />
                      <span className="text-[10px] font-bold text-slate-300">あり</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400 mb-1" />
                      <span className="text-[10px] font-bold text-slate-300">全6回</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400 mb-1" />
                      <span className="text-[10px] font-bold text-yellow-400">無料</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400 mb-1" />
                      <span className="text-[10px] font-bold text-slate-300">実施</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400 mb-1" />
                      <span className="text-[10px] font-bold text-slate-300">個別作成</span>
                    </div>
                    <div className="h-24 flex flex-col items-center justify-center">
                      <div className="flex items-end justify-center gap-1 text-white">
                        <span className="text-4xl font-black font-en text-yellow-400 drop-shadow">¥9,900</span>
                        <span className="text-slate-400 text-xs font-bold mb-1">/月</span>
                      </div>
                    </div>
                    <div className="h-16 flex items-end justify-center">
                      <Button onClick={() => window.open(APPLY_URL, '_blank')} className="w-full py-3 text-sm bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 hover:from-yellow-400 hover:to-yellow-500 shadow-xl shadow-yellow-500/20">PREMIUMに申し込む</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-slate-400 text-xs mt-10">
            ※各プランとも定員に達し次第、受付を終了いたします。お早めにご検討ください。
          </p>
        </Container>
      </Section>

      {/* --- FAQ Section --- */}
      <Section className="bg-white border-t border-slate-100">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-black mb-12 text-center text-slate-800">よくあるご質問</h3>
            <div className="space-y-4">
              {[
                { q: "フルマラソンに初めて挑戦するのですが、大丈夫ですか？", a: "はい、大歓迎です！初めてだからこそ、無理のない練習ペースや、無意識でラクに走れる機能的な身体の土台を最初から作っておくことが大切です。" },
                { q: "富山県外からの参加も可能ですか？", a: "もちろん可能です。ランニングセミナーに現地参加できない日があっても、セミナーの動画共有やLINEでの個別サポートを通じて、しっかり本番まで伴走します。" },
                { q: "黒部名水マラソン特有の「暑さ」が不安です。", a: "過去に何度も走っている私たちが、暑さにバテないための「事前の水分補給（ウォーターローディング）」や当日のペース設定のコツをしっかりお伝えしますので、安心してください。" },
              ].map((faq, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-base md:text-lg mb-3 flex items-start gap-3 text-slate-800">
                    <span className="text-blue-600 font-black shrink-0">Q.</span> {faq.q}
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base pl-7">
                    <span className="font-bold text-slate-400 mr-2">A.</span>{faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Sticky CTA (Mobile) --- */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
        <Button 
          onClick={() => scrollToSection('プラン')}
          variant="primary" 
          className="w-full py-4 text-lg font-black shadow-2xl"
        >
          一緒に挑戦する <ChevronRight className="ml-2" size={20} />
        </Button>
      </div>
    </div>
  );
}