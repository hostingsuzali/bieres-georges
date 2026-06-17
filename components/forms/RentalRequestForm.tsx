"use client";

import { useState } from "react";

const fieldClassName = "flex h-full flex-col";
const labelClassName = "eyebrow flex min-h-9 items-end text-green/55";
const controlClassName =
  "mt-2 min-h-12 w-full rounded-xl border border-green/15 bg-cream px-4 py-3.5 text-sm text-green outline-none transition-colors focus:border-orange";

export function RentalRequestForm() {
  const [prepared, setPrepared] = useState(false);

  if (prepared) {
    return (
      <div className="rounded-3xl bg-green p-8 text-center text-cream sm:p-12">
        <p className="eyebrow text-orange">Étape suivante</p>
        <h3 className="font-display mt-4 text-4xl font-bold uppercase">
          Demande prête
        </h3>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-cream/70">
          Le récapitulatif et le paiement Stripe seront activés après validation
          des tarifs, cautions, zones de livraison et disponibilités.
        </p>
        <button
          type="button"
          onClick={() => setPrepared(false)}
          className="eyebrow mt-7 text-orange"
        >
          Modifier les informations
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setPrepared(true);
      }}
      className="rounded-3xl border border-green/10 bg-white/40 p-6 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Date de l'événement" name="date" type="date" required />
        <Field label="Code postal" name="postalCode" required />
        <Field label="Nombre de personnes" name="guests" type="number" required />
        <label className={fieldClassName}>
          <span className={labelClassName}>Type d’événement</span>
          <select
            name="eventType"
            required
            defaultValue=""
            className={controlClassName}
          >
            <option value="" disabled>
              Sélectionner
            </option>
            <option>Anniversaire</option>
            <option>Mariage</option>
            <option>Événement d’entreprise</option>
            <option>Festival / association</option>
            <option>Autre</option>
          </select>
        </label>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Nom" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <label className="mt-5 block">
        <span className={labelClassName}>Clé API Stripe client</span>
        <input
          name="stripeApiKey"
          type="password"
          placeholder="sk_live_..."
          className={controlClassName}
        />
        <span className="mt-2 block text-xs leading-relaxed text-green/55">
          Champ prévu pour une clé API fournie par le client. Ce parcours ne
          repose pas sur Stripe OAuth Connect.
        </span>
      </label>
      <label className="mt-5 block">
        <span className={labelClassName}>Informations utiles</span>
        <textarea
          name="details"
          rows={4}
          placeholder="Lieu, horaires, besoin de livraison, préférences de bières..."
          className={`${controlClassName} resize-none`}
        />
      </label>
      <button
        type="submit"
        className="eyebrow cut-all mt-7 bg-orange px-8 py-4 text-cream transition-colors hover:bg-orange-soft"
      >
        Vérifier ma demande
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
    <label className={fieldClassName}>
      <span className={labelClassName}>{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        min={type === "number" ? 1 : undefined}
        className={controlClassName}
      />
    </label>
  );
}
