export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#DDF0FF]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-sm text-zinc-500 sm:flex-row sm:justify-between">
        <p>© 2023 Jobsy. Alle rettigheder forbeholdes.</p>

        <div className="flex gap-4">
          <a href="#">Om os</a>
          <a href="#">Vilkår</a>
          <a href="#">Privatliv</a>
          <a href="#">Support</a>
        </div>
      </div>
    </footer>
  );
}
