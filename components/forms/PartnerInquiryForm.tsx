"use client";

import { useState } from "react";

const partnerTypes = [
  "Bar / Restaurant",
  "Caviste",
  "Grande distribution",
  "Événementiel",
];

export function PartnerInquiryForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex min-h-[30rem] flex-col items-center justify-center rounded-3xl bg-green p-8 text-center text-cream">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-orange text-3xl">
          ✓
        </span>
        <h3 className="font-display mt-6 text-3xl font-bold uppercase">
          Demande préparée
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
          Cette maquette valide le parcours. L’envoi sera branché dès que
          l’adresse de destination et l’outil CRM seront confirmés.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="eyebrow mt-7 text-orange"
        >
          Modifier la demande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
      className="rounded-3xl bg-green p-6 text-cream sm:p-9"
    >
      <h3 className="font-display text-3xl font-bold uppercase">
        Parlons de votre projet
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-cream/65">
        Quelques informations suffisent pour orienter votre demande vers la
        bonne équipe.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Field label="Nom" name="name" required />
        <Field label="Entreprise" name="company" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Téléphone" name="phone" type="tel" />
      </div>
      <label className="mt-4 block">
        <span className="eyebrow text-cream/60">Votre activité</span>
        <select
          name="partnerType"
          required
          defaultValue=""
          className="mt-2 w-full rounded-xl border border-cream/20 bg-green-deep px-4 py-3 text-sm text-cream outline-none focus:border-orange"
        >
          <option value="" disabled>
            Sélectionner
          </option>
          {partnerTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <label className="mt-4 block">
        <span className="eyebrow text-cream/60">Message</span>
        <textarea
          name="message"
          rows={5}
          className="mt-2 w-full resize-none rounded-xl border border-cream/20 bg-green-deep px-4 py-3 text-sm text-cream outline-none focus:border-orange"
          placeholder="Votre établissement, vos besoins, vos volumes..."
        />
      </label>
      <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-cream/65">
        <input type="checkbox" required className="mt-0.5 accent-orange" />
        J’accepte d’être recontacté au sujet de cette demande professionnelle.
      </label>
      <button
        type="submit"
        className="eyebrow cut-all mt-7 w-full bg-orange px-7 py-4 text-cream transition-colors hover:bg-orange-soft"
      >
        Envoyer ma demande
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
};

function Field({ label, name, type = "text", required }: FieldProps) {
  return (
    <label className="block">
      <span className="eyebrow text-cream/60">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-cream/20 bg-green-deep px-4 py-3 text-sm text-cream outline-none focus:border-orange"
      />
    </label>
  );
}
