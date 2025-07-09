function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-auto bg-white text-gray-700 py-1 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs md:text-sm">
          © {new Date().getFullYear()} Your Company, All Right Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
