import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="fade-in-page" style={{ padding: '10px', width: '100%', position: 'relative' }}>
      
      {/* INJEKSI STYLE CSS ANIMASI (Opsional jika sudah ada di global) */}
      <style>{`
        @keyframes fadeInPage {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-page {
          animation: fadeInPage 0.5s ease-out forwards;
        }
      `}</style>

      <div style={{ maxWidth: '650px', marginTop: '30px' }}>
        
        {/* HEADER TAG SYSTEM */}
        <span className="accent-code" style={{ 
          color: 'var(--accent-blue, #58a6ff)', 
          fontWeight: '700', 
          letterSpacing: '4px', 
          fontSize: '0.85rem', 
          display: 'inline-block', 
          marginBottom: '15px' 
        }}>
          [ SYSTEM_BOOT_SUCCESS ]
        </span>
        
        {/* MAIN HEADING ELEGANT */}
        <h1 className="heading-elegant" style={{ 
          fontSize: '3.5rem', 
          lineHeight: '1.1', 
          marginBottom: '25px', 
          color: 'var(--text-main)' 
        }}>
          REIHAN <br /> 
          <span style={{ color: 'var(--accent-gold, #ffcb42)' }}>PRATAMA.</span>
        </h1>

        {/* CONTAINER KACA (GLASSMORPHISM) SAMA SEPERTI PROJECT & EXPERIENCE */}
        <div style={{
          background: 'var(--glass-panel, rgba(13, 17, 23, 0.7))',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border-ui, rgba(88, 166, 255, 0.2))',
          borderRadius: '24px',
          padding: '30px',
          boxShadow: 'var(--shadow-ui, 0 10px 30px rgba(0,0,0,0.15))',
          marginBottom: '40px'
        }}>
          <p style={{ color: 'var(--text-soft)', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>
            Selamat datang di terminal arsip pribadi. Hub rekayasa perangkat lunak yang disinkronisasikan secara eksperimental dengan seni pemodelan objek grafis dimensi tiga. Sistem saat ini berjalan dengan efisiensi maksimal.
          </p>
        </div>

        {/* TOMBOL AKSI MENGIKUTI STYLIZED-BTN PROJECT */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/project" style={{ textDecoration: 'none' }}>
            <button 
              className="stylized-btn accent-code"
              style={{
                padding: '14px 28px',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, var(--accent-blue, #58a6ff), #2a5a9e)',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(88, 166, 255, 0.2)',
                letterSpacing: '1px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 6px 20px rgba(88, 166, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 15px rgba(88, 166, 255, 0.2)';
              }}
            >
              OPEN WORK ARCHIVE ➔
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Home;