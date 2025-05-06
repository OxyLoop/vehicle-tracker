import React, { useEffect, useState } from 'react';
import './VehicleList.css';

function VehicleList({ onBack, onEdit }) {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('vehicles') || '[]');
    setVehicles(data);
  }, []);

  const handleDelete = (id) => {
    const updated = vehicles.filter((v) => v.id !== id);
    localStorage.setItem('vehicles', JSON.stringify(updated));
    setVehicles(updated);
  };

  const handleEdit = (vehicle) => {
    onEdit(vehicle);
  };

  return (
    <div className="list-page">
      <button className="btn fixed-back" onClick={onBack}>⬅️ Geri</button>
      <h2>📋 Mevcut Arabalar</h2>

      {vehicles.length === 0 ? (
        <p>Henüz kayıtlı araç yok.</p>
      ) : (
        <div className="vehicle-list">
          {vehicles.map((v) => (
            <div key={v.id} className="vehicle-card">
              <p><strong>Plaka:</strong> {v.plaka}</p>
              <p><strong>Marka:</strong> {v.marka}</p>
              <p><strong>Model:</strong> {v.model}</p>
              <p><strong>Şasi No:</strong> {v.sasi}</p>
              <p><strong>Kilometre:</strong> {v.km} km</p>
              <p><strong>Yakıt:</strong> {v.yakit}</p>
              <p><strong>Vites:</strong> {v.vites}</p>

              <div className="card-buttons">
                <button className="btn small edit" onClick={() => handleEdit(v)}>Düzenle</button>
                <button className="btn small delete" onClick={() => handleDelete(v.id)}>Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VehicleList;
