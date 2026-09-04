import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '../config/links';

type NavId = (typeof NAV_ITEMS)[number]['id'];

function readActiveId(): NavId {
  const offset = 116;
  let current: NavId = NAV_ITEMS[0].id;

  for (const item of NAV_ITEMS) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top - offset <= 1) {
      current = item.id;
    }
  }

  return current;
}

export default function StickyNav() {
  const [activeId, setActiveId] = useState<NavId>(NAV_ITEMS[0].id);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      setActiveId(readActiveId());
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav className="sticky-nav" aria-label="Page sections">
      <div className="sticky-nav-inner">
        {NAV_ITEMS.map((item) => {
          const active = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active ? 'is-active' : undefined}
              aria-current={active ? 'true' : undefined}
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
