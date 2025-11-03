export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
        <div>© {new Date().getFullYear()} Flight Explorer</div>
        <div className="mt-1">Built with ❤️ — <a className="text-blue-600" href="#">Privacy</a> · <a className="text-blue-600" href="#">Terms</a></div>
      </div>
    </footer>
  );
}
