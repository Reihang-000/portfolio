import { useState, useEffect } from "react";

function Experience() {
  const [perusahaan, setPerusahaan] = useState("");
  const [posisi, setPosisi] = useState("");
  const [tahun, setTahun] = useState("");
  const [jobdesk, setJobdesk] = useState("");

  // Mengambil data awal dari LocalStorage + Auto Sort
  const [daftarPengalaman, setDaftarPengalaman] = useState(() => {
    const dataTersimpan = localStorage.getItem("myGameExperiences");
    if (dataTersimpan) {
      const dataParsed = JSON.parse(dataTersimpan);
      return dataParsed.sort((a, b) => parseInt(a.tahun) - parseInt(b.tahun));
    }
    return [];
  });

  // State untuk interaktivitas Side Panel Detail di sebelah kanan
  const [logTerpilih, setLogTerpilih] = useState(null);

  // Simpan data otomatis ke LocalStorage setiap ada perubahan data
  useEffect(() => {
    localStorage.setItem("myGameExperiences", JSON.stringify(daftarPengalaman));
  }, [daftarPengalaman]);

  function handleTambah(e) {
    e.preventDefault();
    if (!perusahaan || !posisi || !tahun || !jobdesk) {
      return alert("Harap isi semua kolom log pengalaman!");
    }

    const tahunAngka = parseInt(tahun);
    const tahunSekarang = new Date().getFullYear();

    if (isNaN(tahunAngka) || tahun.length !== 4) {
      return alert("Format tahun salah! Harus berupa 4 digit angka (Contoh: 2024).");
    }

    if (tahunAngka < 1900 || tahunAngka > tahunSekarang) {
      return alert(`Tahun tidak masuk akal! Harap masukkan rentang tahun antara 1900 sampai ${tahunSekarang}.`);
    }

    const pengalamanBaru = {
      id: Date.now(),
      perusahaan,
      posisi,
      tahun: tahunAngka.toString(),
      jobdesk
    };

    const dataDiurutkan = [...daftarPengalaman, pengalamanBaru].sort(
      (a, b) => parseInt(a.tahun) - parseInt(b.tahun)
    );

    setDaftarPengalaman(dataDiurutkan);

    // Reset Form
    setPerusahaan("");
    setPosisi("");
    setTahun("");
    setJobdesk("");
  }

  function handleHapus(id, e) {
    e.stopPropagation(); // Mencegah terpicunya side panel inspector saat klik hapus
    if (confirm("Hapus catatan log perjalanan ini?")) {
      setDaftarPengalaman(daftarPengalaman.filter(item => item.id !== id));
      if (logTerpilih === id) setLogTerpilih(null);
    }
  }

  const toggleInspectLog = (id) => {
    setLogTerpilih(logTerpilih === id ? null : id);
  };

  return (
    <div className="fade-in-page" style={{ padding: '10px', width: '100%', position: 'relative' }}>
      
      {/* INJEKSI STYLE CSS INTERAKTIF (Stylized & Animasi Transisi) */}
      <style>{`
        @keyframes fadeInPage {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-page {
          animation: fadeInPage 0.5s ease-out forwards;
        }

        /* Efek Glow & Scale pada Input Form - Menggunakan variabel adaptif */
        .interactive-input {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
          background: rgba(255, 255, 255, 0.03) !important;
          color: var(--text-main, #333) !important;
        }
        .interactive-input:hover {
          border-color: var(--accent-blue, #6b90bc) !important;
          background: rgba(255, 255, 255, 0.07) !important;
        }
        .interactive-input:focus {
          border-color: var(--accent-gold, #d4a373) !important;
          box-shadow: 0 0 15px rgba(212, 163, 115, 0.4) !important;
          transform: scale(1.01);
          background: rgba(255, 255, 255, 0.1) !important;
        }

        /* Tooltip Khas Game UI Card */
        .card-wrapper {
          position: relative;
        }
        .custom-tooltip {
          position: absolute;
          bottom: 102%;
          left: 50%;
          transform: translateX(-50%) translateY(5px);
          background: rgba(15, 22, 28, 0.95);
          border: 1px solid var(--accent-gold, #d4a373);
          color: #fff;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          white-space: nowrap;
          z-index: 10;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease 0.3s, transform 0.3s ease 0.3s;
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
      <h1 className="heading-elegant" style={{ fontSize: '2.2rem', marginBottom: '5px', color: 'var(--text-main, #333)' }}>
        JOURNEY LOG.
      </h1>
      <p className="accent-code" style={{ color: 'var(--text-soft, #666)', marginBottom: '30px', fontSize: '0.85rem' }}>
        MODULE // EXPERIENCE_SYNCHRONIZATION_INTERFACE
      </p>

      {/* CONTAINER FORM INPUT STYLIZED */}
      <div style={{
        background: 'var(--glass-panel, rgba(20, 26, 33, 0.65))',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(107, 144, 188, 0.3)',
        borderRadius: '24px',
        padding: '30px',
        maxWidth: '650px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        marginBottom: '40px'
      }}>
        <form onSubmit={handleTambah} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* INPUT PERUSAHAAN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="accent-code" style={{ color: 'var(--text-main, #333)', fontWeight: '700', fontSize: '0.8rem' }}>
              🏢 DATA_TITLE (INSTANCE_NAME) :
            </label>
            <input 
              type="text" 
              value={perusahaan} 
              onChange={e => setPerusahaan(e.target.value)} 
              placeholder="Nama Instansi / Perusahaan / Organisasi..." 
              className="interactive-input"
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '50px',
                border: '2px solid rgba(107, 144, 188, 0.3)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
              required 
            />
          </div>

          {/* INPUT POSISI / ROLE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="accent-code" style={{ color: 'var(--text-main, #333)', fontWeight: '700', fontSize: '0.8rem' }}>
              🎖️ POSITION_ROLE :
            </label>
            <input 
              type="text" 
              value={posisi} 
              onChange={e => setPosisi(e.target.value)} 
              placeholder="Posisi / Peran Anda (Contoh: UI/UX Designer)..." 
              className="interactive-input"
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '50px',
                border: '2px solid rgba(107, 144, 188, 0.3)',
                fontSize: '0.95rem',
                outline: 'none'
              }}
              required 
            />
          </div>

          {/* INPUT TAHUN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="accent-code" style={{ color: 'var(--accent-gold, #d4a373)', fontWeight: '700', fontSize: '0.8rem' }}>
              ⏳ CHRONO_PERIOD (YEAR) :
            </label>
            <input 
              type="number" 
              min="1900"
              max={new Date().getFullYear()}
              value={tahun} 
              onChange={e => setTahun(e.target.value)} 
              placeholder="Tahun Kejadian (Contoh: 2024)..." 
              className="interactive-input"
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '50px',
                border: '2px dashed #6b90bc',
                fontSize: '0.95rem',
                outline: 'none'
              }}
              required 
            />
          </div>

          {/* INPUT JOBDESK */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="accent-code" style={{ color: 'var(--text-main, #333)', fontWeight: '700', fontSize: '0.8rem' }}>
              📝 PROCESS_DESCRIPTION (TASK_SPECIFICATION) :
            </label>
            <textarea 
              value={jobdesk} 
              onChange={e => setJobdesk(e.target.value)} 
              placeholder="Detail tugas atau pencapaian yang diraih selama periode tersebut..." 
              className="interactive-input"
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '20px',
                border: '2px solid rgba(107, 144, 188, 0.3)',
                fontSize: '0.95rem',
                outline: 'none',
                height: '100px',
                resize: 'none',
                fontFamily: 'inherit'
              }}
              required 
            />
          </div>

          {/* BUTTON SUBMIT */}
          <button 
            type="submit"
            style={{
              padding: '14px 28px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #6b90bc, #4a73a3)',
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              boxShadow: '0 4px 15px rgba(107, 144, 188, 0.3)',
              letterSpacing: '1px'
            }}
          >
            SYNCHRONIZE JOURNEY DATA ✦
          </button>
        </form>
      </div>

      {/* OUTPUT SUB-HEADER */}
      <h3 className="heading-elegant" style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-main, #333)' }}>
        [ DEPLOYED_ARCHIVES ]
      </h3>

      {/* GRID CONTAINER 3 KOLOM */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '25px', 
        maxWidth: 'calc(100% - 480px)' 
      }}>
        {daftarPengalaman.length === 0 ? (
          <p className="accent-code" style={{ color: 'var(--text-soft, #666)', gridColumn: '1 / -1', fontStyle: 'italic', fontSize: '0.9rem' }}>
            NO_LOG_FOUND // Awaiting experience synchronization sequence...
          </p>
        ) : (
          daftarPengalaman.map((item) => {
            const isSelected = logTerpilih === item.id;
            return (
              <div key={item.id} className="card-wrapper">
                
                {/* Tooltip Info */}
                <div className="custom-tooltip accent-code">
                  {isSelected ? "✦ CURRENTLY INSPECTING" : "✦ CLICK TO VIEW DETAILS"}
                </div>

                {/* PROJECT-CARD STYLE */}
                <div 
                  onClick={() => toggleInspectLog(item.id)}
                  style={{
                    background: 'var(--glass-panel, rgba(255, 255, 255, 0.04))',
                    border: isSelected ? '2px solid var(--accent-gold, #d4a373)' : '1px solid var(--border-ui, rgba(255, 255, 255, 0.1))',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: isSelected ? '0 0 20px rgba(212, 163, 115, 0.2)' : '0 8px 24px rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    position: 'relative'
                  }}
                >
                  {/* BADGE TAHUN */}
                  <span className="accent-code" style={{ 
                    fontSize: '0.75rem', 
                    background: 'rgba(107, 144, 188, 0.2)', 
                    color: 'var(--accent-blue, #6b90bc)',
                    padding: '4px 10px',
                    borderRadius: '50px',
                    fontWeight: '700',
                    display: 'inline-block',
                    marginBottom: '12px'
                  }}>
                    ⏳ TAHUN {item.tahun}
                  </span>

                  {/* JABATAN / POSISI */}
                  <h2 className="heading-elegant" style={{ 
                    fontSize: '1.15rem', 
                    color: 'var(--accent-gold, #d4a373)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    margin: '0 0 4px 0'
                  }}>
                    {item.posisi}
                  </h2>

                  {/* NAMA PERUSAHAAN */}
                  <span className="accent-code" style={{ fontSize: '0.8rem', color: 'var(--text-main, #333)', display: 'block', marginBottom: '12px' }}>
                    🏢 {item.perusahaan}
                  </span>

                  {/* CUPLIKAN TEXT */}
                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: 'var(--text-soft, #666)', 
                    lineHeight: '1.5', 
                    marginBottom: '15px',
                    display: '-webkit-box',
                    WebkitLineClamp: '2', 
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.jobdesk}
                  </p>

                  {/* BUTTON REMOVE */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-ui, rgba(0,0,0,0.05))', paddingTop: '12px' }}>
                    <button 
                      type="button"
                      onClick={(e) => handleHapus(item.id, e)}
                      style={{ padding: '5px 14px', fontSize: '0.75rem', background: 'linear-gradient(135deg, #e63946, #c12735)', borderRadius: '50px', color: '#fff', border: 'none', cursor: 'pointer' }}
                    >
                      REMOVE
                    </button>
                  </div>

                  {/* Dekorasi Garis Khas Game UI */}
                  <div style={{ position: 'absolute', left: '0', top: '20px', bottom: '20px', width: '3px', background: isSelected ? 'var(--accent-gold, #d4a373)' : 'transparent', transition: 'background 0.3s' }}></div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ================= RIGHT SIDE PANEL INSPECTOR ================= */}
      {logTerpilih && (() => {
        const dataPenuh = daftarPengalaman.find(l => l.id === logTerpilih);
        if (!dataPenuh) return null;
        return (
          <div className="slide-in-panel" style={{
            position: 'fixed',
            right: '25px',
            top: '25px',
            bottom: '25px',
            width: '430px',
            background: 'var(--inspector-bg, rgba(11, 17, 24, 0.96))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid var(--accent-gold, #d4a373)',
            borderRadius: '24px',
            padding: '25px',
            boxShadow: '-10px 0 40px rgba(0,0,0,0.3)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            color: 'var(--text-main, #333)',
            overflowY: 'auto'
          }}>
            {/* PANEL CONTROL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212, 163, 115, 0.25)', paddingBottom: '12px' }}>
              <div>
                <h4 className="accent-code" style={{ color: 'var(--accent-gold, #d4a373)', margin: 0, fontSize: '0.85rem', letterSpacing: '1px' }}>
                  // CHRONO_LOG_INSPECTOR
                </h4>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-soft, #666)' }}>LOG_UID: {dataPenuh.id}</span>
              </div>
              <button 
                onClick={() => setLogTerpilih(null)}
                style={{
                  background: 'rgba(0,0,0,0.05)',
                  border: '1px solid var(--border-ui, rgba(0,0,0,0.2))',
                  color: 'var(--text-main, #333)',
                  borderRadius: '50px',
                  padding: '5px 12px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}
              >
                CLOSE [X]
              </button>
            </div>

            {/* BLOCK PERIODE TAHUN */}
            <div style={{ background: 'rgba(107, 144, 188, 0.1)', border: '1px solid rgba(107, 144, 188, 0.3)', padding: '12px 18px', borderRadius: '14px' }}>
              <span className="accent-code" style={{ fontSize: '0.7rem', color: 'var(--accent-blue, #6b90bc)', display: 'block' }}>⏳ CHRONO_PERIOD :</span>
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main, #333)' }}>TAHUN {dataPenuh.tahun}</span>
            </div>

            {/* DETAIL JABATAN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span className="accent-code" style={{ fontSize: '0.75rem', color: 'var(--accent-gold, #d4a373)' }}>🎖️ OFFICIAL_ROLE_TITLE :</span>
              <h2 className="heading-elegant" style={{ fontSize: '1.5rem', color: 'var(--text-main, #333)', margin: 0, wordBreak: 'break-word', lineHeight: '1.2' }}>
                {dataPenuh.posisi}
              </h2>
            </div>

            {/* DETAIL PERUSAHAAN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span className="accent-code" style={{ fontSize: '0.75rem', color: 'var(--accent-blue, #6b90bc)' }}>🏢 ASSIGNED_ORGANIZATION :</span>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main, #333)' }}>
                {dataPenuh.perusahaan}
              </div>
            </div>

            {/* TEXT DESKRIPSI LENGKAP */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <span className="accent-code" style={{ fontSize: '0.75rem', color: 'var(--accent-blue, #6b90bc)' }}>📝 DETAILED_TASK_SPECIFICATIONS :</span>
              <div style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-main, #333)', 
                lineHeight: '1.6', 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word',
                background: 'rgba(0, 0, 0, 0.02)',
                padding: '15px',
                borderRadius: '14px',
                border: '1px solid var(--border-ui, rgba(0,0,0,0.06))',
                overflowY: 'auto',
                maxHeight: '340px'
              }}>
                {dataPenuh.jobdesk}
              </div>
            </div>

          </div>
        );
      })()}

    </div>
  );
}

export default Experience;