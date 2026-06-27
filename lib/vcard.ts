import { profile } from "./profile";

// Construye una cadena vCard 3.0 valida (compatible iOS/Android/Outlook).
export function buildVCard(): string {
  // Nombre estructurado: Apellidos;Nombres
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Jiménez Campo;Farid Enrique;Eathan;;",
    "FN:Farid Enrique Jiménez Campo (Eathan)",
    "NICKNAME:Eathan",
    "TITLE:AI Engineer | Data Scientist | Full Stack Developer",
    `EMAIL;TYPE=INTERNET,PREF:${profile.email}`,
    `TEL;TYPE=CELL,VOICE:+${profile.whatsapp}`,
    `URL:${profile.web}`,
    `ADR;TYPE=HOME:;;${profile.address};Barranquilla;Atlántico;;Colombia`,
    "NOTE:Convierto datos e IA en decisiones inteligentes.",
    `X-SOCIALPROFILE;TYPE=linkedin:${profile.linkedin}`,
    `X-SOCIALPROFILE;TYPE=github:${profile.github}`,
    "END:VCARD",
  ];
  return lines.join("\r\n");
}

// Dispara la descarga del archivo .vcf en el navegador.
export function downloadVCard() {
  const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Farid-Eathan-Jimenez.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
