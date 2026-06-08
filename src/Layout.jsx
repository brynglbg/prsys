import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import * as BsIcons from 'react-icons/bs'
import { SIDEBAR_MENU, PAGE_TITLES } from './utils/constants'

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [sbIsOpen, setSbIsOpen] = useState(false)
  const current = PAGE_TITLES.find(r => location.pathname.startsWith(r.path.replace(':id', ''))) || { nav1: '', nav2: '' }
  const { nav1: cNav1, nav2: cNav2 } = current

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
          <input id="sidebar-toggle" className="drawer-toggle" type="checkbox" onChange={(e) => setSbIsOpen(e.target.checked)} checked={sbIsOpen} />
          <div className="drawer-content overflow-x-hidden overflow-y-auto">
            <div className="bg-base-100/90 text-base-content sticky top-0 left-0 z-30 flex h-16 w-full justify-center backdrop-blur border-b border-base-300">
              <div id="navbar" className="navbar gap-3 w-full h-16">
                <label htmlFor="sidebar-toggle" className="btn btn-square btn-ghost text-lg">
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
                <b className="text-xl">{cNav1}</b>
                <div className="breadcrumbs text-sm ms-auto">
                  <ul>
                    <li><button><BsIcons.BsLayers /></button></li>
                    <li><button>{cNav1}</button></li>
                    {cNav2 && <li><button>{cNav2}</button></li>}
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
                    <label htmlFor="sidebar-toggle" className="drawer-overlay  btn btn-square btn-ghost text-lg">
                      <BsIcons.BsChevronBarLeft />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <ul className="menu gap-1 w-full">
                  {SIDEBAR_MENU.map((i) => {
                    const Icon = i.icon
                    const n1 = location.pathname.startsWith(i.path)
                    return (
                      <li key={i.path}>
                        <button
                          className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${n1 ? 'menu-active' : ''}`}
                          data-tip={i.name}
                          onClick={() => navigate(i.path)}
                          >
                          <Icon />
                          <span className="is-drawer-close:hidden">{i.name}</span>
                        </button>
                      </li>
                    )
                  })}
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
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>
    </>
  )
}

export default Layout