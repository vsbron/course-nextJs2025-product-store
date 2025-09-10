// Tye for the link
type NavLink = {
  href: string;
  label: string;
};

// Array of Nav Links
export const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/favorites", label: "Favorites" },
  { href: "/cart", label: "Cart" },
  { href: "/orders", label: "Orders" },
];
