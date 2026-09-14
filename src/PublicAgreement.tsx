import { ArrowLeft, ArrowUp, FileText, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect } from 'react'

type AgreementSection = {
  id: string
  title: string
  paragraphs: string[]
}

const agreementSections: AgreementSection[] = [
  {
    id: 'subject',
    title: '1. Предмет договору та загальні положення',
    paragraphs: [
      '1.1. Згідно з даним Договором Виконавець організовує та забезпечує надання Замовнику послуг, що полягають у навчанні іноземної мови, а Замовник зобов’язується прийняти та оплатити послуги Виконавця згідно з умовами цієї оферти.',
      '1.2. За результатами тестування на визначення рівня володіння іноземною мовою, яке слухачі Замовника пройдуть до початку занять, буде рекомендовано курс з іноземної мови відповідного рівня згідно із Загальноєвропейськими Рекомендаціями з мовної освіти.',
      '1.3. Навчання проводиться за спеціально створеною комбінованою методикою, розробленою Виконавцем, з використанням додаткових навчальних матеріалів розроблених Виконавцем, або / та, за необхідністю, матеріалів третіх сторін, а також літератури або навчальних посібників третіх сторін або Виконавця.',
      '1.4. Договір вважається укладеним з моменту оплати послуг Замовником по реквізитах Виконавця.',
      '1.5. Послуги з вивчення іноземної мови надаються слухачеві курсу на занятті в групі або індивідуально як у приміщеннях Виконавця, так і онлайн-заняттях з використанням засобів зв’язку Zoom, Skype або іншими подібними засобами. Форма навчання погоджується Сторонами усно або засобами електронного зв’язку.',
      '1.6. Всі умови даного Договору є обов’язковими як для Замовника, так і для Виконавця. Перед початком користування Послугою Замовник зобов’язаний ознайомитися з умовами даного Договору.',
    ],
  },
  {
    id: 'provider-rights',
    title: '2. Права та обов’язки Виконавця',
    paragraphs: [
      '2.1. Виконавець зобов’язується надати послуги з навчання іноземній мові у відповідності з положеннями даного Договору.',
      '2.2. Виконавець інформує Замовника про початок занять та ознайомлює його з розкладом занять.',
      '2.3. Виконавець зобов’язується забезпечити Замовника необхідними методичними матеріалами.',
      '2.4. Виконавець має право змінювати час занять групи Замовника у разі хвороби викладача або за будь-яких інших форс-мажорних обставин, з попереднього попередження Замовника, але не менш ніж за дві години до початку занять. Заняття, скасовані за ініціативи Виконавця, відпрацьовуються додатково на умовах та за згодою Замовника.',
    ],
  },
  {
    id: 'customer-rights',
    title: '3. Права та обов’язки Замовника',
    paragraphs: [
      '3.1. Замовник сплачує за навчання згідно тарифу та дотримуватись термінів оплати за курс.',
      '3.2. Замовник зобов’язується відвідувати заняття відповідно до складеного розкладу і не пропускати їх без поважної причини (хвороба, відрядження).',
      '3.3. Замовник повинен вчасно приходити на заняття і не залишати заняття до їх закінчення без попереднього попередження викладача або адміністрації офісу, тому що це заважатиме навчальному процесу.',
      '3.4. Замовник повинен своєчасно та старанно виконувати домашні завдання, дотримуватись правил дисципліни на заняттях.',
      '3.5. Замовник має право достроково припинити заняття в поточному семестрі через особисті причини з крайніх обставин: хворобу або несподіване довгострокове відрядження, тобто через умови, які не дозволять Замовнику відвідувати заняття довше, ніж три тижні.',
      '3.6. По закінченню рівня, за умови успішного складання фінального тестування, Замовник переводиться на наступний навчальний рівень, а також отримує сертифікат про закінчення відповідного рівня.',
      '3.7. Замовник має право змінювати час занять групи у разі хвороби або за будь-яких інших форс-мажорних обставин, за умови попереднього попередження Виконавця, але не менш ніж за дві години до початку занять. Заняття, скасовані за ініціативи Замовника, відпрацьовуються додатково на умовах та за згодою Виконавця.',
      '3.8. Замовник має право на повернення коштів у разі переплати чи помилкової оплати, надавши Виконавцю письмову заяву.',
    ],
  },
  {
    id: 'performance',
    title: '4. Порядок виконання договору',
    paragraphs: [
      '4.1. Здавання-приймання наданих послуг здійснюється після закінчення курсу іноземної мови та оформляється Актом виконаних робіт (наданих послуг).',
      '4.2. Підписання сторонами Акту про надання послуг являється підтвердженням надання Послуг Виконавцем Замовнику.',
      '4.3. При наданні послуг, не вказаних в Договорі п.1.2 та п.1.3, але додатково замовлених Замовником, Виконавець надає Замовнику додатковий звіт і Сторони підписують додатковий Акт про надання послуг Виконавцем Замовнику.',
    ],
  },
  {
    id: 'payment',
    title: '5. Порядок розрахунку та вартість навчання',
    paragraphs: [
      '5.1. Обсяг Послуг, вартість (Тариф) за одиницю Послуги та розмір плати, що має здійснити Замовник для отримання послуг визначені умовами Тарифних пакетів за посиланням: https://americanaenglish.com/.',
      '5.2. Додаткові платні послуги оплачуються Замовником окремо згідно з розцінками, що встановлені Виконавцем.',
      '5.3. Вартість навчання залишається фіксованою до закінчення курсу іноземної мови.',
    ],
  },
  {
    id: 'liability',
    title: '6. Відповідальність Сторін',
    paragraphs: [
      '6.1. Замовник та Виконавець несуть відповідальність за невиконання або неналежне виконання своїх зобов’язань згідно даного Договору, у відповідності до чинного законодавства України.',
      '6.2. Виконавець не несе відповідальності за незадовільні результати навчання по закінченні курсу, якщо вони були спричинені неналежним виконанням Замовником своїх обов’язків, вказаних у пунктах 3.2. – 3.4.',
    ],
  },
  {
    id: 'force-majeure',
    title: '7. Форс-мажорні обставини',
    paragraphs: [
      '7.1. Сторони звільняються від відповідальності за невиконання чи неналежне виконання обов’язків за цим Договором, якщо таке невиконання чи неналежне виконання сталися внаслідок настання зовнішніх надзвичайних обставин, відсутніх на момент підписання цього Договору, які не можна було передбачити і запобігти їх виникненню. До таких обставин відносяться стихійні лиха, екстремальні погодні умови, пожежі, епідемії, страйки, військові дії, законні чи незаконні дії органів влади.',
      '7.2. До форс-мажорних обставин не відносяться наступні обставини: хвороба або несподіване відрядження Замовника, а також хвороба викладача Виконавця.',
    ],
  },
  {
    id: 'final',
    title: '8. Прикінцеві положення',
    paragraphs: [
      '8.1. Замовник підтверджує, що отримав достатню інформацію про систему навчання та повний спектр послуг передбачених Договором, і приймає їх без будь-яких застережень.',
      '8.2. Виконавець має право вносити зміни й доповнення до Договору шляхом розміщення нової редакції Договору на сторінці https://americanaenglish.com/public-agreement в мережі Інтернет.',
      '8.3. Виконавець має право в односторонньому порядку розірвати цей Договір у випадку невиконання Замовником своїх обов’язків за цим Договором.',
      '8.4. У всьому іншому, що не передбачається цим Договором, Сторони керуються чинним законодавством України.',
      '8.5. Нова редакція Договору набуває чинності для Сторін через 5 (днів) дні з дати її затвердження Виконавцем.',
    ],
  },
]

