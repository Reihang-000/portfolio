import { useLocation, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Project from "./pages/project";
import Experience from "./pages/experience";
import Contact from "./pages/contact";

function App() {
  const location = useLocation();
// 1. FUNGSI SPLASH ART DINAMIS (GAMBAR LOKAL)
  const getSplashArt = (path) => {
    switch (path) {
      case "/":
        return "/batiktrns.png"; 
      case "/about":
        return "/bgart333.png"; 
      case "/experience":
        return "/1page.png"; 
      case "/project":
        return "/cerita1.png"; // Sesuaikan dengan nama gambar lokalmu yang lain
      case "/contact":
        return "/cover - Copy.png"; // Sesuaikan dengan nama gambar lokalmu yang lain
      default:
        return "/image_bbc15c.jpg";
    }
  };

  const currentSplashArt = getSplashArt(location.pathname);

  return (
    <div className="game-interface">
      
      {/* SIDE NAVBAR */}
      <div className="side-navbar">
        <div className="game-logo">
          RENN<span>_PORT</span>
          <div className="accent-code" style={{ fontSize: '0.6rem', color: 'var(--text-soft)', marginTop: '4px' }}>
            SYSTEM_VERSION_2.0.6
          </div>
        </div>

        <div className="menu-groups">
          <Link to="/" className={`hover-slide-right menu-btn ${location.pathname === "/" ? "active" : ""}`}>
            [01] OVERVIEW
          </Link>
          <Link to="/about" className={`hover-slide-right menu-btn ${location.pathname === "/about" ? "active" : ""}`}>
            [02] CHARACTER
          </Link>
          <Link to="/experience" className={`hover-slide-right menu-btn ${location.pathname === "/experience" ? "active" : ""}`}>
            [03] CHRONO_LOG
          </Link>
          <Link to="/project" className={`hover-slide-right menu-btn ${location.pathname === "/project" ? "active" : ""}`}>
            [04] DATA_BANK
          </Link>
          <Link to="/contact" className={`hover-slide-right menu-btn ${location.pathname === "/contact" ? "active" : ""}`}>
            [05] TRANSMIT
          </Link>
        </div>

        {/* INFO UID (Tombol pengganti tema telah dihapus) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="accent-code" style={{ fontSize: '0.7rem', color: 'var(--text-soft)', textAlign: 'center', borderTop: '1px solid var(--border-ui)', paddingTop: '10px' }}>
            UID: <span style={{ color: 'var(--accent-gold)' }}>2026_RPL</span>
          </div>
        </div>
      </div>

      {/* AREA TENGAH (ROUTING) */}
      <div className="content-viewport">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      {/* ILUSTRASI SPLASH ART KANAN (Dinamic & Animated) */}
      <div className="right-splash-container">
        {/* Atribut 'key' ditambahkan agar React memutar ulang animasi tiap gambar berubah */}
        <img key={currentSplashArt} src={currentSplashArt} alt="Splash Character Art" className="splash-art fade-in-art" />
      </div>

    </div>
  );
}

export default App;
