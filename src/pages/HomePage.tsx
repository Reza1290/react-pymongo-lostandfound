const HomePage = () => {
  return (
    <main className="mt-10">
      <div className="bg-main border border-gray-200/20 rounded-xl text-white p-5 py-10">
        <div className="flex justify-center">
          <div className="">
            <img src="../gojo.png" alt="" className="h-16 -mb-4 -ml-2" />
            <h1 className="text-4xl font-extrabold text-center">
              Barang Hilang Jangan Bersedih :(
            </h1>
            <p className="text-gray-300 text-center text-lg mt-2">
              Dengan domain bojo barangmu mungkin ada disini hehe
            </p>
            <div className="text-center mt-10">
              <a href="/list" className="rounded-md p-4 px-8 bg-blue-400 font-bold">
                Temukan Barangmu
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="text-3xl text-white text-justify">
          Kamu <span className="font-bold">Menemukan</span>{" "}
          <span className="italic"> Barang?</span>&#128512; Kamu{" "}
          <span className="font-bold">Kehilangan</span>{" "}
          <span className="italic"> Barang?</span> &#128553; Kasih tau bojo biar
          di umumkan!
        </div>
      </div>
      <div className="mt-20">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-red-500 rounded-xl p-10 group">
            <div>
              <h1 className="text-gray-100 text-3xl font-extrabold">
                Apa Itu Hilang Temu?
              </h1>
              <p className="text-start text-gray-300 mt-4 w-[70%]">
                Sebuah platform untuk mencari barang yang hilang atau melaporkan
                barang yang ditemukan dalam
                <span className="font-bold text-2xl"> 24 Jam</span> Terakhir
              </p>
              <div className="flex justify-end">
                <img
                  src="../mega.png"
                  alt=""
                  className="w-48 group-hover:rotate-[20deg] transform-gpu scale-x-[-1]"
                />
              </div>
            </div>
          </div>
          <div className="bg-blue-500 rounded-xl p-10">
            <div className="flex flex-col flex-1 justify-between h-full">
              <h1 className="text-gray-100 text-3xl font-extrabold">
                Bagaimana cara kerjanya?
              </h1>
              <div className="mt-4 mb-4 text-gray-300">
                <p className="my-2">
                  <span className="font-bold">Laporkan</span> barang yang hilang atau ditemukan pada menu Listing
                </p>
                <p className="my-2">
                <span className="font-bold">Laporan</span> kamu akan ada hingga <span className="font-bold">24 Jam</span>
                </p>
                <p className="my-2">
                <span className="font-bold">Kamu</span> dapat menghubungi Pelapor melalui whatsapp Link atau Nomor telepon / email
                </p>
              </div>
              <div className="mt-auto">
                <a href={'/list'} className="bg-gray-200 rounded-md p-3 px-10 font-bold">
                Listing

                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
