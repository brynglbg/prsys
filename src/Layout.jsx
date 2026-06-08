import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import * as BsIcons from 'react-icons/bs'

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [sbIsOpen, setSbIsOpen] = useState(false)

  // Page/sub title controller
  const routes = [
    { match: (path) => path === '/dashboard', pageTitle: 'Dashboard', subTitle: '' },
    { match: (path) => path === '/employees', pageTitle: 'Employees', subTitle: 'Employee List' },
    { match: (path) => path === '/employees/add', pageTitle: 'Employees', subTitle: 'Add Employee' },
    { match: (path) => path.startsWith('/employees/edit'), pageTitle: 'Employees', subTitle: 'Edit Employee' },
    { match: (path) => path === '/users', pageTitle: 'Users', subTitle: 'User List' },
    { match: (path) => path === '/users/add', pageTitle: 'Users', subTitle: 'Add User' },
    { match: (path) => path.startsWith('/users/edit'), pageTitle: 'Users', subTitle: 'Edit User' },
  ];
  const current = routes.find(r => r.match(location.pathname)) || { pageTitle: '', subTitle: '' };
  const { pageTitle: currentPageTitle, subTitle: currentSubTitle } = current;

  // Responsive sidebar controller
  useEffect(() => {
    function handleResize() {
      setSbIsOpen(window.innerWidth >= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <div className="flex w-[100vw] h-[100vh] overflow-hidden">
        <div className="drawer md:drawer-open">
          <input
            id="sidebar-toggle"
            className="drawer-toggle"
            type="checkbox"
            onChange={(e) => setSbIsOpen(e.target.checked)}
            checked={sbIsOpen}
          />
          <div className="drawer-content overflow-x-hidden overflow-y-auto">
            <div className="bg-base-100/90 text-base-content sticky top-0 left-0 z-30 flex h-16 w-full justify-center backdrop-blur border-b border-base-300">
              <div id="navbar" className="navbar gap-3 w-full h-16">
                <label htmlFor="sidebar-toggle" className="btn btn-square btn-ghost text-lg" aria-label="open sidebar">
                  <BsIcons.BsList />
                </label>
                <div className="flex items-center w-full h-16 text-lg">
                  <BsIcons.BsLayers className="me-1" />
                  <span className="font-bold">PRSYS</span>
                </div>
                <div className="dropdown dropdown-end">
                  <button className="btn btn-ghost text-lg" tabIndex={0}>
                    <BsIcons.BsBell />
                  </button>
                  <ul className="dropdown-content list w-80 md:w-100 p-2" tabIndex="-1">
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Notifications</li>
                    <li className="list-row">
                      <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
                      <div>
                        <div>Dio Lupa</div>
                        <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
                      </div>
                    </li>
                    <li className="list-row">
                      <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp"/></div>
                      <div>
                        <div>Ellie Beilish</div>
                        <div className="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
                      </div>
                    </li>
                    <li className="list-row">
                      <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div>
                      <div>
                        <div>Sabrino Gardener</div>
                        <div className="text-xs uppercase font-semibold opacity-60">Cappuccino</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full md:max-w-[1200px] p-5">
              <div className="flex gap-5">
                <b className="text-xl">{currentPageTitle}</b>
                <div className="breadcrumbs text-sm ms-auto">
                  <ul>
                    <li><button><BsIcons.BsLayers /></button></li>
                    <li><button>{currentPageTitle}</button></li>
                    {currentSubTitle && <li><button>{currentSubTitle}</button></li>}
                  </ul>
                </div>
              </div>
              <Outlet />
            </div>
          </div>
          <div id="sidebar" className="drawer-side is-drawer-close:overflow-visible">
            {sbIsOpen && ( <div className="fixed inset-0 bg-black/30 md:hidden" onClick={() => setSbIsOpen(false)} /> )}
            <div className="flex flex-col bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 min-h-full">
              <div className="flex-none">
                <div className="flex items-center gap-1 h-16 px-3 border-b border-base-300">
                  <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3">
                    <div className="avatar avatar-placeholder">
                      <div className="w-8 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp" alt="Avatar" />
                      </div>
                    </div>
                    <span className="is-drawer-close:hidden">John Doe</span>
                  </button>
                  <div className="md:hidden ms-auto">
                    <label htmlFor="sidebar-toggle" className="drawer-overlay  btn btn-square btn-ghost text-lg" aria-label="close sidebar">
                      <BsIcons.BsChevronBarLeft />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <ul className="menu gap-1 w-full">
                  <li>
                    <button
                      className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${currentPageTitle === 'Dashboard' ? 'menu-active' : ''}`}
                      data-tip="Dashboard"
                      onClick={() => navigate('/dashboard')}
                    >
                      <BsIcons.BsGrid1X2 />
                      <span className="is-drawer-close:hidden">Dashboard</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${currentPageTitle === 'Employees' ? 'menu-active' : ''}`}
                      data-tip="Employees"
                      onClick={() => navigate('/employees')}
                    >
                      <BsIcons.BsPersonVcard />
                      <span className="is-drawer-close:hidden">Employees</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="flex-none">
                <ul className="menu gap-1 w-full border-t border-base-300">
                  <li>
                    <button
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Logout"
                      onClick={() => document.getElementById('signout-modal').showModal()}
                    >
                      <BsIcons.BsBoxArrowRight />
                      <span className="is-drawer-close:hidden"> Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <dialog id="signout-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Sign Out</h3>
          <p className="py-4">Are you sure you want to sign out?</p>
          <div className="modal-action">
            <button className="btn btn-neutral" onClick={() => navigate('/signout')}>Confirm</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default Layout