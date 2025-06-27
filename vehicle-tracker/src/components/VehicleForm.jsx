import React, { useState, useEffect } from 'react';
import './VehicleForm.css';
import CustomAlert from './CustomAlert.jsx';

function VehicleForm({ existing, onSubmit, onBack }) {
  const [activeTab, setActiveTab] = useState('arac');
  const [form, setForm] = useState({
    plaka: '',
    marka: '',
    model: '',
    sasi: '',
    km: '',
    yakit: '',
    vites: '',
    musteriAdi: '',
    musteriTel: '',
    musteriEmail: '',
    musteriAdres: '',
    servisTarihi: '',
    yapilanIslem: '',
    gelisTarihi: '',
    kabulEden: '',
    yapilacakIslemler: '',
    degisenParcalar: '',
    kullanilanMalzemeler: '',
    islemSuresi: '',
    testSurusuYapildiMi: '',
    sikayetler: '',
    iscilikAciklamalari: '',
    aracDurumu: '',
    yedekParca: '',
    iscilik: '',
    digerGiderler: '',
    toplam: '',
    odemeTuru: '',
    tarih: '',
    teslimAlan: ''
  });


  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (existing) {
      setForm({ ...form, ...existing });
    }
  }, [existing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    const formatted = {
      ...form,
      plaka: form.plaka.trim().toUpperCase(),
      marka: form.marka.trim(),
      model: form.model.trim(),
      sasi: form.sasi.trim(),
      km: form.km ? parseInt(form.km) : '',

      musteriAdi: form.musteriAdi.trim(),
      musteriTel: form.musteriTel.trim(),
      musteriEmail: form.musteriEmail.trim(),
      musteriAdres: form.musteriAdres.trim(),

      servisTarihi: form.servisTarihi,
      gelisTarihi: form.gelisTarihi,
      kabulEden: form.kabulEden.trim(),
      yapilacakIslemler: form.yapilacakIslemler.trim(),
      degisenParcalar: form.degisenParcalar.trim(),
      kullanilanMalzemeler: form.kullanilanMalzemeler.trim(),
      islemSuresi: form.islemSuresi.trim(),
      testSurusuYapildiMi: form.testSurusuYapildiMi,
      sikayetler: form.sikayetler.trim(),
      iscilikAciklamalari: form.iscilikAciklamalari.trim(),
      aracDurumu: form.aracDurumu.trim(),

      yedekParca: form.yedekParca?.trim?.() ?? '',
      iscilik: form.iscilik?.trim?.() ?? '',
      digerGiderler: form.digerGiderler?.trim?.() ?? '',
      toplam: form.toplam?.trim?.() ?? '',
      odemeTuru: form.odemeTuru?.trim?.() ?? '',
      tarih: form.tarih ?? '',
      teslimAlan: form.teslimAlan?.trim?.() ?? ''
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

      <h2>{existing ? '✏️ Araba Düzenle' : '🚘 Yeni Araba Ekle'}</h2>

      {/* 🔘 Sekmeler */}
      <div className="tabs">
        {[
          ['arac', 'Araç Bilgileri'],
          ['musteri', 'Müşteri Bilgileri'],
          ['servis', 'Servis Bilgileri'],
          ['ucret', 'Ücret Bilgileri'],
        ].map(([key, label]) => (
          <button
            key={key}
            className={activeTab === key ? 'active' : ''}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <form className="vehicle-form" onSubmit={handleSubmit}>
        {activeTab === 'arac' && (
          <>
            <div className="form-row"><label>Plaka</label><input name="plaka" value={form.plaka} onChange={handleChange} /></div>
            <div className="form-row"><label>Marka</label><input name="marka" value={form.marka} onChange={handleChange} /></div>
            <div className="form-row"><label>Model</label><input name="model" value={form.model} onChange={handleChange} /></div>
            <div className="form-row"><label>Şasi</label><input name="sasi" value={form.sasi} onChange={handleChange} /></div>
            <div className="form-row"><label>Kilometre</label><input name="km" value={form.km} onChange={handleChange} /></div>
            <div className="form-row"><label>Yakıt</label>
              <select name="yakit" value={form.yakit} onChange={handleChange}>
                <option value="">Seçiniz</option>
                <option value="Benzin">Benzin</option>
                <option value="Dizel">Dizel</option>
                <option value="Elektrik">Elektrik</option>
                <option value="Hibrit">Hibrit</option>
              </select>
            </div>
            <div className="form-row"><label>Vites</label>
              <select name="vites" value={form.vites} onChange={handleChange}>
                <option value="">Seçiniz</option>
                <option value="Manuel">Manuel</option>
                <option value="Otomatik">Otomatik</option>
              </select>
            </div>
          </>
        )}

        {activeTab === 'musteri' && (
          <>
            <div className="form-row">
              <label>Ad Soyad</label>
              <input name="musteriAdi" value={form.musteriAdi} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label>Telefon</label>
              <input name="musteriTel" value={form.musteriTel} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label>E-posta</label>
              <input name="musteriEmail" type="email" value={form.musteriEmail} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label>Adres</label>
              <textarea name="musteriAdres" rows={3} value={form.musteriAdres} onChange={handleChange} />
            </div>
          </>
        )}


        {activeTab === 'servis' && (
          <>
            <div className="form-row">
              <label>Geliş Tarihi</label>
              <input name="gelisTarihi" type="date" value={form.gelisTarihi} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label>Servise Kabul Eden</label>
              <input name="kabulEden" value={form.kabulEden} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label>Yapılacak İşlemler</label>
              <textarea name="yapilacakIslemler" value={form.yapilacakIslemler} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label>Değişen Parçalar</label>
              <textarea name="degisenParcalar" value={form.degisenParcalar} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label>Kullanılan Malzemeler</label>
              <textarea name="kullanilanMalzemeler" value={form.kullanilanMalzemeler} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label>İşlem Süresi (Tahmini)</label>
              <input name="islemSuresi" value={form.islemSuresi} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label>Test Sürüşü Yapıldı mı?</label>
              <select name="testSurusuYapildiMi" value={form.testSurusuYapildiMi} onChange={handleChange}>
                <option value="">Seçiniz</option>
                <option value="Evet">Evet</option>
                <option value="Hayır">Hayır</option>
              </select>
            </div>

            <div className="form-row">
              <label>Şikayetler</label>
              <textarea name="sikayetler" rows="3" value={form.sikayetler} onChange={handleChange} />
            </div>
            
            <div className="form-row">
              <label>İşçilik Açıklamaları</label>
              <textarea name="iscilikAciklamalari" rows="3" value={form.iscilikAciklamalari} onChange={handleChange} />
            </div>
            
            <div className="form-row">
              <label>Araç Durumu(Geldiğinde)</label>
              <textarea name="aracDurumu" rows="3" value={form.aracDurumu} onChange={handleChange} />
            </div>
          </>
        )}


        {activeTab === 'ucret' && (
          <>
            <div className="form-row"><label>Yedek Parça</label><textarea name="yedekParca" value={form.yedekParca} onChange={handleChange} /></div>
            <div className="form-row"><label>İşçilik</label><textarea name="iscilik" value={form.iscilik} onChange={handleChange} /></div>
            <div className="form-row"><label>Diğer Giderler</label><textarea name="digerGiderler" value={form.digerGiderler} onChange={handleChange} /></div>
            <div className="form-row"><label>Toplam (KDV %20)</label><input name="toplam" value={form.toplam} onChange={handleChange} /></div>
            <div className="form-row"><label>Ödeme Türü</label><input name="odemeTuru" value={form.odemeTuru} onChange={handleChange} /></div>
            <div className="form-row"><label>Tarih</label><input name="tarih" type="date" value={form.tarih} onChange={handleChange} /></div>
            <div className="form-row"><label>Teslim Alan</label><input name="teslimAlan" value={form.teslimAlan} onChange={handleChange} /></div>
          </>
        )}


        <button type="submit" className="btn fixed-submit">
          {existing ? 'Güncelle' : 'Kaydet'}
        </button>
      </form>
    </div>
  );
}

export default VehicleForm;
