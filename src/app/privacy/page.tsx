import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-[#0c2461] mb-8">Политика конфиденциальности</h1>
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6 text-slate-600 leading-relaxed">
            <p>БФ Благо уважает конфиденциальность пользователей и обязуется защищать персональные данные.</p>
            <h2 className="text-xl font-bold text-[#0c2461]">Сбор данных</h2>
            <p>Мы собираем только необходимые данные: email для отправки квитанций о пожертвованиях.</p>
            <h2 className="text-xl font-bold text-[#0c2461]">Использование данных</h2>
            <p>Данные используются исключительно для обработки пожертвований и связи с жертвователями.</p>
            <h2 className="text-xl font-bold text-[#0c2461]">Контакты</h2>
            <p>По вопросам конфиденциальности: info@bfblago.ru</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
