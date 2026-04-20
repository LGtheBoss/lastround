type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_var(--theme-bg-glow),_transparent_34%),linear-gradient(180deg,_var(--theme-bg)_0%,_var(--theme-bg)_100%)] px-4 py-5 text-[var(--theme-text-primary)]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {children}
      </div>
    </main>
  );
}
