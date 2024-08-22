import { Link } from "react-router-dom";

export interface Item {
  title: string;
  link: string;
}
export const MenuItems = ({ item }: { item: Item }) => {
  return (
    <>
      <Link to={item.link} className="nav-link active">
        {item.title}
      </Link>
    </>
  );
};

export default MenuItems;
