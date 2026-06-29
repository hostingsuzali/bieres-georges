"use client";

import { useState } from "react";

const subjects = [
  "Question sur un produit",
  "Distribution / partenariat",
  "Presse",
  "Recrutement",
  "Autre",
];

const fieldClassName = "flex h-full flex-col";
const labelClassName = "eyebrow flex min-h-9 items-end text-green/55";
const controlClassName =
  "mt-2 min-h-12 w-full rounded-xl border border-green/15 bg-cream px-4 py-3.5 text-sm text-green outline-none transition-colors focus:border-orange";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-3xl bg-green p-8 text-center text-cream sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange text-2xl">
          ✓
        </span>
        <h3 className="font-display mt-6 text-3xl font-bold uppercase">
          Message envoyé
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
          Merci pour votre message. Notre équipe vous répond généralement sous
          quelques jours ouvrés.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="eyebrow mt-7 text-orange"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      id="formulaire"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
      className="rounded-3xl border border-green/10 bg-white/40 p-6 sm:p-9"
    >
      <h3 className="font-display text-3xl font-bold uppercase text-green">
        Écrivez-nous
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-green/65">
        Une question, une idée, une envie de collaborer ? Dites-nous tout.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Nom" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>

      <label className="mt-5 block">
        <span className={labelClassName}>Sujet</span>
        <select
          name="subject"
          required
          defaultValue=""
          className={controlClassName}
        >
          <option value="" disabled>
            Sélectionner
          </option>
          {subjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </label>

      <label className="mt-5 block">
        <span className={labelClassName}>Message</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Votre message..."
          className={`${controlClassName} resize-none`}
        />
      </label>

      <button
        type="submit"
        className="eyebrow cut-all mt-7 w-full bg-orange px-7 py-4 text-cream transition-colors hover:bg-orange-soft"
      >
        Envoyer le message
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
        className={controlClassName}
      />
    </label>
  );
}
