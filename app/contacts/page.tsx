import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, Send, MessageCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Контакты ПКП УралМеталлРесурс — оптоволоконные кабели оптом",
  description:
    "Свяжитесь с нами для расчёта стоимости и сроков поставки. Тел: 8-800-201-52-77. Email: info@pruzhina-metizdetal.ru",
};

export default function ContactsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4">
            Контакты
          </h1>
          <p className="text-gray-400 font-body text-lg">
            Свяжитесь с нами для расчёта стоимости и сроков поставки
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-2xl font-semibold text-dark mb-8">
                Наши контакты
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div className="font-body">
                    <p className="font-bold text-dark mb-1">Телефоны</p>
                    <a
                      href="tel:88002015277"
                      className="block text-neutral hover:text-primary transition-colors"
                    >
                      8-800-201-52-77{" "}
                      <span className="text-sm text-gray-400">
                        (бесплатно по России)
                      </span>
                    </a>
                    <a
                      href="tel:+79962304680"
                      className="block text-neutral hover:text-primary transition-colors"
                    >
                      +7 996 230-46-80
                    </a>
                    <a
                      href="tel:+79962374798"
                      className="block text-neutral hover:text-primary transition-colors"
                    >
                      +7 996 237-47-98
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div className="font-body">
                    <p className="font-bold text-dark mb-1">Email</p>
                    <a
                      href="mailto:info@pruzhina-metizdetal.ru"
                      className="text-neutral hover:text-primary transition-colors"
                    >
                      info@pruzhina-metizdetal.ru
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Send size={20} className="text-primary" />
                  </div>
                  <div className="font-body">
                    <p className="font-bold text-dark mb-1">Telegram</p>
                    <a
                      href="https://telegram.me/Elena_umr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral hover:text-primary transition-colors"
                    >
                      @Elena_umr
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <MessageCircle size={20} className="text-primary" />
                  </div>
                  <div className="font-body">
                    <p className="font-bold text-dark mb-1">Max</p>
                    <a
                      href="https://max.ru/u/f9LHodD0cOKahJ4o9NBbc6c0qaPEGCudAVahlv9opUToUZBUXydrmhFFEZ4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral hover:text-primary transition-colors"
                    >
                      Написать в Max
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-primary" />
                  </div>
                  <div className="font-body">
                    <p className="font-bold text-dark mb-1">Режим работы</p>
                    <p className="text-neutral">Пн–Пт 9:00–18:00 (МСК)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-2xl font-semibold text-dark mb-8">
                Оставить заявку
              </h2>
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
