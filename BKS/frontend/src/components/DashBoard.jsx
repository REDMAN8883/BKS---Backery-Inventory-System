import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import linksByRole from '../components/LinkByRole';

export default function DashBoard(){
    const { user } = useAuth();
    const links = linksByRole[user?.role] || [];

    return (
        <aside>
            {links.map((link) => (
                <Link key={link.path} to={link.path}>
                    {link.label}
                </Link>
            ))}
        </aside>
    );
}