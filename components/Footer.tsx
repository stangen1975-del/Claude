import Link from "next/link";
import { Phone, Mail, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400 font-body">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-white font-heading text-lg mb-4">О компании</h3>
          <p className="text-sm leading-relaxed">
            ООО &laquo;ПКП УралМеталлРесурс&raquo; — прямые поставки
            оптоволоконных кабелей из Китая. Официальный партнёр Hunan GL
            Technology.
          </p>
        </div>

        {/* Catalog */}
        <div>
          <h3 className="text-white font-heading text-lg mb-4">Каталог</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/catalog/gyta-gyts"
                className="hover:text-white transition-colors"
              >
                GYTA / GYTS
              </Link>
            </li>
            <li>
              <Link
                href="/catalog/ftth-drop"
                className="hover:text-white transition-colors"
              >
                FTTH Drop
              </Link>
            </li>
            <li>
              <Link
                href="/catalog/gyta53"
                className="hover:text-white transition-colors"
              >
                GYTA53
              </Link>
            </li>
            <li>
              <Link
                href="/catalog/adss"
                className="hover:text-white transition-colors"
              >
                ADSS
              </Link>
            </li>
            <li>
              <Link
                href="/catalog/figure8"
                className="hover:text-white transition-colors"
              >
                GYXTC8Y «Восьмёрка»
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="text-white font-heading text-lg mb-4">Контакты</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-primary shrink-0" />
              <div>
                <a href="tel:88002015277" className="hover:text-white transition-colors block">
                  8-800-201-52-77
                </a>
                <a href="tel:+79962304680" className="hover:text-white transition-colors block">
                  +7 996 230-46-80
                </a>
                <a href="tel:+79962374798" className="hover:text-white transition-colors block">
                  +7 996 237-47-98
                </a>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-primary shrink-0" />
              <a
                href="mailto:info@pruzhina-metizdetal.ru"
                className="hover:text-white transition-colors"
              >
                info@pruzhina-metizdetal.ru
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Send size={14} className="text-primary shrink-0" />
              <a
                href="https://telegram.me/Elena_umr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Telegram: @Elena_umr
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-gray-500">
          &copy; 2025 ООО &laquo;ПКП УралМеталлРесурс&raquo;. Все права
          защищены.
        </div>
      </div>
    </footer>
  );
}
