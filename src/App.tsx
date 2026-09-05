import { FormEvent, useEffect, useId, useState } from 'react'
import {
  ArrowRight, BookOpen, Check, ChevronDown, Clock3,
  Facebook, GraduationCap, Instagram, Languages, MapPin, Menu, MessageCircle,
  Phone, Play, Send, Sparkles, Star, Target, Users, X, Zap,
} from 'lucide-react'

const nav = [
  ['Формати', '#formats'], ['Розклад', '#schedule'], ['Ціни', '#prices'], ['Як навчаємо', '#method'], ['Про нас', '#about'], ['FAQ', '#faq'],
]

const programs = [
  {
    icon: Users, accent: 'bg-blue text-white', tag: 'Найпопулярніше', title: 'Групові заняття',
    text: 'Жива практика, підтримка та свій темп у невеликій групі відповідного рівня.',
    features: ['для дорослих і дітей', 'онлайн або у Чернівцях', 'регулярний зворотний зв’язок'],
  },
  {
    icon: Target, accent: 'bg-red text-white', tag: 'Персональний план', title: 'Індивідуально',
    text: 'Уся увага викладача та програма під вашу конкретну мету — від першої фрази до fluent.',
    features: ['гнучкий графік', 'ваш темп і фокус', 'онлайн або офлайн'],
  },
  {
    icon: GraduationCap, accent: 'bg-ink text-white', tag: 'Результат на іспиті', title: 'Підготовка до НМТ',
    text: 'Системно закриваємо прогалини, тренуємо формат тесту та вчимо керувати часом.',
    features: ['старт із діагностики', 'практика типових завдань', 'контроль прогресу'],
  },
]

const faqs = [
  ['Як зрозуміти, який у мене рівень?', 'Почнемо з короткого безкоштовного тестування й визначення рівня. Після нього порадимо формат, групу та план, що відповідають саме вашій меті.'],
  ['Чи можна навчатися онлайн?', 'Так. Можна навчатися онлайн з будь-якого міста або офлайн у центрі Чернівців — на вул. О. Кобилянської, 30.'],
  ['Який формат обрати: групу чи індивідуально?', 'Група дає більше живої взаємодії та мотивації. Індивідуальний формат підійде, якщо потрібен гнучкий графік або дуже конкретна ціль. Допоможемо обрати після тестування.'],
  ['Чи є заняття для дітей?', 'Так, формуємо дитячі й підліткові групи, а також проводимо індивідуальні заняття та підготовку до НМТ.'],
  ['Що буде на тестуванні?', 'Познайомимось, поговоримо про вашу ціль, визначимо поточний рівень і покажемо, як виглядатиме навчальний маршрут. Без тиску та зобов’язань.'],
]

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" className={`inline-flex items-center ${inverse ? 'rounded-2xl bg-white px-3 py-2' : ''}`} aria-label="Americana — на головну" data-testid="logo-link">
      <img src="/assets/americana-logo.png" alt="Americana" className="h-14 w-auto max-w-[220px] object-contain md:h-16" width="249" height="96" />
    </a>
  )
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15.1 3c.5 2.8 2.1 4.5 4.9 4.7v3.1c-1.9.1-3.6-.5-4.9-1.5v6.1a6.4 6.4 0 1 1-5.5-6.3v3.2a3.2 3.2 0 1 0 2.3 3.1V3h3.2Z" fill="currentColor" /></svg>
}

