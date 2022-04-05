import { NavLink } from 'react-router-dom';
const Navigation = () => {
    return (
        <nav role="navigation">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/account">Profil</NavLink>
            <NavLink to="/logout">Logout</NavLink>
        </nav>
    )
}

export default Navigation