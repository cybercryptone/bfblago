import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-[#0c2461] mb-8">Условия использования</h1>
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6 text-slate-600 leading-relaxed">
            <p>Используя сайт БФ Благо, вы соглашаетесь с настоящими условиями использования.</p>
            <h2 className="text-xl font-bold text-[#0c2461]">Пожертвования</h2>
            <p>Все пожертвования являются добровольными и направляются на поддержку указанных сборов. Возврат средств осуществляется по запросу в течение 30 дней.</p>
            <h2 className="text-xl font-bold text-[#0c2461]">Использование сайта</h2>
            <p>Запрещается использование сайта в мошеннических или незаконных целях. Фонд оставляет за собой право блокировать подозрительные транзакции.</p>
            <h2 className="text-xl font-bold text-[#0c2461]">Ограничение ответственности</h2>
            <p>Фонд не несёт ответственности за технические сбои платёжных систем третьих сторон.</p>
            <h2 className="text-xl font-bold text-[#0c2461]">Контакты</h2>
            <p>По вопросам: info@bfblago.ru</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
