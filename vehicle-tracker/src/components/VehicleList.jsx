import React, { useEffect, useState } from 'react';
import VehicleDetails from './VehicleDetailsPanel';
import './VehicleList.css';

function VehicleList({ vehicles: propVehicles, onBack, onEdit }) {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    if (propVehicles) {
      setVehicles(propVehicles);
    } else {
      const data = JSON.parse(localStorage.getItem('vehicles') || '[]');
      setVehicles(data);
    }
  }, [propVehicles]);

  const handleDelete = (id) => {
    const fullList = JSON.parse(localStorage.getItem('vehicles') || '[]');
    const updated = fullList.filter((v) => v.id !== id);
    localStorage.setItem('vehicles', JSON.stringify(updated));

    // Görünüm listesini de güncelle (arama yaptıysan)
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };


  const handleShowDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleHideDetails = () => {
    setSelectedVehicle(null);
  };

  return (
    <div className="list-page">
      <button className="btn fixed-back" onClick={onBack}>⬅️ Geri</button>
      <h2>📋 Mevcut Arabalar</h2>

      {selectedVehicle ? (
        <VehicleDetails
          vehicle={selectedVehicle}
          onBack={handleHideDetails}
          onEdit={() => onEdit(selectedVehicle)}
          onDelete={() => handleDelete(selectedVehicle.id)}
        />
      ) : vehicles.length === 0 ? (
        <p>Henüz kayıtlı araç yok.</p>
      ) : (
        <div className="vehicle-list">
          {vehicles.map((v) => (
            <div key={v.id} className="vehicle-card">
              <p><strong>Plaka:</strong> {v.plaka}</p>
              <p><strong>Şasi No:</strong> {v.sasi}</p>
              <button className="btn small toggle" onClick={() => handleShowDetails(v)}>Detaylar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VehicleList;
