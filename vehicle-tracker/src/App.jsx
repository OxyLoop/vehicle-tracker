import './App.css';
import { useState, useEffect } from 'react';
import VehicleForm from './components/VehicleForm';
import VehicleList from './components/VehicleList';

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setActiveScreen('edit');
  };

  const handleSaveVehicle = (vehicle) => {
    const existing = JSON.parse(localStorage.getItem('vehicles') || '[]');

    let updated;
    if (vehicle.id) {
      updated = existing.map((v) => (v.id === vehicle.id ? vehicle : v));
    } else {
      const newVehicle = {
        ...vehicle,
        id: Date.now().toString()
      };
      updated = [...existing, newVehicle];
    }

    localStorage.setItem('vehicles', JSON.stringify(updated));
    setEditingVehicle(null);
    setActiveScreen('list');
  };

  const handleSearch = () => {
    const vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    const filtered = vehicles.filter(
      (v) =>
        v.plaka?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.sasi?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
    setActiveScreen('search');
  };

  const handleExport = () => {
    const data = JSON.parse(localStorage.getItem('vehicles') || '[]');
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'araclar.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleImport = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        if (Array.isArray(imported)) {
          localStorage.setItem('vehicles', JSON.stringify(imported));
          alert('Veriler içe aktarıldı.');
          setSearchResults(imported);
          setActiveScreen('search');
        } else {
          alert('Geçersiz dosya formatı.');
        }
      } catch {
        alert('Dosya okunamadı.');
      }
    };
    reader.readAsText(file);
  };

  // 📦 Electron Menüden Export/Import desteği:
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onExport(() => handleExport());
      window.electronAPI.onImport((jsonText) => {
        try {
          const imported = JSON.parse(jsonText);
          if (Array.isArray(imported)) {
            localStorage.setItem('vehicles', JSON.stringify(imported));
            alert('Veriler başarıyla yüklendi!');
            setSearchResults(imported);
            setActiveScreen('search');
          } else {
            alert('Geçersiz veri formatı.');
          }
        } catch (e) {
          alert('İçe aktarma başarısız: ' + e.message);
        }
      });
    }
  }, []);

  return (
    <div className="container">
      {activeScreen === 'home' && (
        <>
          <header className="header">
            <h1>Aydın Seçkin Mühendislik</h1>
            <p>🚗 Araç Bilgi Takip Uygulaması</p>
          </header>

          {/* 🔍 Arama Alanı */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Şasi No veya Plaka girin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px',
                fontSize: '16px',
                width: '300px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginRight: '10px'
              }}
            />
            <button onClick={handleSearch} className="btn blue">
              Ara
            </button>
          </div>

          <div className="button-group">
            <button className="btn blue" onClick={() => setActiveScreen('add')}>
              Yeni Araba Ekle
            </button>
            <button className="btn green" onClick={() => setActiveScreen('list')}>
              Mevcut Arabaları Listele
            </button>
          </div>
        </>
      )}

      {activeScreen === 'add' && (
        <VehicleForm
          onSubmit={handleSaveVehicle}
          onBack={() => setActiveScreen('home')}
        />
      )}

      {activeScreen === 'edit' && (
        <VehicleForm
          existing={editingVehicle}
          onSubmit={handleSaveVehicle}
          onBack={() => {
            setEditingVehicle(null);
            setActiveScreen('list');
          }}
        />
      )}

      {activeScreen === 'list' && (
        <VehicleList
          onBack={() => setActiveScreen('home')}
          onEdit={handleEditVehicle}
        />
      )}

      {activeScreen === 'search' && (
        <VehicleList
          vehicles={searchResults}
          onBack={() => setActiveScreen('home')}
          onEdit={handleEditVehicle}
        />
      )}
    </div>
  );
}

export default App;
