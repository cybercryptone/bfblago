import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика безопасности и возвратов благотворительного фонда «БФ Благо»',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f8fafc]">
        {/* Header */}
        <div className="bg-[#0c2461] text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#22c55e] text-sm font-semibold mb-3 uppercase tracking-wider">
              Документы
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold leading-snug">
              Политика конфиденциальности<br />персональных данных
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">

          {/* 1. Безопасность платежей */}
          <section className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-[#0c2461] mb-5 pb-3 border-b border-slate-100">
              Политика безопасности и возвратов: обеспечение конфиденциальности и безопасности
            </h2>
            <div className="text-slate-600 leading-relaxed space-y-4">
              <p>
                При осуществлении пожертвования с помощью банковской карты мы гарантируем
                безопасность вашей личной информации. Процесс обработки платежа, включая
                ввод номера карты, осуществляется на защищённой странице процессинговой
                системы, прошедшей международную сертификацию. Это означает, что ваши
                конфиденциальные данные — реквизиты карты и регистрационные данные — не
                передаются на сайт фонда. Обработка полностью защищена, и ни одна сторона,
                включая БФ Благо, не имеет доступа к вашим личным и банковским данным.
              </p>
              <p>
                Мы применяем стандарт защиты информации согласно требованиям международных
                платёжных систем Visa и MasterCard —{' '}
                <strong className="text-[#0c2461]">
                  Payment Card Industry Data Security Standard (PCI DSS)
                </strong>
                , обеспечивая безопасную обработку данных вашей банковской карты.
              </p>
              <p>
                Технология передачи данных гарантирует безопасность транзакций с
                использованием протоколов{' '}
                <strong className="text-[#0c2461]">
                  Secure Sockets Layer (SSL), Verified by Visa, Secure Code
                </strong>{' '}
                и закрытых банковских сетей с высоким уровнем защиты.
              </p>
            </div>
          </section>

          {/* 2. Возврат средств */}
          <section className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-[#0c2461] mb-5 pb-3 border-b border-slate-100">
              Возврат средств: простота и надёжность
            </h2>
            <p className="text-slate-600 leading-relaxed">
              При запросе возврата денежных средств при отказе от пожертвования мы
              осуществляем возврат исключительно на ту банковскую карту, с которой была
              произведена оплата. Для инициирования возврата напишите нам на{' '}
              <a
                href="mailto:info@bfblago.ru"
                className="text-[#22c55e] hover:text-[#16a34a] font-semibold transition-colors"
              >
                info@bfblago.ru
              </a>{' '}
              с указанием суммы, даты платежа и последних четырёх цифр карты.
            </p>
          </section>

          {/* 3. Возврат пожертвований */}
          <section className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-[#0c2461] mb-6 pb-3 border-b border-slate-100">
              Возврат пожертвований: процедура для физических и юридических лиц
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#22c55e]/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#22c55e] font-bold text-xs">ФЛ</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">Для физических лиц</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Если вы желаете, чтобы ваш благотворительный взнос остался анонимным,
                    уведомите нас о данных вашего платежа. Это необходимо для быстрой
                    коррекции информации и, при необходимости, для оформления налогового
                    вычета в соответствии со статьёй 219 Налогового кодекса Российской Федерации.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#0c2461]/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#0c2461] font-bold text-xs">ЮЛ</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">Для юридических лиц</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Чтобы получить второй экземпляр договора о пожертвовании и заверенные
                    копии документов, сообщите нам информацию о вашем платеже, юридический
                    и фактический адрес вашей организации, а также контактные данные
                    ответственного лица. Мы отправим вам пакет документов в кратчайшие сроки
                    после получения необходимой информации.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Обработка персональных данных */}
          <section className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-[#0c2461] mb-5 pb-3 border-b border-slate-100">
              Обработка персональных данных
            </h2>
            <div className="text-slate-600 leading-relaxed space-y-4">
              <p>
                Настоящая политика разработана в соответствии с требованиями Федерального
                закона от 27.07.2006 № 152-ФЗ «О персональных данных». Оператором
                персональных данных является Благотворительный фонд «Благо».
              </p>
              <p>
                Мы собираем только те данные, которые необходимы для обработки пожертвований:
                адрес электронной почты — для направления квитанции об оплате. Мы не передаём
                ваши данные третьим лицам, за исключением платёжных систем в рамках обработки
                транзакции.
              </p>
              <p>
                Вы вправе в любое время отозвать согласие на обработку персональных данных,
                направив запрос на адрес{' '}
                <a
                  href="mailto:info@bfblago.ru"
                  className="text-[#22c55e] hover:text-[#16a34a] font-semibold transition-colors"
                >
                  info@bfblago.ru
                </a>
                . Хранение данных осуществляется в течение срока, предусмотренного
                законодательством Российской Федерации.
              </p>
            </div>
          </section>

          {/* Contact block */}
          <div className="bg-[#0c2461] rounded-2xl p-8 text-white">
            <h2 className="text-lg font-bold mb-2">Остались вопросы?</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              По всем вопросам, связанным с безопасностью платежей, возвратом пожертвований
              и обработкой персональных данных, обращайтесь к нам.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 text-sm">
              <a
                href="mailto:info@bfblago.ru"
                className="inline-flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
              >
                info@bfblago.ru
              </a>
              <a
                href="tel:+74951234567"
                className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
              >
                +7 (495) 123-45-67
              </a>
            </div>
          </div>

          <p className="text-center text-slate-400 text-xs pb-4">
            Последнее обновление: июнь 2025 г.&nbsp;·&nbsp;
            <a href="/terms" className="hover:text-slate-600 underline transition-colors">
              Пользовательское соглашение
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
