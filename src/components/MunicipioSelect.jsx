import { useEffect, useState } from "react";
import { getMunicipios } from "../services/api";

// Seletor de municipio reutilizavel. Carrega o ranking e devolve, no onChange,
// o objeto completo do municipio (inclui apiId para as chamadas de detalhe).
export default function MunicipioSelect({ value, onChange, label = "Município" }) {
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    getMunicipios().then(setMunicipios).catch(() => {});
  }, []);

  return (
    <label className="campo">
      <span>{label}</span>
      <select
        value={value ?? ""}
        onChange={(e) => {
          const m = municipios.find((x) => String(x.apiId) === e.target.value);
          onChange(m ?? null);
        }}
      >
        <option value="">Selecione um município…</option>
        {municipios.map((m) => (
          <option key={m.apiId} value={m.apiId}>
            {m.nome}
          </option>
        ))}
      </select>
    </label>
  );
}
