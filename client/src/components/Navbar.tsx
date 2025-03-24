import UOLogo from "../assets/uottawa_logo_black.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid" style={{ width: "80%" }}>
        <a href="/">
          <img
            src={UOLogo}
            alt="Uottawa logo"
            style={{ height: "4em", marginRight: "3em" }}
          />
        </a>

        <a className="navbar-brand">CSI2532 - Project</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/#/search"
              >
                Search
              </a>
            </li>
          </ul>
          <div className="nav-item">
            <a
              className="nav-link active"
              aria-current="page"
              href="/#/employees"
            >
              Employees
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
