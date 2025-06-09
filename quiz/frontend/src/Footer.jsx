function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-auto bg-gray-900 text-white py-4 ">
      <div className="container mx-auto px-4 text-center">
        <p className=" text-white mt-1 md:text-2xl">
          © {new Date().getFullYear()} Your Company , All Right Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