const contents = agreementSections.map(({ id, title }) => ({ id, title: title.replace(/^\d+\.\s*/, '') }))

export default function PublicAgreement() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Публічний договір | Americana English'
    window.scrollTo(0, 0)
    return () => { document.title = previousTitle }
  }, [])

  return (
    <div id="agreement-top" className="min-h-screen bg-sky/45 text-ink">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur-xl">
        <div className="container-page flex min-h-[76px] items-center justify-between gap-4">
          <a href="/" className="inline-flex items-center" aria-label="Americana — на головну" data-testid="agreement-logo">
            <img src="/assets/americana-logo.png" alt="Americana" className="h-14 w-auto max-w-[210px] object-contain md:h-16" width="249" height="96" />
          </a>
          <div className="flex items-center gap-3">
            <a href="tel:+380663781316" className="hidden items-center gap-2 text-sm font-extrabold sm:inline-flex"><Phone size={17} /> +38 (066) 378 13 16</a>
            <a href="/" className="btn-secondary min-h-11 px-4 text-sm md:px-5" data-testid="agreement-back"><ArrowLeft size={17} /> <span className="hidden sm:inline">На головну</span><span className="sm:hidden">Назад</span></a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-ink py-16 text-white md:py-24">
          <div className="absolute -right-28 -top-32 h-96 w-96 rounded-full bg-blue/70" />
          <div className="absolute -bottom-36 -left-28 h-72 w-72 rounded-full bg-red/80" />
          <div className="container-page relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[.14em]"><FileText size={16} /> Юридична інформація</span>
            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-[-.045em] sm:text-5xl md:text-6xl" data-testid="agreement-title">Публічний договір</h1>
            <p className="mt-5 max-w-3xl text-lg font-semibold leading-relaxed text-white/70">Договір публічної оферти про надання послуг із вивчення іноземної мови</p>
            <p className="mt-7 inline-flex rounded-full bg-red px-4 py-2 text-sm font-extrabold">Редакція від 01.10.2021</p>
          </div>
        </section>

        <div className="container-page grid gap-8 py-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:py-16">
          <aside className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card lg:sticky lg:top-[100px]" aria-label="Зміст договору">
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-blue">Зміст</p>
            <nav className="mt-4 space-y-1">
              {contents.map(({ id, title }, index) => <a key={id} href={`#${id}`} className="flex gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-ink/65 transition hover:bg-sky hover:text-blue"><span className="text-red">{index + 1}.</span>{title}</a>)}
              <a href="#details" className="flex gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-ink/65 transition hover:bg-sky hover:text-blue"><span className="text-red">9.</span>Адреси та реквізити</a>
            </nav>
          </aside>

          <article className="overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-soft" data-testid="agreement-document">
            <div className="border-b border-ink/10 bg-paper p-6 sm:p-8 md:p-10">
              <p className="text-center text-base font-extrabold uppercase leading-relaxed md:text-lg">Публічний договір<br />(договір публічної оферти)<br /><span className="normal-case">про надання послуг із вивчення іноземної мови</span></p>
              <p className="mt-8 leading-8 text-ink/75"><strong className="text-ink">ТОВ «АМЕРИКАНА»</strong>, в особі директора Твердохліба Мар’яна Васильовича (надалі — <strong className="text-ink">«Виконавець»</strong>), що діє на підставі Статуту, з одного боку, та з одного боку, та будь-яка фізична особа, фізична-особа підприємець або самозайнята особа, яка своїми діями виявила намір приєднатися до цього Договору, іменована надалі <strong className="text-ink">«Замовник»</strong>, з іншого боку, що разом іменуються <strong className="text-ink">«Сторони»</strong>, керуючись ст. 633 та ст. 641 Цивільного кодексу України, уклали цей Договір про наступне:</p>
            </div>

            <div className="divide-y divide-ink/10 px-6 sm:px-8 md:px-10">
              {agreementSections.map(section => (
                <section key={section.id} id={section.id} className="scroll-mt-28 py-9 md:py-11">
                  <h2 className="text-xl font-extrabold tracking-[-.025em] text-ink md:text-2xl">{section.title}</h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-7 text-ink/72 md:text-base md:leading-8">
                    {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              ))}

              <section id="details" className="scroll-mt-28 py-9 md:py-11">
                <h2 className="text-xl font-extrabold tracking-[-.025em] md:text-2xl">9. Адреси та реквізити</h2>
                <div className="mt-6 rounded-3xl bg-sky p-6 leading-7 md:p-8 md:leading-8">
                  <p className="text-lg font-extrabold">ТОВ «АМЕРИКАНА»</p>
                  <p className="mt-3">ЄДРПОУ 39374295</p>
                  <p>ПАТ КБ «ПРИВАТБАНК» у м. Чернівці</p>
                  <p>р/р UA283052990000026001001800665</p>
                  <p>МФО 356282</p>
                  <p className="mt-4 flex items-start gap-3"><MapPin className="mt-1 shrink-0 text-blue" size={18} /> Україна, 58002, м. Чернівці,<br className="hidden sm:block" /> вул. Ольги Кобилянської, 30, 4-А</p>
                  <a href="mailto:amerchernivtsi@gmail.com" className="mt-3 flex items-center gap-3 font-bold text-blue hover:underline"><Mail size={18} /> amerchernivtsi@gmail.com</a>
                  <p className="mt-5">Директор<br /><strong>Твердохліб М. В.</strong></p>
                  <p className="mt-3 text-sm font-bold text-ink/50">01.10.2021</p>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>

      <footer className="bg-[#061d43] py-9 text-white">
        <div className="container-page flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="font-extrabold">Americana English</p><p className="mt-1 text-sm text-white/55">© {new Date().getFullYear()} Усі права захищено.</p></div>
          <div className="flex flex-wrap gap-3"><a href="tel:+380663781316" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-5 text-sm font-bold hover:bg-white/15"><Phone size={17} /> Зателефонувати</a><a href="/" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-red px-5 text-sm font-extrabold"><ArrowLeft size={17} /> На головну</a></div>
        </div>
      </footer>

      <a href="#agreement-top" className="fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-blue text-white shadow-lg shadow-blue/25 transition hover:-translate-y-1" aria-label="На початок сторінки" data-testid="agreement-to-top"><ArrowUp size={20} /></a>
    </div>
  )
}
