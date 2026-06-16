import React from 'react';

function About() {
  // Data bidang keahlian agar bisa dirender menjadi grid estetik seperti modul Project
  const keahlian = [
    { id: "01", nama: "ILUSTRASI DIGITAL", kategori: "VISUAL_ART_CORE" },
    { id: "02", nama: "EDITING & DESAIN", kategori: "POST_PRODUCTION" },
    { id: "03", nama: "ANIMASI", kategori: "MOTION_GRAPHICS" },
    { id: "04", nama: "FOTOGRAFI", kategori: "CAPTURE_MODULE" },
    { id: "05", nama: "SINEMATOGRAFI", kategori: "PRODUCTION_STREAM" },
  ];

  return (
    <div className="fade-in-page" style={{ padding: '10px', width: '100%', transition: 'color 0.4s ease', position: 'relative' }}>
      
      {/* INJEKSI STYLE CSS (Konsisten dengan modul Project) */}
      <style>{`
        @keyframes fadeInPage {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-page {
          animation: fadeInPage 0.5s ease-out forwards;
        }

        /* Card keahlian interaktif */
        .skill-card {
          background: var(--card-bg, var(--glass-panel, rgba(255, 255, 255, 0.05)));
          border: 1px solid var(--border-ui, rgba(255, 255, 255, 0.1));
          border-radius: 16px;
          padding: 18px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .skill-card:hover {
          border-color: var(--accent-gold, #d4a373);
          box-shadow: 0 0 15px rgba(212, 163, 115, 0.2);
          transform: scale(1.02);
          background: var(--input-hover-bg, rgba(255, 255, 255, 0.08));
        }
      `}</style>

      {/* HEADER */}
      <h1 className="heading-elegant" style={{ fontSize: '2.2rem', marginBottom: '5px', color: 'var(--text-main)' }}>
        IDENTITY CORE.
      </h1>
      <p className="accent-code" style={{ color: 'var(--text-soft)', marginBottom: '30px', fontSize: '0.85rem' }}>
        MODULE // BIOGRAPHICAL_DATA_SPECIFICATION
      </p>

      {/* CONTAINER PROFILE GLASS EFFECT */}
      <div style={{
        background: 'var(--glass-panel, var(--panel-bg, rgba(20, 26, 33, 0.65)))',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border-ui, rgba(107, 144, 188, 0.3))',
        borderRadius: '24px',
        padding: '30px',
        maxWidth: '650px',
        boxShadow: 'var(--shadow-ui, 0 10px 30px rgba(0,0,0,0.05))',
        marginBottom: '40px',
        transition: 'background-color 0.4s ease, border-color 0.4s ease'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <span className="accent-code" style={{ color: 'var(--accent-gold, #d4a373)', fontWeight: '700', fontSize: '0.8rem' }}>
            👤 USER_PROFILE_OVERVIEW :
          </span>
          
          <h2 className="heading-elegant" style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: 0, letterSpacing: '0.5px' }}>
            REIHAN PRATAMA ROVIAN
          </h2>
          
          <span className="accent-code" style={{ fontSize: '0.75rem', color: 'var(--accent-blue, #6b90bc)', display: 'block', marginTop: '-5px' }}>
            STATUS // SISWA_RPL_CORE_ENGINE
          </span>

          <div style={{ 
            fontSize: '0.95rem', 
            color: 'var(--text-main)', 
            lineHeight: '1.6',
            background: 'var(--input-bg, rgba(0, 0, 0, 0.12))',
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid var(--border-ui, rgba(255, 255, 255, 0.05))'
          }}>
            Seorang siswa <span style={{ color: 'var(--accent-gold, #d4a373)', fontWeight: '700' }}>RPL (Rekayasa Perangkat Lunak)</span> yang mendedikasikan fokus pada pengembangan teknologi sekaligus eksplorasi dunia kreatif digital. Memadukan logika pemrograman dengan estetika visual untuk menghasilkan karya multimedia yang presisi.
          </div>
          
        </div>
      </div>

      {/* OUTPUT SUB-HEADER */}
      <h3 className="heading-elegant" style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-main)' }}>
        [ CORE_EXPERTISE_SUBSYSTEMS ]
      </h3>

      {/* GRID DAFTAR KEAHLIAN */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', 
        gap: '15px', 
        maxWidth: '650px' 
      }}>
        {keahlian.map((item) => (
          <div key={item.id} className="skill-card">
            <span className="accent-code" style={{ fontSize: '0.7rem', color: 'var(--text-soft)', display: 'block', marginBottom: '4px' }}>
              SYS_INDEX // {item.id}
            </span>
            <h4 className="heading-elegant" style={{ color: 'var(--text-main)', margin: '0 0 6px 0', fontSize: '1rem', fontWeight: '700' }}>
              {item.nama}
            </h4>
            <span className="accent-code" style={{ fontSize: '0.65rem', color: 'var(--accent-blue, #6b90bc)', fontWeight: '600' }}>
              // {item.kategori}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default About;