function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/5 bg-paper/90 backdrop-blur-xl">
      <div className="container-page flex h-[76px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Головна навігація">
          {nav.map(([label, href]) => <a key={href} href={href} className="text-sm font-bold text-ink/70 transition hover:text-blue">{label}</a>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+380663781316" className="inline-flex items-center gap-2 text-sm font-extrabold text-ink" data-testid="header-phone"><Phone size={17} /> +38 (066) 378 13 16</a>
          <a href="#contact" className="btn-primary min-h-11 px-5 text-sm" data-testid="header-cta">Записатись на тестування</a>
        </div>
        <button className="grid h-12 w-12 place-items-center rounded-full bg-sky xl:hidden" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? 'Закрити меню' : 'Відкрити меню'} data-testid="mobile-menu-button">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-ink/10 bg-white px-5 py-6 xl:hidden" data-testid="mobile-menu">
          <nav className="mx-auto flex max-w-[1240px] flex-col gap-1" aria-label="Мобільна навігація">
            {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-lg font-extrabold hover:bg-sky">{label}</a>)}
            <a href="tel:+380663781316" className="mt-3 flex min-h-12 items-center gap-3 px-4 font-bold"><Phone size={19} /> +38 (066) 378 13 16</a>
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-3">Записатись на тестування</a>
          </nav>
        </div>
      )}
    </header>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto h-[470px] w-full max-w-[520px] lg:h-[570px]" aria-label="Візуалізація процесу навчання">
      <div className="absolute inset-x-6 bottom-5 top-10 rotate-2 overflow-hidden rounded-[2.75rem] bg-ink shadow-soft sm:inset-x-10">
        <div className="absolute -right-16 -top-10 h-64 w-64 rounded-full bg-blue blur-[1px]" />
        <div className="absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-red" />
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(white 1.3px, transparent 1.3px)', backgroundSize: '21px 21px' }} />
        <div className="relative flex h-full flex-col justify-between p-8 text-white sm:p-10">
          <div className="flex items-center justify-between"><span className="text-sm font-bold text-white/65">YOUR ENGLISH PATH</span><Sparkles className="text-red" /></div>
          <div>
            <p className="text-sm font-bold text-white/60">Сьогодні говоримо про</p>
            <p className="mt-2 text-4xl font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl">Dreams,<br />plans & real life.</p>
          </div>
          <div className="flex items-end justify-between"><span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">Lesson 08</span><span className="text-6xl font-black text-white/10">Aa</span></div>
        </div>
      </div>
      <div className="float-card absolute left-0 top-0 rounded-3xl bg-white p-5 shadow-soft sm:left-1" aria-hidden="true">
        <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-red text-white"><Play size={20} fill="currentColor" /></span><div><b className="block text-sm">Speaking practice</b><span className="text-xs font-semibold text-ink/50">12 хв без перекладу</span></div></div>
      </div>
      <div className="float-card-reverse absolute bottom-0 right-0 w-52 rounded-3xl bg-white p-5 shadow-soft" aria-hidden="true">
        <div className="mb-3 flex items-center justify-between"><b className="text-sm">Твій прогрес</b><span className="text-sm font-black text-blue">78%</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-sky"><div className="h-full w-[78%] rounded-full bg-blue" /></div>
        <p className="mt-3 flex items-center gap-2 text-xs font-bold text-ink/55"><Check className="text-red" size={16} /> На крок ближче до цілі</p>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <main id="top" className="relative overflow-hidden bg-paper pt-[76px]">
      <div className="absolute -left-48 top-32 h-96 w-96 rounded-full bg-sky blur-3xl" />
      <div className="container-page relative grid min-h-[760px] items-center gap-8 py-14 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
        <div className="max-w-2xl">
          <div className="eyebrow"><span className="h-2 w-2 rounded-full bg-red" /> Англійська у Чернівцях та онлайн</div>
          <h1 className="display-title">Англійська, з якою ти <span className="relative inline-block text-blue">говориш<svg className="absolute -bottom-2 left-0 w-full text-red" viewBox="0 0 220 14" fill="none" aria-hidden="true"><path d="M3 10C54 2 151 2 217 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/></svg></span> — не перекладаєш.</h1>
          <p className="mt-7 max-w-xl text-lg font-medium leading-relaxed text-ink/65 md:text-xl">Навчаємо живої англійської без страху помилок. Зрозумілий маршрут, сучасні матеріали й викладач, із яким хочеться говорити.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-primary" data-testid="hero-cta">Записатись на тестування <ArrowRight size={19} /></a>
            <a href="#formats" className="btn-secondary" data-testid="hero-formats">Обрати формат</a>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-ink/60">
            <span className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-sky text-blue"><Check size={14} strokeWidth={3} /></span> Тестування — 0 грн</span>
            <span className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-sky text-blue"><Check size={14} strokeWidth={3} /></span> Online & offline</span>
          </div>
        </div>
        <HeroVisual />
      </div>
    </main>
  )
}

function TrustStrip() {
  const items = ['CELTA', 'DELTA', 'TKT', 'CAE', 'Жива англійська', 'Online & Offline']
  return (
    <section className="overflow-hidden border-y border-ink/10 bg-white py-5" aria-label="Кваліфікації та переваги">
      <div className="marquee-track flex items-center">
        {[...items, ...items].map((item, i) => <div key={`${item}-${i}`} className="flex items-center"><span className="px-8 text-sm font-black uppercase tracking-[0.12em] text-ink/65 md:px-12">{item}</span><Star size={16} className="fill-red text-red" /></div>)}
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><span className="eyebrow">Чому Americana</span><h2 className="section-title">Не вчимо “ідеально”.<br />Вчимо <span className="text-red">користуватися</span> мовою.</h2></div>
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-ink/65 lg:justify-self-end md:text-xl">Ми поєднуємо сильну викладацьку базу з простим людським підходом. Урок — це не перевірка на помилки, а безпечне місце, де нові слова стають вашими.</p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            [MessageCircle, 'Говориш із першого уроку', 'Більше практики в реальних ситуаціях — менше абстрактних вправ заради вправ.'],
            [BookOpen, 'Програма під твою ціль', 'Для подорожей, навчання, кар’єри, НМТ або впевненості у щоденному спілкуванні.'],
            [Zap, 'Бачиш власний прогрес', 'Зрозумілі точки контролю та регулярний зворотний зв’язок без оцінок і стресу.'],
          ].map(([Icon, title, text]) => {
            const ItemIcon = Icon as typeof MessageCircle
            return <article key={title as string} className="card p-7 md:p-8"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky text-blue"><ItemIcon /></span><h3 className="mt-7 text-xl font-extrabold tracking-[-0.02em]">{title as string}</h3><p className="mt-3 leading-relaxed text-ink/60">{text as string}</p></article>
          })}
        </div>
      </div>
    </section>
  )
}

