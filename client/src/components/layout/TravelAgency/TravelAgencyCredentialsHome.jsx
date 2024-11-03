export default function TravelAgencyCredentialsHome() {
  return (
    <div className="relative min-h-screen flex flex-col">

      {/* Cover photo and form */}
      <div className="relative flex-grow">
        {/* Cover photo */}
        <div className="relative h-[700px]">
          <img
            src="/credentials.jpg" // Ensure this path is correct and the image is in the public folder
            alt="Travel Curator Image"
            layout="fill"
            objectfit="cover"
            priority
            className="absolute inset-0"
          />
        </div>

        {/* Floating Text */}
        <div className="absolute top-[15%] left-8 z-10 ">
          <h1 className="text-3xl font-bold mb-2">
            Boost your revenue with Us!
          </h1>
          <p className="text-lg mb-4">
            Sign up now and start earning more with HikeKo.
          </p>
        </div>

        {/* Form Container */}
        <div className="absolute top-[30%] left-8 z-10">
          <div className="bg-white p-7 rounded-lg shadow-lg" style={{ width: '400px', minHeight: '450px' }}>
            <h2 className="text-xl font-semibold mb-4">
              Ready to grow your business?
            </h2>
              <CredentialForm />
          </div>
        </div>
      </div>

      {/* New Opportunities Section */}
      <div className="bg-white p-8 text-center shadow-lg mt-60 mx-auto max-w-4xl relative">
        <h2 className="text-2xl font-bold mb-4">Brings new opportunities</h2>
        <p className="text-lg">
          Expand your horizons and explore new business opportunities with HikeKo. Join us today and be part of something big!
        </p>
      </div>

      {/* Image and Text Section */}
      <div className="flex flex-col mt-10 max-w-full mx-auto bg-slate-300">
        {/* First Row: Image on Left, Text on Right */}
        <div className="flex items-center mb-10 w-full">
          <div className="flex-1">
            <img
              src="/google.png" // Replace with the actual image path
              alt="Description of Image 1"
              width={600} // Adjust width as needed
              height={400} // Adjust height as needed
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="flex-1 p-4">
            <h3 className="text-xl font-bold mb-2">Unlock New Features</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.</p>
          </div>
        </div>

        {/* Second Row: Text on Left, Image on Right */}
        <div className="flex items-center w-full">
          <div className="flex-1 p-4">
            <h3 className="text-xl font-bold mb-2">Join a Community</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.</p>
          </div>
          <div className="flex-1">
            <img
              src="/image3.png" // Replace with the actual image path
              alt="Description of Image 2"
              width={600} // Adjust width as needed
              height={400} // Adjust height as needed
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
