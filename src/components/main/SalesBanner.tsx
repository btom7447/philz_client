"use client";

import Link from "next/link";

export default function SalesBanner() {
  return (
    <section
      aria-labelledby="hero-heading"
      role="banner"
      className="relative bg-white overflow-hidden px-5 xl:px-0 h-full "
    >
      {/* MOBILE CONTENT */}
      <div
        className="py-5 flex flex-col gap-4 xl:hidden"
        data-aos="fade-right"
        data-aos-duration="900"
        data-aos-easing="ease-out-cubic"
      >
        <span className="text-black font-medium text-3xl tracking-wide">
          Luxury Properties
        </span>

        <h1
          id="hero-heading"
          className="block text-4xl md:text-5xl font-bold text-purple-700 leading-tight"
        >
          For You
        </h1>

        <p className="text-gray-700 text-xl leading-relaxed">
          Owning a property has never been this easy. Explore premium listings
          carefully selected to match your lifestyle and goals.
        </p>

        <div>
          <Link
            href="/properties"
            aria-label="Browse available properties"
            className="inline-flex items-center justify-center rounded-lg bg-purple-700 px-10 py-5 text-white text-xl hover:bg-purple-800 transition-colors"
          >
            Check Properties
          </Link>
        </div>
      </div>
      <div className="relative bg-white overflow-hidden h-[50dvh] xl:max-h-130  ">
        {/* IMAGE */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full before:absolute xl:before:top-0 before:right-0 before:h-full before:w-2/3 xl:before:w-1/3 before:bg-[url('/hero/call-to-action.jpg')] before:bg-cover before:bg-center before:content-['']" />
        </div>

        {/* CONTENT */}
        <div className="py-5 relative flex flex-col-reverse xl:flex-row items-end gap-12 max-w-7xl mx-auto">
          {/* TEXT COLUMN */}
          <div className=" hidden xl:flex flex-col justify-center h-full max-w-xl w-full ">
            <div
              className="flex flex-col gap-4"
              data-aos="fade-right"
              data-aos-duration="900"
              data-aos-easing="ease-out-cubic"
            >
              <h6 className="text-purple-700 font-medium text-3xl tracking-wide">
                Luxury Properties
              </h6>

              <h1
                id="hero-heading"
                className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
              >
                For You
              </h1>

              <p className="text-gray-700 text-xl leading-relaxed">
                Owning a property has never been this easy. Explore premium
                listings carefully selected to match your lifestyle and goals.
              </p>

              <div>
                <Link
                  href="/properties"
                  aria-label="Browse available properties"
                  className="inline-flex items-center justify-center rounded-lg bg-purple-700 px-10 py-5 text-white text-xl hover:bg-purple-800 transition-colors"
                >
                  Check Properties
                </Link>
              </div>
            </div>
          </div>

          {/* CONTACT BANNER */}
          <div className="bg-white w-full rounded-lg shadow-xl xl:p-10 p-5 flex flex-col lg:flex-row gap-5 xl:gap-10 items-start lg:items-center mt-30 xl:mb-20">
            <div>
              <h6 className="text-xl font-semibold text-gray-700">Email</h6>
              <Link
                href="mailto:support@philzproperties.com"
                className="text-gray-700 text-md xl:text-xl  leading-relaxed hover:text-purple-700 transition-colors"
              >
                support@philzproperties.com
              </Link>
            </div>

            <div>
              <h6 className="text-xl font-semibold text-gray-700">Phone</h6>
              <Link
                href="tel:+1234567890"
                className="text-gray-700 text-md xl:text-xl leading-relaxed hover:text-purple-700 transition-colors"
              >
                +1 234-567-890
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}