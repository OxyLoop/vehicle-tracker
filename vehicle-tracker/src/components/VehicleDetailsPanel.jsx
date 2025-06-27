// VehicleDetailsPanel.jsx
import React, { useState } from 'react';
import './VehicleDetails.css';

function VehicleDetailsPanel({ vehicle, onDelete, onEdit, onBack }) {
  const [activeTab, setActiveTab] = useState('arac');

  const tabs = [
    { key: 'arac', label: 'Araç Bilgileri' },
    { key: 'musteri', label: 'Müşteri Bilgileri' },
    { key: 'servis', label: 'Servis Bilgileri' },
    { key: 'ucret', label: 'Ücret Bilgisi' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'arac':
        return (
          <div className="vehicle-detail-card">
            {vehicle.plaka && <p><strong>Plaka:</strong> {vehicle.plaka}</p>}
            {vehicle.marka && <p><strong>Marka:</strong> {vehicle.marka}</p>}
            {vehicle.model && <p><strong>Model:</strong> {vehicle.model}</p>}
            {vehicle.sasi && <p><strong>Şasi No:</strong> {vehicle.sasi}</p>}
            {vehicle.km && <p><strong>Kilometre:</strong> {vehicle.km}</p>}
            {vehicle.yakit && <p><strong>Yakıt:</strong> {vehicle.yakit}</p>}
            {vehicle.vites && <p><strong>Vites:</strong> {vehicle.vites}</p>}
          </div>
        );
      case 'musteri':
        return (
          <div className="vehicle-detail-card">
            {vehicle.musteriAdi && <p><strong>Ad Soyad:</strong> {vehicle.musteriAdi}</p>}
            {vehicle.musteriTel && <p><strong>Telefon:</strong> {vehicle.musteriTel}</p>}
            {vehicle.musteriEmail && <p><strong>E-posta:</strong> {vehicle.musteriEmail}</p>}
            {vehicle.musteriAdres && <p><strong>Adres:</strong> {vehicle.musteriAdres}</p>}
          </div>
        );
      case 'servis':
        return (
          <div className="vehicle-detail-card">
            {vehicle.gelisTarihi && <p><strong>Geliş Tarihi:</strong> {vehicle.gelisTarihi}</p>}
            {vehicle.kabulEden && <p><strong>Servise Kabul Eden:</strong> {vehicle.kabulEden}</p>}
            {vehicle.yapilacakIslemler && <p><strong>Yapılacak İşlemler:</strong> {vehicle.yapilacakIslemler}</p>}
            {vehicle.degisenParcalar && <p><strong>Değişen Parçalar:</strong> {vehicle.degisenParcalar}</p>}
            {vehicle.kullanilanMalzemeler && <p><strong>Kullanılan Malzemeler:</strong> {vehicle.kullanilanMalzemeler}</p>}
            {vehicle.islemSuresi && <p><strong>İşlem Süresi:</strong> {vehicle.islemSuresi}</p>}
            {vehicle.testSurusuYapildiMi && <p><strong>Test Sürüşü:</strong> {vehicle.testSurusuYapildiMi}</p>}
            {vehicle.sikayetler && <p><strong>Şikayetler:</strong> {vehicle.sikayetler}</p>}
            {vehicle.iscilikAciklamalari && <p><strong>İşçilik Açıklamaları:</strong> {vehicle.iscilikAciklamalari}</p>}
            {vehicle.aracDurumu && <p><strong>Araç Durumu:</strong> {vehicle.aracDurumu}</p>}
          </div>
        );
      case 'ucret':
        return (
          <div className="vehicle-detail-card">
            {vehicle.yedekParca && <p><strong>Yedek Parça:</strong> {vehicle.yedekParca}</p>}
            {vehicle.iscilik && <p><strong>İşçilik:</strong> {vehicle.iscilik}</p>}
            {vehicle.digerGiderler && <p><strong>Diğer Giderler:</strong> {vehicle.digerGiderler}</p>}
            {vehicle.toplam && <p><strong>Toplam (KDV %20):</strong> {vehicle.toplam}</p>}
            {vehicle.odemeTuru && <p><strong>Ödeme Türü:</strong> {vehicle.odemeTuru}</p>}
            {vehicle.tarih && <p><strong>Tarih:</strong> {vehicle.tarih}</p>}
            {vehicle.teslimAlan && <p><strong>Teslim Alan:</strong> {vehicle.teslimAlan}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-page">
      <button className="btn fixed-back" onClick={onBack}>⬅️ Geri</button>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>📄 Araç Detayı</h2>

      <div className="details-tabs">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            className={activeTab === key ? 'active' : ''}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {renderTabContent()}

      <div className="detail-buttons">
        <button className="btn edit" onClick={() => onEdit(vehicle)}>Düzenle</button>
        <button
          className="btn"
          style={{ backgroundColor: 'crimson' }}
          onClick={() => {
            if (window.confirm('Bu aracı silmek istediğinizden emin misiniz?')) {
              onDelete(vehicle.id);
              onBack(); // ← silme işleminden sonra geri dön
            }
          }}
        >
          Sil
        </button>

      </div>
    </div>
  );
}

export default VehicleDetailsPanel;