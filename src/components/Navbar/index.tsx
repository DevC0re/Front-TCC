import { useState } from "react";
import logo from "../../assets/Logo.png";
import { ComingSoon } from "../ComingSoon";
import s from "./Navbar.module.scss";
import {
  Heart,
  Home,
  LogOut,
  UserRound,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  }

  return (
    <>
    <ComingSoon isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    <aside className={s.navbar}>
      <div className={s.logo}>
        <img src={logo} alt="Logo do MedUp" className={s.logoIcon} />
        <span>MedUp</span>
      </div>

      <nav className={s.navigation}>
        <NavLink
          to="/home"
          aria-label="Home"
          className={({ isActive }) =>
            `${s.navItem} ${isActive ? s.active : ""}`
          }
        >
          <Home />
          <span>Home</span>
        </NavLink>

        <button type="button" className={s.navItem} aria-label="Perfil"
          onClick={() => setIsModalOpen(true)}>
          <UserRound />
          <span>Perfil</span>
        </button>

        <button type="button" className={s.navItem} aria-label="Favoritos"
          onClick={() => setIsModalOpen(true)}>
          <Heart />
          <span>Favoritos</span>
        </button>
      </nav>

      <button
        type="button"
        className={s.logout}
        aria-label="Sair"
        onClick={handleLogout}
      >
        <LogOut />
        <span>Sair</span>
      </button>
    </aside>
    </>
  );
}