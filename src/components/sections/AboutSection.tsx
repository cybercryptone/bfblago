import { Shield, Heart, Users, Award, Eye, Handshake } from 'lucide-react';

const mission = [
  {
    icon: Heart,
    title: 'Наша миссия',
    description: 'Мы помогаем нуждающимся по всей России получить доступ к необходимому медицинскому лечению, когда семья не может справиться самостоятельно.',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    icon: Eye,
    title: 'Прозрачность',
    description: 'Мы публикуем отчёты о каждом пожертвовании и использовании средств. Вы всегда знаете, куда идут ваши деньги.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Shield,
    title: 'Безопасность',
    description: 'Все сборы проходят строгую проверку. Мы сотрудничаем только с лицензированными медицинскими учреждениями.',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
];

const values = [
  { icon: Users, title: 'Команда профессионалов', desc: 'Опытные специалисты в сфере помощи людям' },
  { icon: Award, title: 'Государственная регистрация', desc: 'Официально зарегистрованный фонд' },
  { icon: Handshake, title: 'Партнёрства', desc: 'Ведущие клиники России и мира' },
  { icon: Shield, title: '100% гарантия', desc: 'Средства идут строго по назначению' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#22c55e]/10 text-[#16a34a] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            О нас
          </div>
          <h2 className="text-4xl font-bold text-[#0c2461] mb-4">
            Почему нам доверяют
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Мы только начинаем наш путь, но уже помогаем людям по всей стране получить доступ к необходимому лечению.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {mission.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-5`}>
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold text-[#0c2461] mb-3">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Values Grid */}
        <div className="bg-[#0c2461] rounded-3xl p-10">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Наши преимущества</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-[#22c55e]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <v.icon className="w-6 h-6 text-[#22c55e]" />
                </div>
                <p className="text-white font-semibold text-sm mb-1">{v.title}</p>
                <p className="text-slate-300 text-xs">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
