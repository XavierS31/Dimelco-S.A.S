import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from './PageShell';

type NavItem = { id: string; label: string; children?: { id: string; label: string }[] };

type Props = {
  kind: 'Administración' | 'Colaborador';
  title: string;
  description: string;
  navItems: NavItem[];
  activeItem: string;
  onSelect: (id: string) => void;
  profileName?: string;
  profileDetail?: string;
  onSignOut: () => void;
  children: ReactNode;
};

export default function WorkspaceLayout({ kind, title, description, navItems, activeItem, onSelect, profileName, profileDetail, onSignOut, children }: Props) {
  const activeGroup = navItems.find((item) => item.children?.some((child) => child.id === activeItem))?.id ?? null;
  const [openGroup, setOpenGroup] = useState<string | null>(activeGroup);

  return <PageShell>
    <section className="workspace">
      <div className="container workspace__layout">
        <aside className="workspace-sidebar">
          <Link className="workspace-sidebar__brand" to="/">DIMELCO <span>Portal interno</span></Link>
          <div className="workspace-sidebar__intro"><p>{kind}</p><h1>{title}</h1></div>
          <nav className="workspace-nav" aria-label="Navegación del portal">
            {navItems.map((item) => item.children ? <div className="workspace-nav__group" key={item.id}>
              <button className={activeGroup === item.id ? 'is-active' : ''} type="button" aria-expanded={openGroup === item.id} onClick={() => setOpenGroup((open) => open === item.id ? null : item.id)}>{item.label}<span aria-hidden="true">{openGroup === item.id ? '−' : '+'}</span></button>
              {openGroup === item.id && <div className="workspace-nav__subitems">{item.children.map((child) => <button className={activeItem === child.id ? 'is-active' : ''} key={child.id} type="button" onClick={() => onSelect(child.id)}>{child.label}</button>)}</div>}
            </div> : <button key={item.id} className={activeItem === item.id ? 'is-active' : ''} type="button" onClick={() => onSelect(item.id)}>{item.label}</button>)}
          </nav>
          <div className="workspace-sidebar__account"><strong>{profileName || 'Cuenta DIMELCO'}</strong><span>{profileDetail || kind}</span><button className="text-button" type="button" onClick={onSignOut}>Cerrar sesión</button></div>
        </aside>
        <main className="workspace-main">
          <header className="workspace-main__heading"><p>{kind}</p><h2>{title}</h2><span>{description}</span></header>
          {children}
        </main>
      </div>
    </section>
  </PageShell>;
}
