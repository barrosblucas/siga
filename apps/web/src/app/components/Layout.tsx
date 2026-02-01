import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart3, FileText, Home, Layers } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Iniciativas', href: '/iniciativas', icon: Layers },
    { name: 'Transparência', href: '/transparencia/despesas', icon: BarChart3 },
    { name: 'Relatório DTI', href: '/relatorio-dti', icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col page-shell">
      <header className="bg-white/85 backdrop-blur-md sticky top-0 z-50 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-accent-600 text-white font-semibold flex items-center justify-center shadow-[var(--shadow-soft)]">
                S
              </div>
              <div className="leading-tight">
                <h1 className="text-lg font-semibold text-ink-900" style={{ fontFamily: 'var(--font-display)' }}>SIGA</h1>
                <p className="text-[10px] text-ink-500 uppercase tracking-widest font-semibold">Bandeirantes</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2 rounded-full border border-line bg-white/80 px-2 py-1 shadow-[var(--shadow-soft)]">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={clsx(
                      'inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-accent-50 text-accent-700'
                        : 'text-ink-500 hover:text-ink-900'
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full text-ink-500 hover:text-ink-900 hover:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-accent-200"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pb-4">
              <div className="card-soft p-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold',
                      location.pathname === item.href
                        ? 'bg-accent-50 text-accent-700'
                        : 'text-ink-500 hover:text-ink-900'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-line">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-surface-2 rounded-xl flex items-center justify-center text-ink-500 text-xs font-semibold">
                S
              </div>
              <p className="text-ink-500 text-sm">
                &copy; 2026 Prefeitura Municipal de Bandeirantes. Todos os direitos reservados.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-ink-500">
              <span>Ouvidoria</span>
              <span>Legislação</span>
              <span>Contato</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
