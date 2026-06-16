import React, { useState } from 'react';

function Contact() {
  // --- STATE FORM INTERACTION ---
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`TRANSMISSION_SUCCESS // Pesan dari ${nama} telah diamankan.`);
    setNama("");
    setEmail("");
    setPesan("");
  };

  return (
    <div className="fade-in-page" style={{ padding: '10px', width: '100%', transition: 'color 0.4s ease', position: 'relative' }}>
      
      <style>{`
        @keyframes fadeInPage {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-page {
          animation: fadeInPage 0.5s ease-out forwards;
        }
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
      `}</style>

      {/* HEADER */}
      <h1 className="heading-elegant" style={{ fontSize: '2.2rem', marginBottom: '5px', color: 'var(--text-main)' }}>
        SIGNAL TERMINAL.
      </h1>
      <p className="accent-code" style={{ color: 'var(--text-soft)', marginBottom: '30px', fontSize: '0.85rem' }}>
        MODULE // COMMUNICATIONS_OUTBOUND_GATEWAY
      </p>

      {/* CONTAINER FORM GLASS EFFECT */}
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
        
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-soft)', 
          lineHeight: '1.5', 
          marginBottom: '25px',
          borderLeft: '3px solid var(--accent-gold, #d4a373)',
          paddingLeft: '15px'
        }}>
          Tertarik untuk membangun kolaborasi dalam pembuatan ekosistem animasi 3D, sinematografi, atau rekayasa pengembangan website? Inisialisasi parameter di bawah untuk mengirimkan enkripsi pesan langsung ke sistem saya.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="accent-code" style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '0.8rem' }}>
              👤 TRANSMITTER_NAME :
            </label>
            <input 
              type="text" 
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan identitas atau nama kamu..." 
              className="theme-adaptive-input interactive-input"
              style={{ width: '100%', padding: '14px 20px', borderRadius: '50px', fontSize: '0.95rem', outline: 'none' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="accent-code" style={{ color: 'var(--accent-gold, #d4a373)', fontWeight: '700', fontSize: '0.8rem' }}>
              📧 RETURN_ADDRESS_EMAIL :
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@domain.com" 
              className="theme-adaptive-input interactive-input"
              style={{ width: '100%', padding: '14px 20px', borderRadius: '50px', fontSize: '0.95rem', outline: 'none' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="accent-code" style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '0.8rem' }}>
              💬 TRANSMISSION_DATA_PAYLOAD :
            </label>
            <textarea 
              rows="5"
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              placeholder="Tuliskan rincian ide kolaborasi atau pesan yang ingin kamu sampaikan secara komprehensif..." 
              className="theme-adaptive-input interactive-input"
              style={{ width: '100%', padding: '16px 20px', borderRadius: '20px', fontSize: '0.95rem', outline: 'none', resize: 'none', fontFamily: 'inherit' }}
              required
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
            INITIALIZE TRANSMISSION ✦
          </button>

        </form>
      </div>
    </div>
  );
}

export default Contact;