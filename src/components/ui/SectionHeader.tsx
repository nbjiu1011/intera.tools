/** Swiss-style section header: a heavy rule, an index number and a left-aligned title. */
export function SectionHeader({
  index,
  title,
  lead,
  action,
  id,
}: {
  index?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="grid gap-3 border-t-2 border-ink pt-4 md:grid-cols-12 md:gap-6">
      {index && <p className="text-sm font-semibold text-ink tabular-nums md:col-span-2">{index}</p>}
      <div className={index ? "md:col-span-7" : "md:col-span-9"}>
        <h2 id={id} className="text-[1.75rem] leading-[1.1] font-bold tracking-[-0.03em] text-ink sm:text-[2.25rem]">
          {title}
        </h2>
        {lead && <p className="mt-2 max-w-2xl text-ink-2">{lead}</p>}
      </div>
      {action && <div className="md:col-span-3 md:justify-self-end md:self-end">{action}</div>}
    </div>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-line-strong underline-offset-4 transition hover:decoration-ink">
      {children}
    </a>
  );
}
