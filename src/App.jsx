import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Trophy, 
  Flame, 
  Check,
  Activity,
  Users,
  Video,
  List,
  Flag,
  RefreshCw,
  Menu,
  X,
  Star,
  User
} from 'lucide-react';

/* =========================================
   定数・データ設定（画像やテキストの変更場所）
========================================= */

// 申し込みURL
const APPLY_URL = "https://moshicom.com/140826";

// 全体のメイン画像
const IMAGES = {
  // 本番用に変更する場合は、以下のように public フォルダ内の画像パスに書き換えてください。
  // HEROES: ['/hero-1.jpg', '/hero-2.jpg', '/hero-3.jpg', '/hero-4.jpg', '/hero-5.jpg'],
  
  // プレビュー用の仮画像（5枚）
  HEROES: [
    '/hero-1.jpg',
    '/hero-2.jpg',
    '/hero-3.JPG',
    '/hero-4.JPG',
    '/hero-5.JPG',
  ],

  // コーチ画像
  COACH_HAYATE: '/coach-hayate.jpg',
  COACH_SENPUKU: '/coach-senpuku.jpg',

  // 参加者の声画像
  VOICES: [
    '/voice-1.png',
    '/voice-2.png',
    '/voice-3.png',
  ],
};

// 共通コンポーネント
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-bold rounded-full transition-all duration-300";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1",
    secondary: "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50",
    outline: "bg-transparent text-white border-2 border-white/50 hover:bg-white/10",
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Container = ({ children, className = '' }) => (
  <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const Section = ({ children, id, className = '' }) => (
  <section id={id} className={`py-20 md:py-32 ${className}`}>
    {children}
  </section>
);

/* =========================================
   メインコンポーネント
========================================= */

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const storyContainerRef = useRef(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [centeredCardIndex, setCenteredCardIndex] = useState(0);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0); // ヒーロー画像のスライド用

  // ヒーロー画像の自動切り替えタイマー
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % IMAGES.HEROES.length);
    }, 5000); // 5秒ごとに切り替え
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleScroll = () => {
    if (storyContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = storyContainerRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setStoryProgress(progress);

      const cards = storyContainerRef.current.querySelectorAll('.story-card');
      const containerCenter = scrollLeft + clientWidth / 2;
      
      let minDistance = Infinity;
      let closestIndex = 0;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
      setCenteredCardIndex(closestIndex);
    }
  };

  useEffect(() => {
    const container = storyContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  /* --- データ設定 --- */
  const featuresData = [
    {
      title: "意識ではなく「機能」から変える",
      subtitle: "01. METHOD",
      desc: "精神論や「腕を振れ」といった抽象的なアドバイスは一切しません。呼吸や可動域など、科学的根拠に基づいた身体の機能改善に集中し、短期間で「無意識でも崩れないフォーム」を作り上げます。",
      image: "/method-1.jpg",
      colorClass: "bg-blue-500 text-blue-500"
    },
    {
      title: "絶対に挫折させない「2人のプロ」",
      subtitle: "02. SUPPORT",
      desc: "ランニング戦略のプロと、コンディショニングのプロ。2人の専属コーチがあなたの状態を徹底管理。怪我の不安やモチベーション低下も、いつでも相談できる環境で即座に解決へ導きます。",
      image: "/method-2.jpg",
      colorClass: "bg-sky-500 text-sky-500"
    },
    {
      title: "逃げ道のない、最高の「仲間の存在」",
      subtitle: "03. COMMUNITY",
      desc: "一人では心が折れそうな厳しい練習も、同じ目標に向かう仲間がいれば乗り越えられます。励まし合い、日々の成長を共有する濃密な時間は、まるで学生時代の合宿のような一生の財産になります。",
      image: "/method-3.JPG",
      colorClass: "bg-cyan-500 text-cyan-500"
    }
  ];

  const storyData = [
    {
      step: "01", title: "目標設定", icon: <Flag size={20}/>,
      desc: "無料ヒアリングで現在地とゴールを明確化。漠然とした不安を、確かな目標に変えます。",
      image: "/story-1.jpg"
    },
    {
      step: "02", title: "練習メニュー＆動画", icon: <List size={20}/>,
      desc: "あなた専用のメニューと動き作り動画が届きます。「何をすればいいか」迷う時間はゼロに。",
      image: "/story-2.jpg"
    },
    {
      step: "03", title: "走る＆EXで改善", icon: <Activity size={20}/>,
      desc: "フォーム改善EXで身体を整えながら実践。怪我を防ぎ、効率的に走力を積み上げます。",
      image: "/story-3.JPG"
    },
    {
      step: "04", title: "2人のコーチと通話", icon: <Video size={20}/>,
      desc: "走力と身体、両面のプロと1on1。自分では気づけない癖や課題を修正する転換点です。",
      image: "/story-4.jpg"
    },
    {
      step: "05", title: "トライ＆エラー", icon: <RefreshCw size={20}/>,
      desc: "正しい指針があるから失敗は怖くない。修正して走る、その繰り返しが強さを作ります。",
      image: "/story-5.jpg"
    },
    {
      step: "06", title: "仲間と交流", icon: <Users size={20}/>,
      desc: "ライブ配信やコミュニティで仲間の頑張りに触れる。それが継続の力となり、心を支えます。",
      image: "/story-6.jpg"
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
      name: "大野 颯",
      role: "ランニングコーチ",
      desc: "元々は怪我に苦しんだ経験を持つランナー。自身の経験から「無理なく速くなる」独自のメソッドを開発。フォーム指導から練習メニュー作成まで、あなたの「走る」を徹底サポートします。",
      image: IMAGES.COACH_HAYATE,
      badges: ["富山マラソン2016優勝", "PB 2:20:45"]
    },
    senpuku: {
      name: "仙福 太郎",
      role: "パーソナルトレーナー",
      desc: "体の不調を見抜くプロフェッショナル。8000回以上のセッション実績に基づき、「走る」だけでなく「走り続けられる体」を作るためのケア、トレーニング、ストレッチを指導します。",
      image: IMAGES.COACH_SENPUKU,
      badges: ["日本スポーツ協会公認アスレティックトレーナー", "コンディショニング"]
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200">
      
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
                  className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all"
                >
                  {item}
                </button>
              ))}
              <Button onClick={() => scrollToSection('プラン')} className="px-6 py-2.5 text-sm">
                一緒に走る
              </Button>
            </nav>

            <button className="lg:hidden text-slate-800 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
        {/* スライドショー背景 */}
        <div className="absolute inset-0 z-0">
          {IMAGES.HEROES.map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={`Hero Background ${index + 1}`} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
              }`} 
            />
          ))}
          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent z-10"></div>
        </div>
        
        <Container className="relative z-20 w-full flex justify-start">
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
            
            {/* インジケーター */}
            <div className="flex items-center gap-3 mt-12">
              {IMAGES.HEROES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentHeroIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* --- Achievement Section --- */}
      <section className="bg-slate-900 text-white border-t border-white/10 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            
            {/* Item 1: PB Achievement Rate */}
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0 first:pt-0">
              <div className="text-xs md:text-sm font-black text-blue-500 tracking-widest mb-2 uppercase tracking-[0.2em]">PB Achievement Rate</div>
              <div className="text-lg md:text-xl font-bold text-white mb-4 tracking-wider">自己ベスト達成率</div>
              <div className="text-7xl md:text-[8rem] font-black font-en text-blue-100 flex items-baseline drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">
                93<span className="text-5xl md:text-7xl ml-1">%</span>
              </div>
              <div className="text-[10px] md:text-xs text-slate-400 mt-4 font-medium">※6ヶ月以上在籍した会員の実績</div>
            </div>

            {/* Item 2: Avg Time Reduction */}
            <div className="flex flex-col items-center justify-center pt-12 md:pt-0">
              <div className="text-xs md:text-sm font-black text-blue-500 tracking-widest mb-2 uppercase tracking-[0.2em]">Avg. Time Reduction</div>
              <div className="text-lg md:text-xl font-bold text-white mb-4 tracking-wider">フルマラソン平均短縮タイム</div>
              <div className="text-7xl md:text-[8rem] font-black font-en text-blue-100 flex items-baseline drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">
                -18<span className="text-5xl md:text-7xl ml-1">min</span>
              </div>
              <div className="text-[10px] md:text-xs text-slate-400 mt-4 font-medium">※RUNCAMPメソッド実践者の平均値</div>
            </div>

          </div>
        </Container>
      </section>

      {/* --- Before / After Section --- */}
      <Section className="bg-slate-100 py-16 border-y border-slate-200">
        <Container>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">この短期間で手に入るもの</h3>
            <p className="text-slate-600 mt-4 font-bold">ダラダラ走る日々は終わり。機能改善にフルコミットするからこそ、圧倒的な変化が起きます。</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm w-full md:w-1/3 border border-slate-200">
              <div className="text-slate-400 font-black text-xl mb-4 flex items-center gap-2">
                <X size={24} className="text-slate-300" /> BEFORE
              </div>
              <ul className="space-y-4 text-slate-600 font-bold">
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-slate-300 shrink-0"></span>後半になると脚が重くて動かない</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-slate-300 shrink-0"></span>「気合」で乗り切ろうとして失速</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-slate-300 shrink-0"></span>一人での練習は妥協してしまう</li>
              </ul>
            </div>
            
            <div className="text-blue-400 rotate-90 md:rotate-0">
              <ChevronRight size={48} />
            </div>

            <div className="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-500/20 w-full md:w-5/12 text-white relative transform md:scale-105">
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-slate-900 font-black px-4 py-2 rounded-full transform rotate-12 shadow-lg">
                2ヶ月後
              </div>
              <div className="text-blue-200 font-black text-xl mb-4 flex items-center gap-2">
                <CheckCircle2 size={24} className="text-yellow-400" /> AFTER
              </div>
              <ul className="space-y-4 font-bold text-lg">
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>無意識でも崩れない機能的なフォーム</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>最後まで脚が残る省エネの走り</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>全力を出し切った圧倒的な達成感</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Features Section --- */}
      <Section id="メソッド" className="bg-slate-50 border-t border-slate-200">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-black mb-4 tracking-widest uppercase text-sm">Commitment</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">最後までやり切るための3つの環境</h3>
            <p className="mt-4 font-bold text-slate-600">一人では超えられない限界も、RUNCAMPなら確実に突破できます。</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuresData.map((feature, i) => (
              <div key={i} className={`bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full ${i === 1 ? 'transform md:-translate-y-4' : ''}`}>
                <div className="h-48 w-full relative overflow-hidden flex-shrink-0">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className={`absolute inset-0 opacity-20 mix-blend-multiply ${feature.colorClass.split(' ')[0]}`}></div>
                  {i === 1 && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 text-xs font-black px-3 py-1 rounded-full shadow-lg">徹底管理</div>
                  )}
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className={`font-black text-sm mb-2 tracking-widest ${feature.colorClass.split(' ')[1]}`}>{feature.subtitle}</div>
                  <h4 className="text-2xl font-black text-slate-800 mb-4 leading-tight" dangerouslySetInnerHTML={{__html: feature.title.replace('、', '、<br/>')}}></h4>
                  <p className="text-slate-600 leading-relaxed text-sm flex-grow font-medium">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
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
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300 ease-out"
                style={{ width: `${Math.max(5, storyProgress * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
              <span>START</span>
              <span className="text-blue-600">GOAL</span>
            </div>
          </div>
        </Container>

        <div className="relative w-full overflow-hidden">
          <div 
            ref={storyContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-16 pt-8 px-[50vw] sm:px-[calc(50vw-200px)] lg:px-[calc(50vw-250px)]"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex gap-6 lg:gap-10 items-stretch">
              {storyData.map((step, index) => {
                const isCenter = centeredCardIndex === index;
                return (
                  <div 
                    key={index}
                    className={`story-card flex-shrink-0 w-[85vw] md:w-[400px] lg:w-[500px] snap-center transition-all duration-500 ease-out transform
                      ${isCenter ? 'scale-100 opacity-100 shadow-2xl z-10' : 'scale-90 opacity-40 shadow-sm z-0 blur-[1px]'}
                    `}
                  >
                    <div className={`bg-white rounded-3xl overflow-hidden border h-full flex flex-col ${isCenter ? 'border-blue-200' : 'border-slate-200'}`}>
                      <div className="h-48 md:h-64 relative overflow-hidden flex-shrink-0">
                        <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-lg
                            ${isCenter ? 'bg-blue-600 text-white' : 'bg-white/20 backdrop-blur-sm text-white'}
                          `}>
                            {step.step}
                          </div>
                          <h3 className="text-2xl font-black">{step.title}</h3>
                        </div>
                      </div>
                      <div className="p-8 flex-grow flex flex-col justify-center bg-white">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors
                          ${isCenter ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}
                        `}>
                          {step.icon}
                        </div>
                        <p className={`text-base md:text-lg leading-relaxed font-medium ${isCenter ? 'text-slate-700' : 'text-slate-500'}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* GOAL Card */}
              <div className={`story-card flex-shrink-0 w-[85vw] md:w-[450px] snap-center bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl shadow-xl overflow-hidden relative group flex items-center ${centeredCardIndex === storyData.length ? 'scale-100 opacity-100' : 'scale-90 opacity-40 blur-[1px]'}`}>
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
              
            </div>
          </div>
        </div>
      </Section>

      {/* --- Voices Section --- */}
      <Section id="参加者の声" className="bg-slate-100 py-24 border-t border-slate-200">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-black mb-4 tracking-widest uppercase text-sm">Review</h2>
            <h3 className="text-3xl md:text-4xl font-black mb-6 text-slate-900">一緒に走った皆さんの声</h3>
            <p className="text-slate-600 font-bold max-w-2xl mx-auto">
              機能改善のアプローチだからこそ、年齢や走力レベルに関係なく、多くの方が劇的な変化を実感しています。
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {IMAGES.VOICES.map((imgSrc, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow flex items-start justify-center">
                <img src={imgSrc} alt={`参加者の声 ${i + 1}`} className="w-full h-auto object-contain" />
              </div>
            ))}
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
      <Section className="bg-slate-900 text-white border-t border-slate-800">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-blue-400 font-black mb-4 tracking-widest uppercase text-sm">Professional Coaches</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white">あなたの伴走者</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {Object.values(coaches).map((coach, index) => (
              <div key={index} className="bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col relative group">
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <img src={coach.image} alt={coach.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-orange-500 font-black text-xs md:text-sm mb-1 tracking-widest uppercase">{coach.role}</p>
                    <h4 className="text-3xl md:text-4xl font-black text-white">{coach.name}</h4>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow bg-white">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {coach.badges.map((badge, i) => (
                      <span key={i} className="text-orange-600 font-bold text-sm flex items-center gap-1">
                        <Trophy size={14} className="text-orange-500" />
                        {badge}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium flex-grow text-sm md:text-base">
                    {coach.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Plan Section --- */}
      <Section id="プラン" className="bg-slate-100 border-t border-slate-200">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-black mb-4 tracking-widest uppercase text-sm">Pricing & Plans</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">参加プラン</h3>
            <p className="text-slate-600 font-bold">2つのプランから、あなたに最適なサポートをお選びください。</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Desktop Comparison Table */}
            <div className="hidden md:block bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mb-10">
              <div className="grid grid-cols-3 divide-x divide-slate-100">
                
                {/* Feature Labels Column */}
                <div className="col-span-1 bg-slate-50 p-6 flex flex-col">
                  <div className="h-32 mb-4 flex items-end pb-4 border-b border-slate-200">
                    <span className="font-bold text-slate-500">サポート内容</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="h-16 flex items-center font-bold text-slate-600 border-b border-slate-200">ランニングセミナー</div>
                    <div className="h-16 flex items-center font-bold text-slate-600 border-b border-slate-200">オンラインコミュニティ</div>
                    <div className="h-16 flex items-center font-bold text-slate-600 border-b border-slate-200">練習メニュー</div>
                    <div className="h-16 flex items-center font-bold text-slate-600 border-b border-slate-200">個別フィードバック</div>
                    <div className="h-16 flex items-center font-bold text-slate-600 border-b border-slate-200">ライブ配信</div>
                    <div className="h-16 flex items-center font-bold text-slate-600 border-b border-slate-200">個別相談会(PB戦略)</div>
                    <div className="h-16 flex items-center font-bold text-slate-600 border-b border-slate-200">個別フォーム改善EX</div>
                    <div className="h-24 flex items-center font-bold text-slate-800">参加料金 (税込)</div>
                    <div className="h-16"></div> {/* Button space */}
                  </div>
                </div>

                {/* LITE(SPOT) Desktop */}
                <div className="col-span-1 bg-white text-slate-800 p-6 flex flex-col relative group hover:bg-slate-50 transition-colors">
                  <div className="absolute top-4 right-4 bg-slate-100 text-slate-500 text-xs font-black px-3 py-1 rounded">各回定員あり</div>
                  <div className="h-32 text-center border-b border-slate-200 mb-4 flex flex-col justify-end pb-4 pt-4">
                    <h3 className="text-2xl font-black font-en text-blue-600 mb-2">SPOT</h3>
                    <p className="text-sm font-bold text-slate-500">セミナー単発参加</p>
                  </div>
                  <div className="space-y-2 flex-1 text-center">
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <CheckCircle2 size={20} className="text-blue-500" />
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-24 flex flex-col items-center justify-center">
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-4xl font-black font-en text-slate-800">¥2,200</span>
                        <span className="text-slate-500 text-sm font-bold mb-1">/1回</span>
                      </div>
                    </div>
                    <div className="h-16 flex items-end justify-center">
                      <Button onClick={() => window.open(APPLY_URL, '_blank')} variant="secondary" className="w-full py-3">申し込む</Button>
                    </div>
                  </div>
                </div>

                {/* PREMIUM */}
                <div className="col-span-1 bg-slate-800 text-white p-6 flex flex-col relative shadow-[0_0_30px_rgba(0,0,0,0.1)] z-10 border-l-2 border-r-2 border-yellow-500 transform scale-[1.02]">
                  <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 text-xs font-black px-3 py-1 rounded">定員5名</div>
                  <div className="h-32 text-center border-b border-slate-600 mb-4 flex flex-col justify-end pb-4 pt-4">
                    <h3 className="text-3xl font-black font-en text-yellow-400 mb-2 drop-shadow">PREMIUM</h3>
                    <p className="text-sm font-bold text-slate-300">徹底サポート</p>
                  </div>
                  <div className="space-y-2 text-center flex-1">
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400" />
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400 mb-1" />
                      <span className="text-xs font-bold text-slate-300">全員参加</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400 mb-1" />
                      <span className="text-xs font-bold text-slate-300">個別チューニング</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400 mb-1" />
                      <span className="text-xs font-bold text-slate-300">あり</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400 mb-1" />
                      <span className="text-xs font-bold text-slate-300">全4回</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400 mb-1" />
                      <span className="text-xs font-bold text-slate-300">実施</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400 mb-1" />
                      <span className="text-xs font-bold text-slate-300">個別作成</span>
                    </div>
                    <div className="h-24 flex flex-col items-center justify-center">
                      <div className="flex items-end justify-center gap-1 text-white">
                        <span className="text-4xl font-black font-en text-yellow-400 drop-shadow">¥9,900</span>
                        <span className="text-slate-400 text-sm font-bold mb-1">/月</span>
                      </div>
                      <span className="text-xs font-bold text-yellow-500/80 mt-1">(2ヶ月総額 ¥19,800)</span>
                    </div>
                    <div className="h-16 flex items-end justify-center">
                      <Button onClick={() => window.open(APPLY_URL, '_blank')} className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 hover:from-yellow-400 hover:to-yellow-500 shadow-xl shadow-yellow-500/20 border-none">申し込む</Button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden space-y-8">
              <div className="grid grid-cols-2 gap-4">
                
                {/* LITE(SPOT) Mobile */}
                <div className="col-span-1 bg-white text-slate-800 rounded-2xl p-6 border border-slate-200 flex flex-col relative shadow-xl">
                  <div className="absolute top-4 right-4 bg-slate-500 text-white text-[10px] font-black px-2 py-1 rounded">各回定員あり</div>
                  <div className="h-32 text-center border-b border-slate-200 mb-4 flex flex-col justify-end pb-4 pt-4">
                    <h3 className="text-2xl font-black font-en text-blue-600 mb-1">SPOT</h3>
                    <p className="text-xs font-bold text-slate-600 mb-1">単発参加</p>
                    <p className="text-[10px] text-slate-500 leading-tight">セミナーだけ<br/>体験したい</p>
                  </div>
                  <div className="space-y-2 flex-1 text-center">
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <CheckCircle2 size={20} className="text-blue-500" />
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-100">
                      <span className="text-lg font-bold text-slate-300">ー</span>
                    </div>
                    <div className="h-24 flex flex-col items-center justify-center">
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-3xl font-black font-en text-slate-800">¥2,200</span>
                        <span className="text-slate-500 text-[10px] font-bold mb-1">/1回</span>
                      </div>
                    </div>
                    <div className="h-16 flex items-end justify-center">
                      <Button onClick={() => window.open(APPLY_URL, '_blank')} variant="secondary" className="w-full py-3 text-sm">SPOTに申込む</Button>
                    </div>
                  </div>
                </div>

                {/* PREMIUM Mobile */}
                <div className="col-span-1 bg-slate-800 text-white rounded-2xl p-6 border-2 border-yellow-500 flex flex-col relative shadow-2xl z-10">
                  <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 text-[10px] font-black px-2 py-1 rounded">定員5名</div>
                  <div className="h-32 text-center border-b border-slate-600 mb-4 flex flex-col justify-end pb-4 pt-4">
                    <h3 className="text-2xl font-black font-en text-yellow-400 mb-1 drop-shadow">PREMIUM</h3>
                    <p className="text-xs font-bold text-slate-300 mb-1">徹底サポート</p>
                    <p className="text-[10px] text-slate-400 leading-tight">確実に結果を出す<br/>限界を超えたい</p>
                  </div>
                  <div className="space-y-2 text-center flex-1">
                    <div className="h-16 flex flex-col items-center justify-center border-b border-slate-700/50">
                      <CheckCircle2 size={20} className="text-yellow-400" />
                    </div>
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
                      <span className="text-[10px] font-bold text-slate-300">全4回</span>
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
                        <span className="text-3xl font-black font-en text-yellow-400 drop-shadow">¥9,900</span>
                        <span className="text-slate-400 text-xs font-bold mb-1">/月</span>
                      </div>
                      <span className="text-[10px] font-bold text-yellow-500/80 mt-1">(総額 ¥19,800)</span>
                    </div>
                    <div className="h-16 flex items-end justify-center">
                      <Button onClick={() => window.open(APPLY_URL, '_blank')} className="w-full py-3 text-sm bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 hover:from-yellow-400 hover:to-yellow-500 shadow-xl shadow-yellow-500/20 border-none">申し込む</Button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
          <p className="text-center text-slate-400 text-xs mt-10">
            ※ プロジェクト期間は2ヶ月弱を予定しています。<br/>
            ※ 定員に達し次第、募集を締め切らせていただきます。
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