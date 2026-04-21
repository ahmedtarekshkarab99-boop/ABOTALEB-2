import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';
import { t } from '../../lib/i18n';

interface NavItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: t('sidebar.dashboard'), path: '/' },
  { name: t('sidebar.warehouse'), path: '/warehouse' },
  { name: t('sidebar.suppliers'), path: '/suppliers' },
  { name: t('sidebar.customers'), path: '/customers' },
  { name: t('sidebar.workers'), path: '/workers' },
  { name: t('sidebar.production'), path: '/production' },
  { name: t('sidebar.expenses'), path: '/expenses' },
  { name: t('sidebar.sales'), path: '/sales' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen py-8 flex flex-col border-l border-slate-700">
      <div className="px-6 mb-8">
        <h1 className="text-xl font-bold">{t('app.title')}</h1>
        <p className="text-xs text-slate-400 mt-1">{t('app.subtitle')}</p>
      </div>

      <nav className="flex-1 space-y-2 px-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'block px-4 py-3 rounded-lg transition-colors text-right',
              location.pathname === item.path
                ? 'bg-primary-600 text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="px-4 border-t border-slate-700 pt-4">
        <button className="w-full px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-right transition-colors">
          {t('sidebar.settings')}
        </button>
      </div>
    </aside>
  );
}
