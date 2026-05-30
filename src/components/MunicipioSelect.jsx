import { useEffect, useState } from "react";
import { getMunicipios } from "../services/api";
import Select from "./Select";

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
      <Select
        value={value ?? ""}
        onChange={(v) => onChange(municipios.find((x) => String(x.apiId) === String(v)) ?? null)}
        placeholder="Selecione um município…"
        options={municipios.map((m) => ({ value: m.apiId, label: m.nome }))}
      />
    </label>
  );
}