function Formats() {
  return (
    <section id="formats" className="bg-sky/60 py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><span className="eyebrow bg-white">Формати навчання</span><h2 className="section-title">Знайди свій спосіб<br />рухатися вперед</h2></div>
          <p className="max-w-md text-base font-medium leading-relaxed text-ink/60">Не знаєте, що підійде? Це нормально — визначимо рівень і порадимо формат після короткої розмови.</p>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {programs.map(({ icon: Icon, accent, tag, title, text, features }) => (
            <article key={title} className="group flex min-h-[480px] flex-col rounded-[2.25rem] border border-ink/10 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:shadow-soft md:p-8">
              <div className="flex items-start justify-between gap-4"><span className={`grid h-14 w-14 place-items-center rounded-2xl ${accent}`}><Icon /></span><span className="rounded-full bg-sky px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-blue">{tag}</span></div>
              <h3 className="mt-8 text-2xl font-extrabold tracking-[-0.035em]">{title}</h3>
              <p className="mt-4 leading-relaxed text-ink/60">{text}</p>
              <ul className="mt-7 space-y-3">
                {features.map(feature => <li key={feature} className="flex items-center gap-3 text-sm font-bold"><span className="grid h-6 w-6 place-items-center rounded-full bg-sky text-blue"><Check size={14} strokeWidth={3} /></span>{feature}</li>)}
              </ul>
              <a href="#contact" className="mt-auto inline-flex items-center gap-2 pt-8 font-extrabold text-blue transition group-hover:gap-4" data-testid={`program-${title.toLowerCase().replaceAll(' ', '-')}`}>Записатись на тестування <ArrowRight size={18} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

type ScheduleItem = { time: string; group: string; mode?: 'Очно' | 'Онлайн'; note?: string }

function ScheduleList({ title, days, items, dark = false }: { title: string; days: string; items: ScheduleItem[]; dark?: boolean }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-current/10 pb-4">
        <h3 className="text-xl font-extrabold tracking-[-.03em]">{title}</h3>
        <span className={`text-sm font-extrabold ${dark ? 'text-white/55' : 'text-blue'}`}>{days}</span>
      </div>
      <div className="divide-y divide-current/10">
        {items.map(({ time, group, mode, note }) => <div key={`${days}-${time}-${group}`} className="grid grid-cols-[88px_1fr_auto] items-center gap-3 py-4"><span className="font-black tabular-nums">{time}</span><div><p className="font-extrabold">{group}</p>{note && <p className={`mt-1 text-xs font-semibold ${dark ? 'text-white/50' : 'text-ink/45'}`}>{note}</p>}</div>{mode && <span className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider ${mode === 'Онлайн' ? 'bg-red text-white' : dark ? 'bg-white/10 text-white' : 'bg-sky text-blue'}`}>{mode}</span>}</div>)}
      </div>
    </div>
  )
}

function Schedule() {
  const childrenWeekA: ScheduleItem[] = [
    { time: '15:00–16:00', group: 'Діти', mode: 'Очно' },
    { time: '16:00–17:00', group: 'Підлітки', mode: 'Очно' },
    { time: '17:00–18:00', group: 'Підлітки', mode: 'Онлайн' },
    { time: '17:30–19:00', group: 'Підлітки C1', mode: 'Онлайн', note: 'Понеділок, середа та п’ятниця' },
  ]
  const childrenWeekB: ScheduleItem[] = [
    { time: '15:00–16:00', group: 'Діти', mode: 'Очно' },
    { time: '16:00–17:00', group: 'Підлітки', mode: 'Очно' },
    { time: '17:00–18:00', group: 'Підлітки', mode: 'Онлайн' },
  ]
  return (
    <section id="schedule" className="py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end"><div><span className="eyebrow">Актуальний розклад</span><h2 className="section-title">Обирай час, який<br /><span className="text-blue">працює для тебе</span></h2></div><p className="text-base font-medium leading-relaxed text-ink/60">Усі години вказані за київським часом. Остаточну групу підбираємо після тестування відповідно до рівня.</p></div>
        <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          <article className="card p-7 md:p-9" data-testid="children-schedule"><div className="mb-8 flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue text-white"><Users /></span><div><span className="text-xs font-extrabold uppercase tracking-[.14em] text-blue">Діти й підлітки</span><h3 className="mt-1 text-2xl font-extrabold">Групові заняття</h3></div></div><div className="grid gap-9 md:grid-cols-2"><ScheduleList title="Перша група днів" days="Пн · Ср" items={childrenWeekA} /><ScheduleList title="Друга група днів" days="Вт · Чт" items={childrenWeekB} /></div></article>
          <article className="rounded-[2rem] bg-ink p-7 text-white shadow-soft md:p-9" data-testid="adult-schedule"><div className="mb-8 flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-red text-white"><Clock3 /></span><div><span className="text-xs font-extrabold uppercase tracking-[.14em] text-white/50">Дорослі</span><h3 className="mt-1 text-2xl font-extrabold">Групові заняття</h3></div></div><div className="space-y-8"><ScheduleList dark title="Три рази на тиждень" days="Пн · Ср · Пт" items={[{ time: '11:00–12:30', group: 'Денна група' }, { time: '17:30–19:00', group: 'Вечірня група' }, { time: '19:30–21:00', group: 'Вечірня група' }]} /><ScheduleList dark title="Два рази на тиждень" days="Вт · Чт" items={[{ time: '18:00–20:00', group: 'Вечірня група' }]} /></div></article>
        </div>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-3xl bg-sky px-6 py-5 sm:flex-row sm:items-center"><p className="font-bold text-ink/65">Не впевнені, яка група підходить за рівнем?</p><a href="#contact" className="inline-flex items-center gap-2 font-extrabold text-blue">Записатись на тестування <ArrowRight size={18} /></a></div>
      </div>
    </section>
  )
}

function Prices() {
  return (
    <section id="prices" className="bg-sky/60 py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center"><span className="eyebrow bg-white">Вартість навчання</span><h2 className="section-title">Зрозумілі ціни.<br /><span className="text-red">Вигідніше за курс.</span></h2><p className="mt-6 text-lg font-medium text-ink/60">Обирайте комфортний спосіб оплати — щомісяця або одразу за повний навчальний період.</p></div>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-[2.25rem] bg-ink p-7 text-white shadow-soft md:p-10" data-testid="adult-prices"><div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue" /><div className="relative"><span className="rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[.14em]">Курс для дорослих</span><div className="mt-8 flex items-end gap-2"><strong className="text-5xl font-black tracking-[-.05em]">3 900</strong><span className="mb-1 font-bold text-white/60">грн / місяць</span></div><p className="mt-3 text-sm font-semibold text-white/55">11 занять · одне заняття — 355 грн</p><div className="mt-8 rounded-3xl bg-white/10 p-6"><p className="text-sm font-bold text-white/60">Повний курс · 44 заняття · близько 4 місяців</p><div className="mt-3 flex flex-wrap items-center gap-3"><span className="text-lg font-bold text-white/40 line-through">15 600 грн</span><strong className="text-3xl font-black text-white">14 000 грн</strong></div><p className="mt-3 text-sm font-extrabold text-[#8fb6ff]">Економія 1 600 грн при оплаті одразу</p></div><div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-4"><Star size={18} className="fill-red text-red" /><p className="text-sm font-bold">Для студентів, які вже навчалися: <span className="text-white">3 700 грн / місяць</span></p></div><a href="#contact" className="btn-primary mt-7 w-full">Записатись на тестування <ArrowRight size={18} /></a></div></article>
          <article className="rounded-[2.25rem] border border-ink/10 bg-white p-7 shadow-card md:p-10" data-testid="children-prices"><span className="rounded-full bg-sky px-4 py-2 text-xs font-extrabold uppercase tracking-[.14em] text-blue">Дитячий курс</span><div className="mt-8 flex items-end gap-2"><strong className="text-5xl font-black tracking-[-.05em] text-ink">2 900</strong><span className="mb-1 font-bold text-ink/50">грн / місяць</span></div><div className="mt-8 rounded-3xl bg-sky p-6"><p className="text-sm font-bold text-ink/55">Семестр · вересень — січень</p><div className="mt-3 flex flex-wrap items-center gap-3"><span className="text-lg font-bold text-ink/35 line-through">11 600 грн</span><strong className="text-3xl font-black text-blue">10 440 грн</strong></div><p className="mt-3 text-sm font-extrabold text-blue">Знижка 10% при оплаті семестру одразу</p></div><div className="mt-5 flex items-start gap-3 rounded-2xl border border-ink/10 px-5 py-4"><Star size={18} className="mt-0.5 shrink-0 fill-red text-red" /><p className="text-sm font-bold text-ink/65">Знижка 5% для УБД. Знижки не сумуються.</p></div><a href="#contact" className="btn-primary mt-7 w-full">Записатись на тестування <ArrowRight size={18} /></a></article>
        </div>
        <div className="mt-5 rounded-[2.25rem] border border-ink/10 bg-white p-7 md:p-10" data-testid="individual-prices"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="text-xs font-extrabold uppercase tracking-[.14em] text-blue">Індивідуально або в парі</span><h3 className="mt-2 text-3xl font-extrabold tracking-[-.04em]">Максимум уваги викладача</h3></div><a href="#contact" className="inline-flex items-center gap-2 font-extrabold text-blue">Записатись на тестування <ArrowRight size={18} /></a></div><div className="mt-8 grid gap-4 md:grid-cols-2"><div className="rounded-3xl bg-sky p-6"><p className="font-extrabold text-blue">Для дітей</p><div className="mt-4 flex flex-wrap gap-x-8 gap-y-3"><p><strong className="text-2xl font-black">550 грн</strong><span className="block text-xs font-semibold text-ink/50">індивідуально / година</span></p><p><strong className="text-2xl font-black">400 грн</strong><span className="block text-xs font-semibold text-ink/50">у парі / з людини</span></p></div></div><div className="rounded-3xl bg-[#fff0f0] p-6"><p className="font-extrabold text-red">Для дорослих</p><div className="mt-4 flex flex-wrap gap-x-8 gap-y-3"><p><strong className="text-2xl font-black">650 грн</strong><span className="block text-xs font-semibold text-ink/50">індивідуально / година</span></p><p><strong className="text-2xl font-black">500 грн</strong><span className="block text-xs font-semibold text-ink/50">у парі / з людини</span></p></div></div></div></div>
      </div>
    </section>
  )
}

function Method() {
  return (
    <section id="method" className="py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center"><span className="eyebrow">Як це працює</span><h2 className="section-title">Система, у якій легко<br />залишатися <span className="text-blue">в русі</span></h2></div>
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <article className="relative overflow-hidden rounded-[2.25rem] bg-ink p-8 text-white lg:col-span-7 lg:min-h-[400px] md:p-10">
            <span className="text-xs font-extrabold uppercase tracking-[.16em] text-white/50">01 · Діагностика</span><h3 className="mt-6 max-w-lg text-3xl font-extrabold leading-tight tracking-[-.04em] md:text-4xl">Починаємо не з підручника, а з тебе.</h3><p className="mt-5 max-w-md leading-relaxed text-white/65">Дізнаємося рівень, ціль, інтереси й комфортний темп. На цій основі складаємо маршрут навчання.</p>
            <div className="mt-10 flex flex-wrap gap-3"><span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">твій рівень</span><span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">твоя ціль</span><span className="rounded-full bg-red px-4 py-2 text-sm font-bold">твій маршрут</span></div>
            <Target className="absolute -bottom-12 -right-10 h-52 w-52 text-white/[.06]" strokeWidth={1} />
          </article>
          <article className="rounded-[2.25rem] bg-red p-8 text-white lg:col-span-5 md:p-10"><span className="text-xs font-extrabold uppercase tracking-[.16em] text-white/60">02 · Практика</span><div className="mt-16 grid h-20 w-20 place-items-center rounded-full bg-white text-red"><MessageCircle size={34} /></div><h3 className="mt-7 text-3xl font-extrabold tracking-[-.04em]">70% уроку — говориш</h3><p className="mt-4 leading-relaxed text-white/75">Лексика й граматика одразу переходять у живу розмову — про те, що справді цікаво.</p></article>
          <article className="rounded-[2.25rem] border border-ink/10 bg-sky p-8 lg:col-span-5 md:p-10"><span className="text-xs font-extrabold uppercase tracking-[.16em] text-blue">03 · Підтримка</span><h3 className="mt-7 text-3xl font-extrabold tracking-[-.04em]">Поруч, коли щось “не клеїться”</h3><p className="mt-4 leading-relaxed text-ink/60">Викладач пояснює зрозуміло, помічає ваші сильні сторони й допомагає пройти складні моменти без напруги.</p><div className="mt-9 flex -space-x-3" aria-label="Команда викладачів"><span className="grid h-12 w-12 place-items-center rounded-full border-4 border-sky bg-blue font-black text-white">A</span><span className="grid h-12 w-12 place-items-center rounded-full border-4 border-sky bg-red font-black text-white">+1</span></div></article>
          <article className="rounded-[2.25rem] border border-ink/10 bg-white p-8 lg:col-span-7 md:p-10"><span className="text-xs font-extrabold uppercase tracking-[.16em] text-blue">04 · Прогрес</span><div className="mt-6 grid items-end gap-6 sm:grid-cols-[1fr_auto]"><div><h3 className="text-3xl font-extrabold tracking-[-.04em]">Маленькі перемоги стають великою впевненістю</h3><p className="mt-4 leading-relaxed text-ink/60">Регулярно звіряємося з ціллю й показуємо, що вже змінилося.</p></div><div className="relative grid h-28 w-28 place-items-center rounded-full" style={{ background: 'conic-gradient(#1C5DCE 0 78%, #EAF2FF 78%)' }}><div className="grid h-[82px] w-[82px] place-items-center rounded-full bg-white text-2xl font-black text-blue">78%</div></div></div></article>
        </div>
      </div>
    </section>
  )
}

function Journey() {
  const steps = [
    ['01', 'Залишаєш заявку', 'Ім’я та номер — цього достатньо.'],
    ['02', 'Проходимо тестування', 'Визначаємо рівень і твою мету.'],
    ['03', 'Підбираємо формат', 'Група, викладач і зручний графік.'],
    ['04', 'Починаєш говорити', 'Без “ще трохи підготуюсь”. Одразу.'],
  ]
  return (
    <section className="bg-ink py-24 text-white md:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><span className="eyebrow bg-white/10 text-white">Твій старт</span><h2 className="text-4xl font-extrabold leading-tight tracking-[-.045em] md:text-5xl">Від заявки до першого “I can!” — чотири кроки</h2><a href="#contact" className="btn-primary mt-8">Записатись на тестування <ArrowRight size={19} /></a></div><div className="space-y-3">{steps.map(([n, title, text]) => <div key={n} className="grid grid-cols-[55px_1fr] gap-4 rounded-3xl border border-white/10 bg-white/[.05] p-5 md:grid-cols-[70px_1fr_auto] md:items-center md:p-6"><span className="text-sm font-black text-red">{n}</span><div><h3 className="text-lg font-extrabold">{title}</h3><p className="mt-1 text-sm text-white/55">{text}</p></div><Check className="hidden text-blue md:block" /></div>)}</div></div>
      </div>
    </section>
  )
}

function Credentials() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative min-h-[430px] overflow-hidden rounded-[2.5rem] bg-sky p-8 md:p-12">
          <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-blue" /><div className="absolute -right-6 top-8 h-24 w-24 rounded-full bg-red" />
          <Languages className="text-blue" size={42} />
          <blockquote className="relative mt-16 max-w-md text-3xl font-extrabold leading-[1.2] tracking-[-.04em] md:text-4xl">“Помилка — це не стоп. Це момент, коли мова стає твоєю.”</blockquote>
          <p className="relative mt-8 font-bold text-ink/55">Підхід команди Americana</p>
        </div>
        <div className="lg:pl-10"><span className="eyebrow">Сильна команда</span><h2 className="section-title">Викладачі, які вміють не лише знати, а й <span className="text-red">пояснювати</span></h2><p className="mt-6 text-lg leading-relaxed text-ink/60">У команді — досвідчені викладачі з міжнародними сертифікаціями Cambridge. А головне — люди, з якими не страшно помилятися, питати й нарешті заговорити.</p><div className="mt-8 flex flex-wrap gap-2">{['CELTA', 'DELTA', 'CELT-P', 'CELT-S', 'TKT', 'CAE'].map(item => <span key={item} className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-extrabold shadow-sm">{item}</span>)}</div><p className="mt-7 rounded-2xl bg-sky px-5 py-4 text-sm font-bold text-ink/65">Фото й персональні профілі команди можна буде легко додати у готовий блок після отримання матеріалів.</p></div>
      </div>
    </section>
  )
}

function FAQ() {
  const [active, setActive] = useState<number | null>(0)
  return (
    <section id="faq" className="bg-sky/60 py-24 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <div><span className="eyebrow bg-white">FAQ</span><h2 className="section-title">Можливо, ти хотів це запитати</h2><p className="mt-6 text-ink/60">Не знайшли відповідь? Зателефонуйте — відповімо без складних скриптів.</p><a href="tel:+380663781316" className="mt-6 inline-flex items-center gap-2 font-extrabold text-blue"><Phone size={18} /> +38 (066) 378 13 16</a></div>
        <div className="space-y-3">{faqs.map(([question, answer], index) => { const isOpen = active === index; return <div key={question} className="overflow-hidden rounded-3xl border border-ink/10 bg-white"><button type="button" className="flex min-h-[76px] w-full items-center justify-between gap-4 px-6 py-5 text-left font-extrabold md:px-7" onClick={() => setActive(isOpen ? null : index)} aria-expanded={isOpen} data-testid={`faq-${index}`}><span>{question}</span><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${isOpen ? 'rotate-180 bg-blue text-white' : 'bg-sky text-blue'}`}><ChevronDown size={18} /></span></button>{isOpen && <div className="px-6 pb-6 pr-16 leading-relaxed text-ink/60 md:px-7 md:pb-7" data-testid={`faq-answer-${index}`}>{answer}</div>}</div> })}</div>
      </div>
    </section>
  )
}

type FormState = {
  studentType: 'adult' | 'child'
  fullName: string
  childName: string
  childAge: string
  contactPerson: string
  phone: string
  goal: string
  format: string
  website: string
}

const emptyForm: FormState = {
  studentType: 'adult', fullName: '', childName: '', childAge: '', contactPerson: '',
  phone: '', goal: '', format: 'Не знаю — порадьте', website: '',
}

function Contact() {
  const formId = useId()
  const [form, setForm] = useState<FormState>(emptyForm)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const update = (key: keyof FormState, value: string) => setForm(old => ({ ...old, [key]: value }))
  const setStudentType = (studentType: FormState['studentType']) => {
    setError('')
    setStatus('')
    setForm(old => ({ ...old, studentType, format: studentType === 'child' ? 'Заняття для дитини' : 'Не знаю — порадьте' }))
  }
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError(''); setStatus('')
    if (form.studentType === 'adult' && form.fullName.trim().length < 3) return setError('Будь ласка, вкажіть ім’я та прізвище.')
    if (form.studentType === 'child' && form.childName.trim().length < 3) return setError('Будь ласка, вкажіть ім’я та прізвище дитини.')
    const age = Number(form.childAge)
    if (form.studentType === 'child' && (!Number.isInteger(age) || age < 1 || age > 17)) return setError('Будь ласка, вкажіть коректний вік дитини.')
    if (form.studentType === 'child' && form.contactPerson.trim().length < 2) return setError('Вкажіть, з ким із батьків або опікунів зв’язатися.')
    if (form.phone.replace(/\D/g, '').length < 10) return setError('Перевірте, будь ласка, номер телефону.')
    setSubmitting(true)
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const payload = await response.json().catch(() => ({ message: '' })) as { message?: string }
      if (!response.ok) throw new Error(payload.message || 'Не вдалося надіслати заявку.')
      setStatus(payload.message || 'Заявку надіслано. Скоро ми зв’яжемося з вами.')
      setForm({ ...emptyForm, studentType: form.studentType, format: form.studentType === 'child' ? 'Заняття для дитини' : 'Не знаю — порадьте' })
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не вдалося надіслати форму. Спробуйте ще раз або зателефонуйте нам.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <section id="contact" className="bg-red py-20 md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div className="text-white"><span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-extrabold uppercase tracking-[.14em]">Безкоштовне тестування</span><h2 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-[-.045em] md:text-6xl">Твоя англійська може початися сьогодні.</h2><p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">Залиш контакт — визначимо рівень і запропонуємо наступний крок. Для дітей підберемо програму відповідно до віку та цілі.</p><div className="mt-8 flex flex-wrap gap-5 text-sm font-bold"><span className="flex items-center gap-2"><Clock3 size={18} /> 15–20 хвилин</span><span className="flex items-center gap-2"><Check size={18} /> 0 грн</span></div></div>
        <form onSubmit={submit} className="rounded-[2.25rem] bg-white p-6 shadow-soft md:p-9" noValidate data-testid="lead-form">
          <fieldset><legend className="mb-3 text-sm font-extrabold">Для кого тестування?</legend><div className="grid grid-cols-2 gap-2 rounded-2xl bg-sky p-1.5"><button type="button" onClick={() => setStudentType('adult')} aria-pressed={form.studentType === 'adult'} className={`min-h-12 rounded-xl px-3 text-sm font-extrabold transition ${form.studentType === 'adult' ? 'bg-white text-blue shadow-sm' : 'text-ink/55 hover:text-ink'}`} data-testid="student-adult">Для дорослого</button><button type="button" onClick={() => setStudentType('child')} aria-pressed={form.studentType === 'child'} className={`min-h-12 rounded-xl px-3 text-sm font-extrabold transition ${form.studentType === 'child' ? 'bg-white text-blue shadow-sm' : 'text-ink/55 hover:text-ink'}`} data-testid="student-child">Для дитини</button></div></fieldset>
          {form.studentType === 'adult' ? <label className="mt-5 block" htmlFor={`${formId}-full-name`}><span className="mb-2 block text-sm font-extrabold">Ім’я та прізвище</span><input id={`${formId}-full-name`} value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder="Наприклад: Анна Коваль" autoComplete="name" className="h-14 w-full rounded-2xl border border-ink/15 bg-paper px-4 outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10" data-testid="lead-name" /></label> : <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_120px]"><label className="block" htmlFor={`${formId}-child-name`}><span className="mb-2 block text-sm font-extrabold">Ім’я та прізвище дитини</span><input id={`${formId}-child-name`} value={form.childName} onChange={e => update('childName', e.target.value)} placeholder="Наприклад: Марко Коваль" autoComplete="off" className="h-14 w-full rounded-2xl border border-ink/15 bg-paper px-4 outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10" data-testid="lead-child-name" /></label><label className="block" htmlFor={`${formId}-child-age`}><span className="mb-2 block text-sm font-extrabold">Вік</span><input id={`${formId}-child-age`} type="number" min="1" max="17" inputMode="numeric" value={form.childAge} onChange={e => update('childAge', e.target.value)} placeholder="10" className="h-14 w-full rounded-2xl border border-ink/15 bg-paper px-4 outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10" data-testid="lead-child-age" /></label></div>}
          {form.studentType === 'child' && <label className="mt-5 block" htmlFor={`${formId}-contact-person`}><span className="mb-2 block text-sm font-extrabold">З ким зв’язатися?</span><input id={`${formId}-contact-person`} value={form.contactPerson} onChange={e => update('contactPerson', e.target.value)} placeholder="Наприклад: мама Олена" autoComplete="name" className="h-14 w-full rounded-2xl border border-ink/15 bg-paper px-4 outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10" data-testid="lead-contact-person" /></label>}
          <label className="mt-5 block" htmlFor={`${formId}-phone`}><span className="mb-2 block text-sm font-extrabold">{form.studentType === 'child' ? 'Контактний номер батьків' : 'Номер телефону'}</span><input id={`${formId}-phone`} type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+38 (___) ___ __ __" autoComplete="tel" className="h-14 w-full rounded-2xl border border-ink/15 bg-paper px-4 outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10" data-testid="lead-phone" /></label>
          <label className="mt-5 block" htmlFor={`${formId}-format`}><span className="mb-2 block text-sm font-extrabold">Який формат цікавить?</span><select id={`${formId}-format`} value={form.format} onChange={e => update('format', e.target.value)} className="h-14 w-full rounded-2xl border border-ink/15 bg-paper px-4 outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10" data-testid="lead-format"><option>Не знаю — порадьте</option><option>Групові заняття</option><option>Індивідуальні заняття</option><option>Підготовка до НМТ</option><option>Заняття для дитини</option></select></label>
          <label className="mt-5 block" htmlFor={`${formId}-goal`}><span className="mb-2 block text-sm font-extrabold">Що хочете змінити у своїй англійській? <span className="font-medium text-ink/40">(необов’язково)</span></span><textarea id={`${formId}-goal`} value={form.goal} onChange={e => update('goal', e.target.value)} placeholder="Наприклад: хочу впевнено говорити у подорожах" rows={3} className="w-full resize-none rounded-2xl border border-ink/15 bg-paper p-4 outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10" data-testid="lead-goal" /></label>
          <label className="absolute -left-[9999px]" aria-hidden="true" htmlFor={`${formId}-website`}>Ваш сайт<input id={`${formId}-website`} tabIndex={-1} autoComplete="off" value={form.website} onChange={e => update('website', e.target.value)} /></label>
          {error && <p role="alert" className="mt-4 rounded-xl bg-red/10 px-4 py-3 text-sm font-bold text-red" data-testid="form-error">{error}</p>}{status && <p role="status" className="mt-4 rounded-xl bg-sky px-4 py-3 text-sm font-bold text-blue" data-testid="form-status">{status}</p>}
          <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-60" data-testid="lead-submit">{submitting ? 'Надсилаємо…' : 'Записатись на тестування'} <Send size={18} /></button><p className="mt-4 text-center text-xs leading-relaxed text-ink/40">Надсилаючи форму, ви погоджуєтесь на обробку даних для зв’язку з вами.</p>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#061d43] py-14 text-white">
        <div className="container-page"><div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4"><div><Logo inverse /><p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">Міжнародний мовний центр у Чернівцях. Англійська для життя, навчання та нових можливостей.</p></div><div><h3 className="text-sm font-extrabold uppercase tracking-wider text-white/40">Навігація</h3><div className="mt-5 flex flex-col gap-3">{nav.map(([label, href]) => <a key={href} href={href} className="text-sm font-bold text-white/75 hover:text-white">{label}</a>)}</div></div><div><h3 className="text-sm font-extrabold uppercase tracking-wider text-white/40">Контакти</h3><div className="mt-5 space-y-4 text-sm font-bold text-white/75"><a href="tel:+380663781316" className="flex items-center gap-3 hover:text-white"><Phone size={18} /> +38 (066) 378 13 16</a><a href="mailto:amerchernivtsi@gmail.com" className="flex items-center gap-3 hover:text-white"><Send size={18} /> amerchernivtsi@gmail.com</a><a href="https://maps.google.com/?q=вул.+Ольги+Кобилянської+30,+Чернівці" target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-white"><MapPin size={18} className="mt-0.5 shrink-0" /> вул. О. Кобилянської, 30<br />Чернівці, Україна</a></div></div><div><h3 className="text-sm font-extrabold uppercase tracking-wider text-white/40">Будьмо на зв’язку</h3><div className="mt-5 flex gap-2"><a href="https://www.instagram.com/americana_cv" target="_blank" rel="noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-red" aria-label="Instagram" data-testid="instagram-link"><Instagram size={20} /></a><a href="https://www.tiktok.com/@americana_cv" target="_blank" rel="noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-red" aria-label="TikTok" data-testid="tiktok-link"><TikTokIcon /></a><a href="https://www.facebook.com/americanaenglish/" target="_blank" rel="noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-red" aria-label="Facebook" data-testid="facebook-link"><Facebook size={20} /></a></div></div></div><div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs font-semibold text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Americana English. Усі права захищено.</p><a href="https://americanaenglish.com/public-agreement" target="_blank" rel="noreferrer" className="hover:text-white">Публічний договір</a></div></div>
    </footer>
  )
}

export default function App() {
  return <><Header /><Hero /><TrustStrip /><Intro /><Formats /><Schedule /><Prices /><Method /><Journey /><Credentials /><FAQ /><Contact /><Footer /><a href="tel:+380663781316" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-blue text-white shadow-lg shadow-blue/30 transition hover:-translate-y-1 md:hidden" aria-label="Зателефонувати" data-testid="floating-call"><Phone size={22} /></a></>
}
