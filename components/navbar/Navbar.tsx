import Container from "@/components/global/Container";

import CartButton from "./CartButton";
import ThemeToggle from "./ThemeToggle";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";

function Navbar() {
  // Returned JSX
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4">
        <Logo />
        <NavSearch />
        <div className="flex gap-4 items-center">
          <CartButton />
          <ThemeToggle />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
