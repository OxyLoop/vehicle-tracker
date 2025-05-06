import React, { useState, useEffect } from 'react';
import './VehicleForm.css';
import CustomAlert from './CustomAlert.jsx';

function VehicleForm({ existing, onSubmit, onBack }) {
  const [form, setForm] = useState({
    plaka: '',
    marka: '',
    model: '',
    sasi: '',
    km: '',
    yakit: '',
    vites: '',
  });

  const [alert, setAlert] = useState(null);

  // Eğer düzenleme için veri geldiyse formu doldur
  useEffect(() => {
    if (existing) {
      setForm({
        plaka: existing.plaka || '',
        marka: existing.marka || '',
        model: existing.model || '',
        sasi: existing.sasi || '',
        km: existing.km || '',
        yakit: existing.yakit || '',
        vites: existing.vites || '',
      });
    }
  }, [existing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasEmpty = Object.values(form).some((v) => v.trim?.() === '');
    if (hasEmpty) {
      setAlert({ type: 'error', message: 'Lütfen tüm alanları doldurunuz.' });
      return;
    }

    const formatted = {
      ...form,
      plaka: form.plaka.trim().toUpperCase(),
      marka: form.marka.trim(),
      model: form.model.trim(),
      sasi: form.sasi.trim(),
      km: parseInt(form.km),
    };

    setAlert({
      type: 'success',
      message: existing ? 'Araç başarıyla güncellendi.' : 'Araç başarıyla kaydedildi.',
    });

    setTimeout(() => {
      setAlert(null);
      if (onSubmit) {
        onSubmit(existing ? { ...formatted, id: existing.id } : formatted);
      }
    }, 300);
  };

  return (
    <div className="form-page">
      <button className="btn fixed-back" onClick={onBack}>⬅️ Geri</button>

      {alert && (
        <CustomAlert
          title={alert.type === 'error' ? 'Hata' : 'Bilgi'}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <form className="vehicle-form" onSubmit={handleSubmit}>
        <h2>{existing ? '✏️ Araba Düzenle' : '🚘 Yeni Araba Ekle'}</h2>

        {[
          ['Plaka', 'plaka'],
          ['Marka', 'marka'],
          ['Model', 'model'],
          ['Şasi Numarası', 'sasi'],
          ['Kilometre', 'km'],
        ].map(([label, name]) => (
          <div key={name} className="form-row">
            <label htmlFor={name}>{label}</label>
            <input
              type="text"
              id={name}
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="form-row">
          <label htmlFor="yakit">Yakıt</label>
          <select name="yakit" id="yakit" value={form.yakit} onChange={handleChange} required>
            <option value="">Seçiniz</option>
            <option value="Benzin">Benzin</option>
            <option value="Dizel">Dizel</option>
            <option value="Elektrik">Elektrik</option>
            <option value="Hibrit">Hibrit</option>
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="vites">Vites</label>
          <select name="vites" id="vites" value={form.vites} onChange={handleChange} required>
            <option value="">Seçiniz</option>
            <option value="Manuel">Manuel</option>
            <option value="Otomatik">Otomatik</option>
          </select>
        </div>
      </form>

      <button type="submit" className="btn fixed-submit" onClick={handleSubmit}>
        {existing ? 'Güncelle' : 'Kaydet'}
      </button>
    </div>
  );
}

export default VehicleForm;
