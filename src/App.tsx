import { Link, Outlet, useLocation } from 'react-router-dom';

import logoIcon from './assets/logo.svg';
import homeIcon from './assets/home.svg';
import reportIcon from './assets/report.svg';

const navMap = [
  {
    id: 'home',
    title: 'Home',
    icon: homeIcon,
    path: '/',
  },
  {
    id: 'report',
    title: 'Report',
    icon: reportIcon,
    path: '/report',
  },
];

function App() {
  const { pathname } = useLocation();

  return (
    <div className="flex h-full">
      <nav className="p-24 bg-nav shrink-0">
        <Link to="/" className="px-8 py-24 mb-20 block">
          <img src={logoIcon} alt="Logo Icon" />
        </Link>

        <ul>
          {navMap.map(({ id, path, icon, title }) => {
            return (
              <li key={id} className="text-left flex items-center ">
                <Link
                  to={path}
                  className={`text-white inline-flex py-12 px-16 grow ${
                    pathname === path ? 'bg-orange rounded' : ''
                  }`}
                >
                  <img src={icon} className="mr-12" />

                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <main className="px-52 py-44">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
