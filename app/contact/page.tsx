"use client";

import { useState, type FormEvent } from "react";

const TOPICS = [
  { value: "buying", label: "Buying" },
  { value: "selling", label: "Selling to us" },
  { value: "general", label: "General" },
];

function fieldClass() {
  return "w-full border-0 border-b border-iron bg-transparent py-2 font-sans text-body-sm text-bone outline-none transition-colors focus:border-lime";
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-mono text-meta uppercase tracking-wide text-ash"
    >
      {children}
    </label>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
  }

  return (
    <main>
      <section className="border-b border-iron">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-[120px]">
          <h1 className="font-display text-h1 text-white">Get in touch</h1>
          <p className="mt-3 max-w-2xl text-body-sm text-ash">
            Buying, selling, or something else — tell us what it's about and
            we'll get back to you.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 lg:py-[120px]">
          {/* ---- Form ------------------------------------------------ */}
          <div>
            {submitted ? (
              <div className="border border-lime bg-graphite p-6 sm:p-8">
                <p className="font-display text-h3 text-lime">
                  Message logged. We'll reply within 24 hours.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={fieldClass()}
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldClass()}
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="topic">What's this about</FieldLabel>
                  <select
                    id="topic"
                    name="topic"
                    required
                    defaultValue=""
                    className={fieldClass()}
                  >
                    <option value="" disabled className="bg-void text-ash">
                      Select one
                    </option>
                    {TOPICS.map((t) => (
                      <option key={t.value} value={t.value} className="bg-void text-bone">
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className={`${fieldClass()} resize-y`}
                  />
                </div>

                <button type="submit" className="btn-primary">
                  Send message
                </button>
              </form>
            )}
          </div>

          {/* ---- Plain contact info ------------------------------------ */}
          <aside aria-label="Contact details">
            <dl className="space-y-6 border-t border-iron pt-6 lg:border-t-0 lg:pt-0">
              <div>
                <dt className="font-mono text-meta uppercase tracking-wide text-ash">
                  Email
                </dt>
                <dd className="mt-1 font-mono text-meta text-bone">
                  <a
                    href="mailto:bench@hustlehome.co"
                    className="underline underline-offset-4 hover:text-lime"
                  >
                    bench@hustlehome.co
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-meta uppercase tracking-wide text-ash">
                  Instagram
                </dt>
                <dd className="mt-1 font-mono text-meta text-bone">
                  <a
                    href="https://instagram.com"
                    className="underline underline-offset-4 hover:text-lime"
                  >
                    @hustlehome
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-meta uppercase tracking-wide text-ash">
                  Response window
                </dt>
                <dd className="mt-1 text-body-sm text-ash">
                  Within 24 hours, every day of the week.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-meta uppercase tracking-wide text-ash">
                  Based in
                </dt>
                <dd className="mt-1 text-body-sm text-ash">
                  Dublin, Ireland — serving resellers worldwide.
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </main>
  );
}
