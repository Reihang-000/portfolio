import React, { useState, useRef, useEffect } from 'react';

function Project() {
  // --- STATE UTAMA ---
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [link, setLink] = useState("");
  const [fileGambar, setFileGambar] = useState(null); 

  // --- PERSISTENCE DATA ---
  const [archives, setArchives] = useState(() => {
    try {
      const dataTersimpan = localStorage.getItem("deployedArchives");
      return dataTersimpan ? JSON.parse(dataTersimpan) : [];
    } catch (e) {
      console.error("Gagal membaca dari localStorage", e);
      return [];
    }
  });

  // --- STATE INTERAKTIF CARD ---
  const [cardTerpilih, setCardTerpilih] = useState(null); 

  const fileInputRef = useRef(null);

  // PERBAIKAN 1: Proteksi Try-Catch untuk mengantisipasi QuotaExceededError (Layar Blank)
  useEffect(() => {
    try {
      localStorage.setItem("deployedArchives", JSON.stringify(archives));
    } catch (error) {
      console.error("LocalStorage Error:", error);
      alert(
        "⚠️ MEMORI PENUH: Data berhasil ditambahkan ke layar, namun GAGAL disimpan ke storage browser karena ukuran gambar terlalu besar (Base64 melebihi limit browser). Silakan gunakan file gambar berukuran di bawah 1MB jika ingin data tersimpan permanen saat di-refresh."
      );
    }
  }, [archives]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileGambar(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setJudul("");
    setDeskripsi("");
    setLink("");
    setFileGambar(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!judul.trim() || !deskripsi.trim()) {
      alert("Harap isi DATA_TITLE dan PROCESS_DESCRIPTION terlebih dahulu!");
      return;
    }

    if (fileGambar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const archiveBaru = {
          id: Math.floor(1000 + Math.random() * 9000), 
          judul: judul,
          deskripsi: deskripsi,
          link: link || "#",
          gambarUrl: reader.result 
        };
        setArchives([archiveBaru, ...archives]); 
        resetForm();
      };
      reader.readAsDataURL(fileGambar);
    } else {
      const archiveBaru = {
        id: Math.floor(1000 + Math.random() * 9000), 
        judul: judul,
        deskripsi: deskripsi,
        link: link || "#",
        gambarUrl: "" 
      };
      setArchives([archiveBaru, ...archives]); 
      resetForm();
    }
  };

  const handleDelete = (idTarget, e) => {
    e.stopPropagation(); 
    const sisaArchive = archives.filter(item => item.id !== idTarget);
    setArchives(sisaArchive);
    if (cardTerpilih === idTarget) setCardTerpilih(null);
  };

  const toggleExpandCard = (id) => {
    setCardTerpilih(cardTerpilih === id ? null : id);
  };

  return (
    <div className="fade-in-page" style={{ padding: '20px', width: '100%', transition: 'color 0.4s ease', position: 'relative', boxSizing: 'border-box' }}>
      
      {/* INJEKSI STYLE CSS */}
      <style>{`
        @keyframes fadeInPage {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-page {
          animation: fadeInPage 0.5s ease-out forwards;
        }

        /* Input Form adaptif mengikuti tema UI */
        .interactive-input {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
          background: var(--input-bg, rgba(255, 255, 255, 0.05)) !important;
          color: var(--text-main) !important;
          border: 1px solid var(--border-ui, rgba(255, 255, 255, 0.15)) !important;
        }
        .interactive-input::placeholder {
          color: var(--text-soft);
          opacity: 0.6;
        }
        .interactive-input:hover {
          border-color: var(--accent-blue, #6b90bc) !important;
          background: var(--input-hover-bg, rgba(255, 255, 255, 0.08)) !important;
        }
        .interactive-input:focus {
          border-color: var(--accent-gold, #d4a373) !important;
          box-shadow: 0 0 15px rgba(212, 163, 115, 0.25) !important;
          transform: scale(1.01);
          background: var(--input-focus-bg, rgba(255, 255, 255, 0.12)) !important;
        }

        .card-wrapper {
          position: relative;
        }
        .custom-tooltip {
          position: absolute;
          bottom: 102%;
          left: 50%;
          transform: translateX(-50%) translateY(5px);
          background: var(--inspector-bg, #0f161c);
          border: 1px solid var(--accent-gold, #d4a373);
          color: var(--text-main);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          white-space: nowrap;
          z-index: 10;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease 0.4s, transform 0.3s ease 0.4s;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        .card-wrapper:hover .custom-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* Animasi Slide-In Panel Kanan */
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in-panel {
          animation: slideInFromRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* HEADER */}
      <h1 className="heading-elegant" style={{ fontSize: '2.2rem', marginBottom: '5px', color: 'var(--text-main)' }}>
        ARCHIVE WORKS.
      </h1>
      <p className="accent-code" style={{ color: 'var(--text-soft)', marginBottom: '30px', fontSize: '0.85rem' }}>
        MODULE // VISUAL_UPLOAD_INTERFACE_STYLIZED
      </p>

      {/* CONTAINER FORM ADAPTIF */}
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
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* INPUT JUDUL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="accent-code" style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '0.8rem' }}>
              📁 DATA_TITLE :
            </label>
            <input 
              type="text" 
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Masukkan nama atau judul karya..." 
              className="theme-adaptive-input interactive-input"
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '50px',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          {/* INPUT FILE UPLOAD */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="accent-code" style={{ color: 'var(--accent-gold, #d4a373)', fontWeight: '700', fontSize: '0.8rem' }}>
              💾 LOCAL_FILE_UPLOAD (LAPTOP) :
            </label>
            <div 
              className="theme-adaptive-input interactive-input"
              style={{
                position: 'relative',
                width: '100%',
                padding: '12px 20px',
                borderRadius: '50px',
                borderStyle: 'dashed',
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box'
              }}
            >
              <input 
                type="file" 
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{
                  width: '100%',
                  fontSize: '0.85rem',
                  color: 'var(--text-soft)',
                  cursor: 'pointer',
                  background: 'transparent'
                }}
              />
            </div>
          </div>

          {/* INPUT DESKRIPSI */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="accent-code" style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '0.8rem' }}>
              📝 PROCESS_DESCRIPTION :
            </label>
            <textarea 
              rows="4"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Deskripsikan detail proses pembuatan karya videografi/pemrograman kamu..." 
              className="theme-adaptive-input interactive-input"
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '20px',
                fontSize: '0.95rem',
                outline: 'none',
                resize: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          {/* INPUT LINK EXTERNAL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="accent-code" style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '0.8rem' }}>
              🔗 TAUTAN_EKSTERNAL (IG / TWITTER) :
            </label>
            <input 
              type="url" 
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://instagram.com/username..." 
              className="theme-adaptive-input interactive-input"
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '50px',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button 
            type="submit"
            className="stylized-btn"
            style={{
              padding: '14px 28px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, var(--accent-blue, #6b90bc), #4a73a3)',
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              boxShadow: '0 4px 15px rgba(107, 144, 188, 0.2)',
              letterSpacing: '1px'
            }}
          >
            INITIALIZE ARCHIVE DATA ✦
          </button>

        </form>
      </div>

      {/* OUTPUT DATA PREVIEW */}
      <h3 className="heading-elegant" style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-main)' }}>
        [ DEPLOYED_ARCHIVES ]
      </h3>

      {/* PERBAIKAN 2: Dynamic Layout Grid Width agar tidak mengerdil / hilang pada resolusi laptop kecil */}
      <div className="grid-container" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '25px', 
        maxWidth: cardTerpilih ? 'calc(100% - 460px)' : '100%',
        transition: 'max-width 0.4s ease'
      }}>
        {archives.length === 0 ? (
          <p className="accent-code" style={{ color: 'var(--text-soft)', gridColumn: '1 / -1', fontStyle: 'italic', fontSize: '0.9rem' }}>
            NO_DATA_FOUND // Awaiting input initialization sequence...
          </p>
        ) : (
          archives.map((item) => {
            const isSelected = cardTerpilih === item.id;
            return (
              <div key={item.id} className="card-wrapper">
                <div className="custom-tooltip accent-code">
                  {isSelected ? "✦ CURRENTLY INSPECTING" : "✦ CLICK TO VIEW ON RIGHT PANEL"}
                </div>

                {/* CARD UTAMA ADAPTIF */}
                <div 
                  onClick={() => toggleExpandCard(item.id)}
                  style={{
                    background: 'var(--card-bg, var(--glass-panel, rgba(255, 255, 255, 0.05)))',
                    border: isSelected ? '2px solid var(--accent-gold, #d4a373)' : '1px solid var(--border-ui, rgba(255, 255, 255, 0.1))',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: isSelected ? '0 0 20px rgba(212, 163, 115, 0.25)' : 'var(--shadow-ui, 0 8px 24px rgba(0,0,0,0.02))',
                    cursor: 'pointer',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  }}
                >
                  <div style={{ width: '100%', height: '140px', borderRadius: '14px', overflow: 'hidden', marginBottom: '15px', background: 'var(--input-bg, rgba(0,0,0,0.05))' }}>
                    <img 
                      src={item.gambarUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500"} 
                      alt="Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <h2 className="heading-elegant" style={{ 
                    fontSize: '1.2rem', 
                    color: 'var(--text-main)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%'
                  }}>
                    {item.judul}
                  </h2>

                  <span className="accent-code" style={{ fontSize: '0.7rem', color: 'var(--accent-gold, #d4a373)', display: 'block', margin: '4px 0 12px 0' }}>
                    ID: {item.id} // [ ARCHIVED ]
                  </span>

                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: 'var(--text-soft)', 
                    lineHeight: '1.4', 
                    marginBottom: '15px',
                    display: '-webkit-box',
                    WebkitLineClamp: '2', 
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.deskripsi}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-ui, rgba(0,0,0,0.05))', paddingTop: '12px' }}>
                    <button 
                      type="button"
                      onClick={(e) => handleDelete(item.id, e)}
                      className="stylized-btn" 
                      style={{ padding: '6px 14px', fontSize: '0.75rem', background: 'linear-gradient(135deg, #e63946, #c12735)', borderRadius: '50px', color: '#ffffff', border: 'none', cursor: 'pointer' }}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ================= EXTRA FEATURE: RIGHT SIDE SYSTEM PANEL ADAPTIF ================= */}
      {cardTerpilih && (() => {
        const dataPenuh = archives.find(a => a.id === cardTerpilih);
        if (!dataPenuh) return null;
        return (
          <div className="slide-in-panel" style={{
            position: 'fixed',
            right: '25px',
            top: '25px',
            bottom: '25px',
            width: '400px',
            background: 'var(--inspector-bg, var(--panel-bg, var(--background, #ffffff)))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid var(--accent-gold, #d4a373)',
            borderRadius: '24px',
            padding: '25px',
            boxShadow: 'var(--shadow-ui, -10px 0 40px rgba(0,0,0,0.12))',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            color: 'var(--text-main)',
            overflowY: 'auto',
            boxSizing: 'border-box',
            transition: 'background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease'
          }}>
            {/* PANEL HEADER CONTROL */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-ui, rgba(212, 163, 115, 0.25))', paddingBottom: '12px' }}>
              <div>
                <h4 className="accent-code" style={{ color: 'var(--accent-gold, #d4a373)', margin: 0, fontSize: '0.85rem', letterSpacing: '1px' }}>
                  // DESKTOP_INSPECTION_MODULE
                </h4>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-soft)' }}>SYS_CORE_ID: {dataPenuh.id}</span>
              </div>
              <button 
                onClick={() => setCardTerpilih(null)}
                style={{
                  background: 'rgba(0,0,0,0.05)',
                  border: '1px solid var(--border-ui, rgba(0,0,0,0.15))',
                  color: 'var(--text-main)',
                  borderRadius: '50px',
                  padding: '5px 12px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  transition: 'all 0.2s'
                }}
              >
                CLOSE [X]
              </button>
            </div>

            {/* GAMBAR PREVIEW PENUH */}
            <div style={{ width: '100%', borderRadius: '14px', overflow: 'hidden', background: 'var(--input-bg, rgba(0,0,0,0.05))', border: '1px solid var(--border-ui, rgba(0,0,0,0.08))' }}>
              <img 
                src={dataPenuh.gambarUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500"} 
                alt="Full Preview" 
                style={{ width: '100%', height: 'auto', maxHeight: '240px', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* JUDUL DATA PENUH */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span className="accent-code" style={{ fontSize: '0.75rem', color: 'var(--accent-blue, #6b90bc)' }}>📁 ENTIRE_DATA_TITLE :</span>
              <h2 className="heading-elegant" style={{ fontSize: '1.6rem', color: 'var(--text-main)', margin: 0, wordBreak: 'break-word', lineHeight: '1.2' }}>
                {dataPenuh.judul}
              </h2>
            </div>

            {/* DESKRIPSI LENGKAP */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <span className="accent-code" style={{ fontSize: '0.75rem', color: 'var(--accent-blue, #6b90bc)' }}>📝 PROCESS_SPECIFICATION_OVERVIEW :</span>
              <div style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-main)', 
                lineHeight: '1.5', 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word',
                background: 'var(--input-bg, rgba(0, 0, 0, 0.03))',
                padding: '15px',
                borderRadius: '14px',
                border: '1px solid var(--border-ui, rgba(0,0,0,0.08))',
                overflowY: 'auto',
                maxHeight: '280px'
              }}>
                {dataPenuh.deskripsi}
              </div>
            </div>

            {/* OUTBOUND EXTERNAL LINK ACCESS */}
            {dataPenuh.link && dataPenuh.link !== "#" && (
              <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                <a 
                  href={dataPenuh.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="accent-code"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '12px',
                    background: 'linear-gradient(135deg, var(--accent-blue, #6b90bc), #4a73a3)',
                    color: '#ffffff',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    boxShadow: '0 4px 15px rgba(107, 144, 188, 0.3)',
                    transition: 'opacity 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  🔗 INITIALIZE SYSTEM LINK ACCESS
                </a>
              </div>
            )}
          </div>
        );
      })()}

    </div>
  );
}

export default Project;