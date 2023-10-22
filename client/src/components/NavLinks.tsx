import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { links } from "../constants";
import { toggleSidebar } from "../features/toggler/togglerSlice";

export default function NavLinks() {
  const dispatch = useDispatch();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, text, path, icon: Icon } = link;
        return (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => dispatch(toggleSidebar())}>
            <span className="icon">
              <Icon />
            </span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
