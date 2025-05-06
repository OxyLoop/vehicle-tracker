import './App.css';
import { useState } from 'react';
import VehicleForm from './components/VehicleForm';
import VehicleList from './components/VehicleList';

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [editingVehicle, setEditingVehicle] = useState(null);

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setActiveScreen('edit');
  };

  const handleSaveVehicle = (vehicle) => {
    const existing = JSON.parse(localStorage.getItem('vehicles') || '[]');

    let updated;
    if (vehicle.id) {
      // Güncelleme
      updated = existing.map((v) => (v.id === vehicle.id ? vehicle : v));
    } else {
      // Yeni kayıt
      const newVehicle = {
        ...vehicle,
        id: existing?.id || Date.now().toString()
      };
      updated = [...existing, newVehicle];
    }

    localStorage.setItem('vehicles', JSON.stringify(updated));
    setEditingVehicle(null);
    setActiveScreen('list');
  };

  return (
    <div className="container">
      {activeScreen === 'home' && (
        <>
          <header className="header">
            <h1>Aydın Seçkin Mühendislik</h1>
            <p>🚗 Araç Bilgi Takip Uygulaması</p>
          </header>

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
    </div>
  );
}

export default App;
